# AI Provider Developer Docs

这是 ChinaAI Roadmaps 的开发者文档子站，线上入口：

- https://harzva.github.io/ChinaAI-Roadmaps/developer-docs/

## 内容范围

- DeepSeek、Kimi、GLM、Xiaomi MiMo 多 Provider 文档快照
- 协议、tool call、流式、批处理、文件、错误、计费、生态接入等专题聚类
- DeepSeek 第一阶段 57 条记录课程包与 Adapter 开发法导读
- 每篇文档的工程映射：应该转成什么代码、测试、状态机或检查项

## 发布结构

这个目录只保留 GitHub Pages 运行需要的静态文件：

- `index.html`
- `assets/app.js`
- `assets/style.css`
- `data/*.json`
- `docs/*`

原始抓取脚本和临时文件保留在来源目录，不随线上页面发布。刷新数据时应先在来源目录重新生成 JSON，再把稳定产物同步到这里。
