# Failure Taxonomy

| 类别 | 例子 | 默认动作 |
| --- | --- | --- |
| Identity | 别名重复、版本绑定错误 | 阻断构建，修正 Registry |
| Evidence | 无来源、链接失效、内容哈希缺失 | 从 Top-K 移除，保留审计说明 |
| Comparability | subset、metric、protocol 混排 | 阻断发布，拆分榜单 |
| Configuration | harness、attempts 或预算缺失 | 降级为部分可比或补充披露 |
| Ranking | ties、lower-is-better、缺失值处理错误 | 增加 golden fixture 并修复生成器 |
| Freshness | 上游失败或滚动榜变更 | 保留上次验证快照并报警 |
| Security | token、Cookie、私有路径或内部字段 | 立即阻断并清理历史后再发布 |
| Presentation | 键盘、移动端、来源链接不可用 | 阻断 UI 发布或回滚 |

严重度：P0 为安全/错误榜单，P1 为证据与可比性，P2 为新鲜度和可用性，P3 为文案与视觉问题。每个 P0/P1 修复必须增加自动化回归用例。
