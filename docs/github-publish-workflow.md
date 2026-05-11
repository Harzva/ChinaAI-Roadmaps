# GitHub 发布与排障 Workflow

这份 workflow 来自本仓库发布过程中的实际问题，用于以后发布静态站点、重构目录、启用 GitHub Pages 时快速避坑。

## 标准发布流程

1. 检查工作区：

```powershell
git status --short --branch
git log --oneline -3
```

2. 检查敏感信息：

```powershell
rg -n "ghp_|github_pat_|x-access-token|Authorization:"
git config --list --show-origin | Select-String -Pattern "url\.|token|insteadOf|Authorization|github_pat|ghp_"
```

3. 本地验证静态站点：

```powershell
python -m http.server 8787 --bind 127.0.0.1
```

访问：

```text
http://127.0.0.1:8787/index.html
http://127.0.0.1:8787/downloads.html
```

4. 用 Playwright 做桌面和移动端检查：

```powershell
cmd /c npx playwright install chromium
```

检查重点：

- 首页和下载页是否正常加载
- 桌面端和移动端是否无横向溢出
- `h1`、表格、卡片、图片是否渲染正常
- 本地链接是否存在

5. 提交：

```powershell
git add -A
git commit -m "Your commit message"
```

6. 优先使用普通 push：

```powershell
gh auth setup-git --hostname github.com
git push -u origin main
```

7. 如果 Git HTTPS 失败，用 GitHub Git Data API 兜底发布当前 `HEAD` 的文件树。

## 本次遇到的问题

| 问题 | 现象 | 处理方式 |
| --- | --- | --- |
| Git HTTPS 网络重置 | `Recv failure: Connection was reset` | 重试；仍失败则切 API 发布 |
| GitHub 443 连接失败 | `Failed to connect to github.com port 443` | 不继续盲目重试，切 GitHub API |
| 本地提交与远端提交 SHA 不同 | 本地 `ahead 1`，但 Pages 已更新 | API 发布会生成新的远端 commit；验证远端文件树和 Pages，而不是只看本地 tracking |
| PowerShell 变量冲突 | `Cannot overwrite variable HOME because it is read-only or constant` | 不使用 `$home` 作为临时变量名，改成 `$homeHtml` |
| `gh api` URL 参数被拆分 | `accepts 1 arg(s), received 2` | 给带 `?ref=main` 的 API path 加引号，或改用 REST 脚本 |
| 发布脚本 fallback 类型错误 | `Publish-TreeByApi : Argument types do not match` | 用短 Node 脚本直接创建 blobs/tree/commit/ref |
| PowerShell 禁止 npx 脚本 | `npx.ps1 cannot be loaded` | 改用 `cmd /c npx ...` |
| Playwright 有包但无浏览器 | `Executable doesn't exist ... please run playwright install` | 执行 `cmd /c npx playwright install chromium` |
| Codex 内置浏览器连接超时 | browser tool timeout | 使用本地 HTTP + Playwright headless 进行验证 |
| Pages 把 Markdown 当纯文本 | 访问 `.md` 显示原始表格 | 新增正式 `downloads.html`，避免把 `.md` 作为用户入口 |

## API 兜底发布脚本

当 `git push` 因网络失败时，可用下面的内存脚本发布当前 `HEAD` 文件树。它通过 `gh auth token` 在内存中取 token，不写入文件。

```powershell
@'
const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const owner = 'Harzva';
const repo = 'ChinaAI-Roadmaps';
const branch = 'main';
const message = 'Publish site updates';
const token = cp.execFileSync('gh', ['auth', 'token', '--hostname', 'github.com'], { encoding: 'utf8' }).trim();
const files = cp.execFileSync('git', ['ls-tree', '-r', '--name-only', 'HEAD'], { encoding: 'utf8' })
  .split(/\r?\n/)
  .filter(Boolean);

async function api(method, endpoint, body) {
  const res = await fetch(`https://api.github.com${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'codex-publish-roadmaps'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error(`${method} ${endpoint} -> ${res.status} ${await res.text()}`);
  return res.json();
}

(async () => {
  const ref = await api('GET', `/repos/${owner}/${repo}/git/ref/heads/${branch}`);
  const parent = ref.object.sha;
  const tree = [];
  for (const file of files) {
    const bytes = fs.readFileSync(path.join(process.cwd(), file));
    const blob = await api('POST', `/repos/${owner}/${repo}/git/blobs`, {
      content: bytes.toString('base64'),
      encoding: 'base64'
    });
    tree.push({ path: file.replace(/\\/g, '/'), mode: '100644', type: 'blob', sha: blob.sha });
  }
  const treeObj = await api('POST', `/repos/${owner}/${repo}/git/trees`, { tree });
  const commit = await api('POST', `/repos/${owner}/${repo}/git/commits`, {
    message,
    tree: treeObj.sha,
    parents: [parent]
  });
  await api('PATCH', `/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
    sha: commit.sha,
    force: true
  });
  console.log(JSON.stringify({ repo: `https://github.com/${owner}/${repo}`, branch, commit: commit.sha, files: files.length }, null, 2));
})();
'@ | node -
```

## 发布后验证

```powershell
gh api repos/Harzva/ChinaAI-Roadmaps/pages

foreach ($u in @(
  'https://harzva.github.io/ChinaAI-Roadmaps/',
  'https://harzva.github.io/ChinaAI-Roadmaps/downloads.html'
)) {
  Invoke-WebRequest -Uri $u -Method Head -MaximumRedirection 3 -TimeoutSec 20
}
```

还要确认页面内容不是旧缓存：

```powershell
$homeHtml = (Invoke-WebRequest -Uri 'https://harzva.github.io/ChinaAI-Roadmaps/' -UseBasicParsing).Content
$downloadsHtml = (Invoke-WebRequest -Uri 'https://harzva.github.io/ChinaAI-Roadmaps/downloads.html' -UseBasicParsing).Content
$homeHtml -match 'ChinaAI Roadmaps'
$downloadsHtml -match 'GLM Series'
```

