# WorldRoadmap v5 · 全球 AI 模型地图

GitHub Pages 静态部署版。无需后端、无需 token、无需 CDN；入口文件为 `index.html`，资源在 `src/`。

## v5 更新

- 版本号已从 v4 升级到 **v5**。
- 新增/整理 10 套主题：Nebula、Aurora、Ember、Ocean、Matrix、Candy、Graphite、Cyber、Arctic、Jade。
- 继续增强参考图里的视觉语言：深色宇宙背景、发光国家边界、模型星云、热区密度、流光关系线、小型模型卡片。
- 增加快捷键提示面板、HUD 状态条、标签显隐、流光开关、密度星云开关和高画质/省电模式。
- 搜索框可以直接命中国家、公司或模型；回到全球视角时会清空搜索并恢复默认详情卡。
- 模型详情支持 Paper/System Card、Hugging Face、Official Model Page、Company Website；缺失链接不会显示空按钮。
- 公司详情支持官网、HF/GitHub、创始人或核心团队图卡；点击人物卡可弹出大图。
- 同论文/同 system card 的模型会通过 `paperId` 自动连线，后续只需要在 `src/data.js` 补数据即可扩展。

## 部署

将本目录内容放到 GitHub 仓库根目录，然后在 GitHub Pages 中选择 `Deploy from a branch`，发布源选择 `main / root`。

## 文件结构

```txt
index.html
src/
  data.js
  app.js
  styles.css
.nojekyll
README.md
DEPLOY.md
CHANGELOG.md
VERSION.txt
```

## 操作

- 鼠标拖拽：移动地图
- 鼠标滚轮：缩放地图
- 点击国家：进入国家视角
- 点击公司：进入公司模型星云
- 点击模型：展示论文、HF、官网和同论文关系线
- H：全球视角
- R：随机飞行
- D：星云密度开关
- F：流光开关
- L：标签开关
- P：高画质 / 省电模式
- /：聚焦搜索框
