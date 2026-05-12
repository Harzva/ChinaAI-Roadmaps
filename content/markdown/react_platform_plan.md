# V7: 中国AI技术路线分析平台 重构计划

## 目标
将当前 DeepSeek 专题站升级为「中国AI技术路线分析平台」

## 变更内容

### 1. 首页重写 (Home.tsx)
- 从 DeepSeek 专题 → 4公司入口平台
- 4张大型公司卡片: DeepSeek / Kimi / GLM / MiniMax
- 每种颜色主题: 🔵🔴🟢🟡
- 底部: 技术路线对比表 + 统计数字

### 2. 路由调整 (App.tsx)
- `/` → 平台首页
- `/deepseek` → DeepSeek 总览（原首页，加子导航卡片）
- `/deepseek/*` → DeepSeek 子页面（重定向现有路径）
- `/kimi` → Kimi 总览
- `/glm` → GLM 总览
- `/minimax` → MiniMax 总览（新建）

### 3. 导航重构 (Navbar.tsx)
- 分组下拉导航: DeepSeek | Kimi | GLM | MiniMax
- 每组内部有子页面链接
- Logo 改为 "ChinaAI"

### 4. 新建 MiniMax 页面

### 5. DeepSeek 子页面增加面包屑导航

## 执行顺序
1. 并行派遣3个子代理写: Home.tsx, Navbar.tsx, MiniMax.tsx
2. 更新 App.tsx 路由
3. 构建部署
