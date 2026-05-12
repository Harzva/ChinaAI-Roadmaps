# ChinaAI Roadmaps React App

新版交互式站点源码，负责 GitHub Pages 首页、模型路线导航、公司专题页与 DeepSeek V4 技术分析阅读体验。

保留仓库根目录的静态资料库：

- `downloads.html`：论文下载中心
- `content/markdown`：Markdown 分析与论文索引
- `content/html`：旧版专题页归档
- `assets/flowcharts`：技术路线图素材

## Local Development

当前仓库路径包含 `&`，在 Windows PowerShell 中直接运行 `npm run build` 可能被 `cmd` 截断。推荐使用显式 Node 命令：

```powershell
node .\node_modules\typescript\bin\tsc -b
node .\node_modules\vite\bin\vite.js build
```

如在不含特殊字符的路径下开发，也可以使用：

```powershell
npm install
npm run dev
npm run build
```

