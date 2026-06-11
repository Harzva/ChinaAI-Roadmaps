const AGENT_SOURCE_MAP = {
  'claude-code': [{ title: 'Claude Code documentation', url: 'https://docs.anthropic.com/', type: 'official' }],
  'codex-cli': [{ title: 'OpenAI Codex repository', url: 'https://github.com/openai/codex', type: 'source' }],
  'deepseek-tui': [{ title: 'DeepSeek topic search', url: 'https://github.com/topics/deepseek', type: 'needs verification' }],
  'aider': [{ title: 'Aider repository', url: 'https://github.com/Aider-AI/aider', type: 'source' }],
  'opencode': [{ title: 'OpenCode repository', url: 'https://github.com/opencode-ai/opencode', type: 'source' }],
  'nemocode': [{ title: 'NemoCode repository search', url: 'https://github.com/search?q=nemocode&type=repositories', type: 'needs verification' }],
  'qwen-code': [{ title: 'QwenLM organization', url: 'https://github.com/QwenLM', type: 'source' }],
  'trae': [{ title: 'TRAE official website', url: 'https://www.trae.ai/', type: 'official' }],
  'qoder-editor': [{ title: 'Qoder documentation', url: 'https://docs.qoder.com/', type: 'official' }],
  'cursor': [{ title: 'Cursor official website', url: 'https://cursor.com/', type: 'official' }],
  'zed': [{ title: 'Zed official website', url: 'https://zed.dev/', type: 'official' }],
  'cline': [{ title: 'Cline repository', url: 'https://github.com/cline/cline', type: 'source' }],
  'roo-code': [{ title: 'Roo Code repository', url: 'https://github.com/RooVetGit/Roo-Code', type: 'source' }],
  'kimi-work': [{ title: 'Kimi Work product page', url: 'https://www.kimi.com/products/kimi-work', type: 'official' }],
  'qoder-work': [{ title: 'QoderWork product page', url: 'https://qoder.com/en/qoderwork', type: 'official' }],
  'devin': [{ title: 'Devin official website', url: 'https://devin.ai/', type: 'official' }],
  'openhands': [{ title: 'OpenHands repository', url: 'https://github.com/All-Hands-AI/OpenHands', type: 'source' }],
  'swe-agent': [{ title: 'SWE-agent repository', url: 'https://github.com/SWE-agent/SWE-agent', type: 'source' }],
  'langgraph': [{ title: 'LangGraph repository', url: 'https://github.com/langchain-ai/langgraph', type: 'source' }],
  'autogen': [{ title: 'AutoGen repository', url: 'https://github.com/microsoft/autogen', type: 'source' }],
  'crewai': [{ title: 'CrewAI repository', url: 'https://github.com/crewAIInc/crewAI', type: 'source' }],
  'codeagents': [{ title: 'CodeAgents arXiv paper', url: 'https://arxiv.org/abs/2507.03254', type: 'paper' }],
  'supervisoragent': [{ title: 'SupervisorAgent OpenReview', url: 'https://openreview.net/forum?id=ryMmxNedfzY', type: 'paper' }],
  'rtk': [{ title: 'rtk repository', url: 'https://github.com/rtk-ai/rtk', type: 'source' }],
  'leanctx': [{ title: 'Token optimization topic', url: 'https://github.com/topics/token-optimization', type: 'needs verification' }],
  'icm': [{ title: 'ICM repository', url: 'https://github.com/rtk-ai/icm', type: 'source' }],
  'grit': [{ title: 'Grit repository', url: 'https://github.com/rtk-ai/grit', type: 'source' }],
  'openwolf': [{ title: 'OpenWolf repository', url: 'https://github.com/cytostack/openwolf', type: 'source' }],
  'token-optimizer': [{ title: 'Token Optimizer repository', url: 'https://github.com/alexgreensh/token-optimizer', type: 'source' }],
  'lowfat': [{ title: 'Lowfat repository', url: 'https://github.com/zdk/lowfat', type: 'source' }],
  'entroly': [{ title: 'Entroly repository', url: 'https://github.com/juyterman1000/entroly', type: 'source' }],
  'repomix': [{ title: 'Repomix repository', url: 'https://github.com/yamadashy/repomix', type: 'source' }],
  'code2prompt': [{ title: 'Code2Prompt repository', url: 'https://github.com/mufeedvh/code2prompt', type: 'source' }],
  'claude-skills': [{ title: 'Claude documentation', url: 'https://docs.anthropic.com/', type: 'official' }],
  'cursor-rules': [{ title: 'Cursor official website', url: 'https://cursor.com/', type: 'official' }],
  'appui-design-skill': [{ title: 'AppUI Design Skill', url: 'https://github.com/Harzva/harzva-agentworkos-stack/tree/main/skills/appui-design', type: 'internal source' }],
  'design-md-flow': [{ title: 'Design MD Flow Skill', url: 'https://github.com/Harzva/harzva-agentworkos-stack/tree/main/skills/design-md-flow', type: 'internal source' }],
  'mcp-memory-git-filesystem': [{ title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/', type: 'official' }],
  'miwork-concept': [{ title: 'Agent Roadmap MiWork analysis', url: '#miwork', type: 'analysis' }]
};

if (window.AGENT_ROADMAP_DATA && Array.isArray(window.AGENT_ROADMAP_DATA.agents)) {
  window.AGENT_ROADMAP_DATA.agents = window.AGENT_ROADMAP_DATA.agents.map((agent) => ({
    ...agent,
    sources: AGENT_SOURCE_MAP[agent.id] || [{ title: 'Needs verification', url: agent.link || '#', type: 'needs verification' }]
  }));
}
