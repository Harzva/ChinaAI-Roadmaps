# DeepSeek 第一阶段：模型基础协议 57 篇整理包

生成时间：2026-05-21T05:24:24.284Z
来源：data/providers-docs.json via local tutorial runtime

## 统计

- 总数：57
- sourceType：web 56；markdown 1
- contentType：text/html 56；unknown 1
- category：overview 1；api_samples 2；api 5；faq 1；integration 17；guides 7；models 1；tool 1；markdown-page 1；news 15；prompt-library 2；error 1；pricing 2；quick_start 1

## 给 ccmimo 的整理目标

- 把这 57 条整理成 DeepSeek Provider Adapter 第一阶段教程。
- 重点不是复述标题，而是提炼：协议字段、请求/响应、tool call、thinking、错误码、计费限流、生态接入。
- 输出 3-5 个章节，每章包含：为什么读、必读文档、工程动作、坑点、验收标准。
- 不要修改源文件；只基于本整理包给出课程化草稿。

## 文档清单

### 1. https://api-docs.deepseek.com/
- URL：https://api-docs.deepseek.com/
- 分类：入口 (overview)
- 主题：协议 & 结构 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：91；学习密度：86；代码片段：3
- 摘要：Your Docusaurus site did not load properly. A very common reason is a wrong site baseUrl configuration . Current configured baseUrl = / (default value) We suggest trying baseUrl =
- 标题树：H1 Your First API Call | H2 Integrate with Agent Tools ​ | H2 Invoke The Chat API ​
- 代码片段摘录：
```text
curl https://api.deepseek.com/chat/completions \ -H "Content-Type: application/json" \ -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \ -d '{ "model": "deepseek-v4-pro", "messages": [ {"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"} ], "thinking": {"type": "enabled"}, "reasoning_effort": "high", "stream": false }'
```
```text
# Please install OpenAI SDK first: `pip3 install openai` import os from openai import OpenAI client = OpenAI ( api_key = os . environ . get ( 'DEEPSEEK_API_KEY' ) , base_url = "https://api.deepseek.com" ) response = client . chat . completions . create ( model = "deepseek-v4-pro" , messages = [ { "role" : "system" , "content" : "You are a helpful assistant" } , { "role" : "user" , "content" : "Hello" } , ] , stream = False , reasoning_effort = "high" , extra_body = { "thinking" : { "type" : "enabled" } } ) print ( response . choices [ 0 ] . message . content )
```

### 2. api_samples / thinking_mode_api_example_tool_call
- URL：https://api-docs.deepseek.com/api_samples/thinking_mode_api_example_tool_call
- 分类：示例代码 (api_samples)
- 主题：协议 & 结构 / 思考模式 / 工具调用
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：85；学习密度：54；代码片段：1
- 标题树：H1 thinking_mode_api_example_tool_call
- 代码片段摘录：
```text
import os import json from openai import OpenAI from datetime import datetime # The definition of the tools tools = [ { "type" : "function" , "function" : { "name" : "get_date" , "description" : "Get the current date" , "parameters" : { "type" : "object" , "properties" : { } } , } } , { "type" : "function" , "function" : { "name" : "get_weather" , "description" : "Get weather of a location, the user should supply the location and date." , "parameters" : { "type" : "object" , "properties" : { "location" : { "type" : "string" , "description" : "The city name" } , "date" : { "type" : "string" , "description" : "The date in format YYYY-mm-dd" } , } , "required" : [ "location" , "date" ] } , } } , ] # The mocked version of the tool calls def get_date_mock ( ) : return datetime . now ( ) . strftime ( "%Y-%m-%d" ) def get_weather_mock ( location , date ) : return "Cloudy 7~13°C" TOOL_CALL_MAP =
```

### 3. api_samples / thinking_mode_api_example_tool_call_output
- URL：https://api-docs.deepseek.com/api_samples/thinking_mode_api_example_tool_call_output
- 分类：示例代码 (api_samples)
- 主题：协议 & 结构 / 思考模式 / 工具调用
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：85；学习密度：54；代码片段：1
- 标题树：H1 thinking_mode_api_example_tool_call_output
- 代码片段摘录：
```text
Turn 1.1 reasoning_content="The user is asking about the weather in Hangzhou tomorrow. I need to get tomorrow's date first, then call the weather function." content="Let me check tomorrow's weather in Hangzhou for you. First, let me get tomorrow's date." tool_calls=[ChatCompletionMessageFunctionToolCall(id='call_00_kw66qNnNto11bSfJVIdlV5Oo', function=Function(arguments='{}', name='get_date'), type='function', index=0)] tool result for get_date: 2026-04-19 Turn 1.2 reasoning_content="Today is 2026-04-19, so tomorrow is 2026-04-20. Now I'll call the weather function for Hangzhou." content='' tool_calls=[ChatCompletionMessageFunctionToolCall(id='call_00_H2SCW6136vWJGq9SQlBuhVt4', function=Function(arguments='{"location": "Hangzhou", "date": "2026-04-20"}', name='get_weather'), type='function', index=0)] tool result for get_weather: Cloudy 7~13°C Turn 1.3 reasoning_content='The weather resul
```

### 4. api / create-chat-completion
- URL：https://api-docs.deepseek.com/api/create-chat-completion
- 分类：API 接口 (api)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：3
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference Introduction Chat Cre
- 标题树：H1 Create Chat Completion | H2 /chat/completions | H2 Request ​ | H3 Body | H2 Responses ​
- 代码片段摘录：
```text
{ "id": "string", "choices": [ { "finish_reason": "stop", "index": 0, "message": { "content": "string", "reasoning_content": "string", "tool_calls": [ { "id": "string", "type": "function", "function": { "name": "string", "arguments": "string" } } ], "role": "assistant" }, "logprobs": { "content": [ { "token": "string", "logprob": 0, "bytes": [ 0 ], "top_logprobs": [ { "token": "string", "logprob": 0, "bytes": [ 0 ] } ] } ], "reasoning_content": [ { "token": "string", "logprob": 0, "bytes": [ 0 ], "top_logprobs": [ { "token": "string", "logprob": 0, "bytes": [ 0 ] } ] } ] } } ], "created": 0, "model": "string", "system_fingerprint": "string", "object": "chat.completion", "usage": { "completion_tokens": 0, "prompt_tokens": 0, "prompt_cache_hit_tokens": 0, "prompt_cache_miss_tokens": 0, "total_tokens": 0, "completion_tokens_details": { "reasoning_tokens": 0 } } }
```
```text
{ "id": "930c60df-bf64-41c9-a88e-3ec75f81e00e", "choices": [ { "finish_reason": "stop", "index": 0, "message": { "content": "Hello! How can I help you today?", "role": "assistant" } } ], "created": 1705651092, "model": "deepseek-v4-pro", "object": "chat.completion", "usage": { "completion_tokens": 10, "prompt_tokens": 16, "total_tokens": 26 } }
```

### 5. api / create-completion
- URL：https://api-docs.deepseek.com/api/create-completion
- 分类：API 接口 (api)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：1
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference Introduction Chat Com
- 标题树：H1 Create FIM Completion (Beta) | H2 /completions | H2 Request ​ | H3 Body | H2 Responses ​
- 代码片段摘录：
```text
{ "id": "string", "choices": [ { "finish_reason": "stop", "index": 0, "logprobs": { "text_offset": [ 0 ], "token_logprobs": [ 0 ], "tokens": [ "string" ], "top_logprobs": [ {} ] }, "text": "string" } ], "created": 0, "model": "string", "system_fingerprint": "string", "object": "text_completion", "usage": { "completion_tokens": 0, "prompt_tokens": 0, "prompt_cache_hit_tokens": 0, "prompt_cache_miss_tokens": 0, "total_tokens": 0, "completion_tokens_details": { "reasoning_tokens": 0 } } }
```

### 6. api / deepseek-api
- URL：https://api-docs.deepseek.com/api/deepseek-api
- 分类：API 接口 (api)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：91；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference Introduction Chat Com
- 标题树：H1 DeepSeek API | H2 Authentication ​ | H3 Contact | H3 Terms of Service | H3 License

### 7. api / get-user-balance
- URL：https://api-docs.deepseek.com/api/get-user-balance
- 分类：API 接口 (api)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：98；代码片段：1
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference Introduction Chat Com
- 标题树：H1 Get User Balance | H2 /user/balance | H2 Responses ​
- 代码片段摘录：
```text
{ "is_available": true, "balance_infos": [ { "currency": "CNY", "total_balance": "110.00", "granted_balance": "10.00", "topped_up_balance": "100.00" } ] }
```

### 8. api / list-models
- URL：https://api-docs.deepseek.com/api/list-models
- 分类：API 接口 (api)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：2
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference Introduction Chat Com
- 标题树：H1 Lists Models | H2 /models | H2 Responses ​
- 代码片段摘录：
```text
{ "object": "list", "data": [ { "id": "string", "object": "model", "owned_by": "string" } ] }
```
```text
{ "object": "list", "data": [ { "id": "deepseek-v4-flash", "object": "model", "owned_by": "deepseek" }, { "id": "deepseek-v4-pro", "object": "model", "owned_by": "deepseek" } ] }
```

### 9. faq
- URL：https://api-docs.deepseek.com/faq
- 分类：FAQ (faq)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News Other Resources
- 标题树：H1 FAQ | H2 Account ​ | H3 Cannot sign in to my account ​ | H3 Cannot register with my email ​ | H3 Deleting Account ​ | H2 Billing ​ | H3 How to Top Up? ​ | H3 Is there any expiration date for my balance? ​ | H3 Is a refund possible? ​ | H3 How to view usage by API Key ​ | H3 Incorrect Top-up Balance ​ | H2 API Call ​

### 10. guides / anthropic_api
- URL：https://api-docs.deepseek.com/guides/anthropic_api
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：2
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News Other Resources
- 标题树：H1 Anthropic API | H2 Use DeepSeek in Claude Code ​ | H2 Invoke DeepSeek Model via Anthropic API ​ | H2 Anthropic API Compatibility Details ​ | H3 HTTP Header ​ | H3 Simple Fields ​ | H3 Tool Fields ​ | H4 tools ​ | H4 tool_choice ​ | H3 Message Fields ​
- 代码片段摘录：
```text
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic export ANTHROPIC_API_KEY=${YOUR_API_KEY}
```
```text
import anthropic client = anthropic.Anthropic() message = client.messages.create( model="deepseek-v4-pro", max_tokens=1000, system="You are a helpful assistant.", messages=[ { "role": "user", "content": [ { "type": "text", "text": "Hi, how are you?" } ] } ] ) print(message.content)
```

### 11. guides / chat_prefix_completion
- URL：https://api-docs.deepseek.com/guides/chat_prefix_completion
- 分类：功能指南 (guides)
- 主题：协议 & 结构
- 形式：sourceType=markdown；contentType=text/html；本地存储=JSON record
- 价值分：19；学习密度：16；代码片段：0
- 摘要：doctype html> <html lang="en" dir="ltr" class="docs-wrapper plugin-docs plugin-id-default docs-version-current docs-doc-... s prefix message for the model to complete the rest of the message."><meta data-rh="true" property="og:description" cont... s prefix message for the model to complete the rest of the message."><link data-rh="true" rel="icon" href="/img/

### 12. guides / coding_agents
- URL：https://api-docs.deepseek.com/guides/coding_agents
- 分类：功能指南 (guides)
- 主题：协议 & 结构 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：4
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform On this page Integrate with AI Tools This guide shows how to integrate DeepSeek models with popular AI coding tools, including Claude Code, OpenCode, and OpenClaw. Claude Code is an AI coding assistant that runs in the terminal. npm install -g @anthropic-ai/claude-code After installation, run the fol
- 标题树：H1 Integrate with AI Tools | H2 Integrate with Claude Code ​ | H4 1. Install Claude Code ​ | H4 2. Configure Environment Variables ​ | H4 3. Enter the project directory and execute the claude command to get started. ​ | H2 Integrate with OpenCode ​ | H4 1. Install OpenCode ​ | H4 2. Run and Configure ​ | H2 Integrate with OpenClaw ​ | H4 1. Install OpenClaw ​ | H4 2. Configure the Default Model in OpenClaw ​ | H4 3. Get Started ​
- 代码片段摘录：
```text
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic export ANTHROPIC_AUTH_TOKEN=<your DeepSeek API Key> export ANTHROPIC_MODEL=deepseek-v4-pro[1m] export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro[1m] export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro[1m] export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash export CLAUDE_CODE_EFFORT_LEVEL=max
```
```text
$env:ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic" $env:ANTHROPIC_AUTH_TOKEN="<your DeepSeek API Key>" $env:ANTHROPIC_MODEL="deepseek-v4-pro[1m]" $env:ANTHROPIC_DEFAULT_OPUS_MODEL="deepseek-v4-pro[1m]" $env:ANTHROPIC_DEFAULT_SONNET_MODEL="deepseek-v4-pro[1m]" $env:ANTHROPIC_DEFAULT_HAIKU_MODEL="deepseek-v4-flash" $env:CLAUDE_CODE_SUBAGENT_MODEL="deepseek-v4-flash" $env:CLAUDE_CODE_EFFORT_LEVEL="max"
```

### 13. guides / fim_completion
- URL：https://api-docs.deepseek.com/guides/fim_completion
- 分类：功能指南 (guides)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：97；学习密度：83；代码片段：1
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News Other Resources
- 标题树：H1 FIM Completion (Beta) | H2 Notice ​ | H2 Sample Code ​ | H2 Integration With Continue ​
- 代码片段摘录：
```text
from openai import OpenAI client = OpenAI ( api_key = "<your api key>" , base_url = "https://api.deepseek.com/beta" , ) response = client . completions . create ( model = "deepseek-v4-pro" , prompt = "def fib(a):" , suffix = " return fib(a-1) + fib(a-2)" , max_tokens = 128 ) print ( response . choices [ 0 ] . text )
```

### 14. guides / json_mode
- URL：https://api-docs.deepseek.com/guides/json_mode
- 分类：功能指南 (guides)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：93；代码片段：2
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News Other Resources
- 标题树：H1 JSON Output | H2 Notice ​ | H2 Sample Code ​
- 代码片段摘录：
```text
import json from openai import OpenAI client = OpenAI ( api_key = "<your api key>" , base_url = "https://api.deepseek.com" , ) system_prompt = """ The user will provide some exam text. Please parse the "question" and "answer" and output them in JSON format. EXAMPLE INPUT: Which is the highest mountain in the world? Mount Everest. EXAMPLE JSON OUTPUT: { "question": "Which is the highest mountain in the world?", "answer": "Mount Everest" } """ user_prompt = "Which is the longest river in the world? The Nile River." messages = [ { "role" : "system" , "content" : system_prompt } , { "role" : "user" , "content" : user_prompt } ] response = client . chat . completions . create ( model = "deepseek-v4-pro" , messages = messages , response_format = { 'type' : 'json_object' } ) print ( json . loads ( response . choices [ 0 ] . message . content ) )
```
```text
{ "question": "Which is the longest river in the world?", "answer": "The Nile River" }
```

### 15. guides / kv_cache
- URL：https://api-docs.deepseek.com/guides/kv_cache
- 分类：功能指南 (guides)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：5
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News Other Resources
- 标题树：H1 Context Caching | H2 Cache Persistence and Hit Rules ​ | H3 When cache prefixes are persisted: ​ | H3 Example 1: Multi-round Conversation ​ | H3 Example 2: Long Text Q&A ​ | H2 Checking Cache Hit Status ​ | H2 Hard Disk Cache and Output Randomness ​ | H2 Additional Notes ​
- 代码片段摘录：
```text
messages: [ {"role": "system", "content": "You are a helpful assistant"}, {"role": "user", "content": "What is the capital of China?"} ]
```
```text
messages: [ {"role": "system", "content": "You are a helpful assistant"}, {"role": "user", "content": "What is the capital of China?"}, {"role": "assistant", "content": "The capital of China is Beijing."}, {"role": "user", "content": "What is the capital of the United States?"} ]
```

### 16. guides / model
- URL：https://api-docs.deepseek.com/guides/model
- 分类：模型 (models)
- 主题：协议 & 结构
- 形式：sourceType=web；contentType=unknown；本地存储=JSON record
- 价值分：19；学习密度：16；代码片段：0
- 摘要：抓取失败：Response status code does not indicate success: 404 (Not Found).

### 17. guides / multi_round_chat
- URL：https://api-docs.deepseek.com/guides/multi_round_chat
- 分类：功能指南 (guides)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：3
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News Other Resources
- 标题树：H1 Multi-round Conversation
- 代码片段摘录：
```text
from openai import OpenAI client = OpenAI ( api_key = "<DeepSeek API Key>" , base_url = "https://api.deepseek.com" ) # Round 1 messages = [ { "role" : "user" , "content" : "What's the highest mountain in the world?" } ] response = client . chat . completions . create ( model = "deepseek-v4-pro" , messages = messages ) messages . append ( response . choices [ 0 ] . message ) print ( f"Messages Round 1: { messages } " ) # Round 2 messages . append ( { "role" : "user" , "content" : "What is the second?" } ) response = client . chat . completions . create ( model = "deepseek-v4-pro" , messages = messages ) messages . append ( response . choices [ 0 ] . message ) print ( f"Messages Round 2: { messages } " )
```
```text
[ {"role": "user", "content": "What's the highest mountain in the world?"} ]
```

### 18. guides / thinking_mode
- URL：https://api-docs.deepseek.com/guides/thinking_mode
- 分类：功能指南 (guides)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：7
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News Other Resources
- 标题树：H1 Thinking Mode | H2 Thinking Mode Toggle and Effort Control ​ | H2 Input and Output Parameters ​ | H2 Multi-turn Conversation ​ | H3 Sample Code ​ | H2 Tool Calls ​ | H3 Sample Code ​
- 代码片段摘录：
```text
response = client . chat . completions . create ( model = "deepseek-v4-pro" , # ... reasoning_effort = "high" , extra_body = { "thinking" : { "type" : "enabled" } } )
```
```text
from openai import OpenAI client = OpenAI ( api_key = "<DeepSeek API Key>" , base_url = "https://api.deepseek.com" ) # Turn 1 messages = [ { "role" : "user" , "content" : "9.11 and 9.8, which is greater?" } ] response = client . chat . completions . create ( model = "deepseek-v4-pro" , messages = messages , reasoning_effort = "high" extra_body = { "thinking" : { "type" : "enabled" } } , ) reasoning_content = response . choices [ 0 ] . message . reasoning_content content = response . choices [ 0 ] . message . content # Turn 2 # The reasoning_content will be ignored by the API messages . append ( response . choices [ 0 ] . message ) messages . append ( { 'role' : 'user' , 'content' : "How many Rs are there in the word 'strawberry'?" } ) response = client . chat . completions . create ( model = "deepseek-v4-pro" , messages = messages , reasoning_effort = "high" extra_body = { "thinking" : {
```

### 19. guides / tool_calls
- URL：https://api-docs.deepseek.com/guides/tool_calls
- 分类：工具 (tool)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：8
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News Other Resources
- 标题树：H1 Tool Calls | H2 Non-thinking Mode ​ | H3 Sample Code ​ | H2 Thinking Mode ​ | H2 strict Mode (Beta) ​ | H3 Support Json Schema Types In strict Mode ​ | H4 object ​ | H4 string ​ | H4 number/integer ​ | H4 array ​ | H4 enum ​ | H4 anyOf ​
- 代码片段摘录：
```text
from openai import OpenAI def send_messages ( messages ) : response = client . chat . completions . create ( model = "deepseek-v4-pro" , messages = messages , tools = tools ) return response . choices [ 0 ] . message client = OpenAI ( api_key = "<your api key>" , base_url = "https://api.deepseek.com" , ) tools = [ { "type" : "function" , "function" : { "name" : "get_weather" , "description" : "Get weather of a location, the user should supply a location first." , "parameters" : { "type" : "object" , "properties" : { "location" : { "type" : "string" , "description" : "The city and state, e.g. San Francisco, CA" , } } , "required" : [ "location" ] } , } } , ] messages = [ { "role" : "user" , "content" : "How's the weather in Hangzhou, Zhejiang?" } ] message = send_messages ( messages ) print ( f"User>\t { messages [ 0 ] [ 'content' ] } " ) tool = message . tool_calls [ 0 ] messages . appen
```
```text
{ "type": "function", "function": { "name": "get_weather", "strict": true, "description": "Get weather of a location, the user should supply a location first.", "parameters": { "type": "object", "properties": { "location": { "type": "string", "description": "The city and state, e.g. San Francisco, CA", } }, "required": ["location"], "additionalProperties": false } } }
```

### 20. markdown-page
- URL：https://api-docs.deepseek.com/markdown-page
- 分类：文档说明 (markdown-page)
- 主题：协议 & 结构
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：21；学习密度：16；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Markdown page example You don't need React to write simple standalone pages.
- 标题树：H1 Markdown page example

### 21. news / news0802
- URL：https://api-docs.deepseek.com/news/news0802
- 分类：动态 (news)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：89；学习密度：82；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News DeepSeek-V4 Prev
- 标题树：H1 DeepSeek API introduces Context Caching on Disk, cutting prices by an order of magnitude | H2 How to Use DeepSeek API's Caching Service ​ | H2 Monitoring Cache Hits ​ | H2 Reducing Latency ​ | H2 Lowering Costs ​ | H2 Security Concerns ​ | H2 Why DeepSeek Leads with Disk Caching ​ | H2 DeepSeek API’s Concurrency and Rate Limits ​

### 22. news / news0905
- URL：https://api-docs.deepseek.com/news/news0905
- 分类：动态 (news)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：83；学习密度：73；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News DeepSeek-V4 Prev
- 标题树：H1 DeepSeek-V2.5: A New Open-Source Model Combining General and Coding Capabilities | H2 Version History ​ | H2 General Capabilities ​ | H2 Code Capabilities ​ | H2 Open-Source ​

### 23. news / news1120
- URL：https://api-docs.deepseek.com/news/news1120
- 分类：动态 (news)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：75；学习密度：61；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News DeepSeek-V4 Prev
- 标题树：H1 🚀 DeepSeek-R1-Lite-Preview is now live: unleashing supercharged reasoning power!

### 24. news / news1210
- URL：https://api-docs.deepseek.com/news/news1210
- 分类：动态 (news)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：75；学习密度：61；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News DeepSeek-V4 Prev
- 标题树：H1 🚀 DeepSeek V2.5: The Grand Finale 🎉

### 25. news / news1226
- URL：https://api-docs.deepseek.com/news/news1226
- 分类：动态 (news)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：83；学习密度：73；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News DeepSeek-V4 Prev
- 标题树：H1 🚀 Introducing DeepSeek-V3 | H2 Biggest leap forward yet ​ | H2 🎉 What’s new in V3 ​ | H2 💰 API Pricing Update ​ | H2 Still the best value in the market! 🔥 ​

### 26. news / news250115
- URL：https://api-docs.deepseek.com/news/news250115
- 分类：动态 (news)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：79；学习密度：67；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News DeepSeek-V4 Prev
- 标题树：H1 Introducing DeepSeek App | H2 Key Features of DeepSeek App: ​ | H2 Important Notice: ​

### 27. news / news250120
- URL：https://api-docs.deepseek.com/news/news250120
- 分类：动态 (news)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：75；学习密度：61；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News DeepSeek-V4 Prev
- 标题树：H1 DeepSeek-R1 Release

### 28. news / news250325
- URL：https://api-docs.deepseek.com/news/news250325
- 分类：动态 (news)
- 主题：协议 & 结构
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：21；学习密度：16；代码片段：0
- 标题树：H1 DeepSeek-V3-0324 Release

### 29. news / news250528
- URL：https://api-docs.deepseek.com/news/news250528
- 分类：动态 (news)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：75；学习密度：61；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News DeepSeek-V4 Prev
- 标题树：H1 DeepSeek-R1-0528 Release

### 30. news / news250821
- URL：https://api-docs.deepseek.com/news/news250821
- 分类：动态 (news)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：83；学习密度：73；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News DeepSeek-V4 Prev
- 标题树：H1 DeepSeek-V3.1 Release | H2 API Update ⚙️ ​ | H2 Tools & Agents Upgrades 🧰 ​ | H2 Model Update 🤖 ​ | H2 Pricing Changes 💳 ​

### 31. news / news250922
- URL：https://api-docs.deepseek.com/news/news250922
- 分类：动态 (news)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：75；学习密度：61；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News DeepSeek-V4 Prev
- 标题树：H1 DeepSeek-V3.1-Terminus

### 32. news / news250929
- URL：https://api-docs.deepseek.com/news/news250929
- 分类：动态 (news)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：81；学习密度：70；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News DeepSeek-V4 Prev
- 标题树：H1 Introducing DeepSeek-V3.2-Exp | H2 ⚡️ Efficiency Gains ​ | H2 🧑‍💻 API Update ​ | H2 🛠 Open Source Release ​

### 33. news / news251201
- URL：https://api-docs.deepseek.com/news/news251201
- 分类：动态 (news)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：83；学习密度：73；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News DeepSeek-V4 Prev
- 标题树：H1 DeepSeek-V3.2 Release | H1 🏆 World-Leading Reasoning | H1 🤖 Thinking in Tool-Use | H1 💻 API Update | H1 🛠 Open Source Release

### 34. news / news260424
- URL：https://api-docs.deepseek.com/news/news260424
- 分类：动态 (news)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：85；学习密度：76；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News DeepSeek-V4 Prev
- 标题树：H1 DeepSeek V4 Preview Release | H3 DeepSeek-V4-Pro ​ | H3 DeepSeek-V4-Flash ​ | H3 Structural Innovation & Ultra-High Context Efficiency ​ | H3 Dedicated Optimizations for Agent Capabilities ​ | H3 API is Available Today! ​

### 35. prompt-library
- URL：https://api-docs.deepseek.com/prompt-library
- 分类：提示词库 (prompt-library)
- 主题：协议 & 结构
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：21；学习密度：16；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform 提示库 探索 DeepSeek 提示词样例，挖掘更多可能
- 标题树：H1 提示库

### 36. PromptLibrary
- URL：https://api-docs.deepseek.com/PromptLibrary
- 分类：提示词库 (prompt-library)
- 主题：协议 & 结构
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：21；学习密度：16；代码片段：0
- 摘要：探索 DeepSeek 提示词样例，挖掘更多可能
- 标题树：H1 提示库

### 37. quick_start / agent_integrations / astrbot
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/astrbot
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：5
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrate with AstrBot | H4 1. Install AstrBot ​ | H5 Install AstrBot via uv ​ | H5 Install AstrBot via Docker ​ | H4 2. Configure the Default Model in AstrBot ​ | H4 3. Get Started ​
- 代码片段摘录：
```text
curl -LsSf https://docs.astrbot.app/install.sh | bash
```
```text
iwr -useb https://docs.astrbot.app/install.ps1 | iex
```

### 38. quick_start / agent_integrations / claude_code
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：2
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrate with Claude Code | H2 Migrate from Existing Installation to DeepSeek ​ | H2 Install Claude Code from Scratch ​ | H4 1. Install Claude Code ​ | H4 2. Configure Environment Variables ​ | H4 3. Enter the project directory and execute the claude command to get started. ​
- 代码片段摘录：
```text
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic export ANTHROPIC_AUTH_TOKEN=<your DeepSeek API Key> export ANTHROPIC_MODEL=deepseek-v4-pro[1m] export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro[1m] export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro[1m] export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash export CLAUDE_CODE_EFFORT_LEVEL=max
```
```text
$env:ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic" $env:ANTHROPIC_AUTH_TOKEN="<your DeepSeek API Key>" $env:ANTHROPIC_MODEL="deepseek-v4-pro[1m]" $env:ANTHROPIC_DEFAULT_OPUS_MODEL="deepseek-v4-pro[1m]" $env:ANTHROPIC_DEFAULT_SONNET_MODEL="deepseek-v4-pro[1m]" $env:ANTHROPIC_DEFAULT_HAIKU_MODEL="deepseek-v4-flash" $env:CLAUDE_CODE_SUBAGENT_MODEL="deepseek-v4-flash" $env:CLAUDE_CODE_EFFORT_LEVEL="max"
```

### 39. quick_start / agent_integrations / copilot_cli
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/copilot_cli
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：4
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrate with GitHub Copilot CLI | H4 1. Install GitHub Copilot CLI ​ | H4 2. Get a DeepSeek API Key ​ | H4 3. Configure Environment Variables ​ | H4 4. Start Copilot CLI ​ | H4 Optional: Token Limits ​ | H4 Optional: Offline Mode ​ | H4 Resources ​
- 代码片段摘录：
```text
export COPILOT_PROVIDER_TYPE=anthropic export COPILOT_PROVIDER_BASE_URL=https://api.deepseek.com/anthropic export COPILOT_PROVIDER_API_KEY=sk-your-deepseek-api-key export COPILOT_MODEL=deepseek-v4-pro
```
```text
$env:COPILOT_PROVIDER_TYPE="anthropic" $env:COPILOT_PROVIDER_BASE_URL="https://api.deepseek.com/anthropic" $env:COPILOT_PROVIDER_API_KEY="sk-your-deepseek-api-key" $env:COPILOT_MODEL="deepseek-v4-pro"
```

### 40. quick_start / agent_integrations / crush
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/crush
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：3
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrate with Crush | H4 1. Install Crush ​ | H4 2. Configure DeepSeek Provider ​ | H4 3. Run and Select Model ​
- 代码片段摘录：
```text
{ "$schema": "https://charm.land/crush.json", "providers": { "deepseek": { "type": "openai-compat", "base_url": "https://api.deepseek.com", "api_key": "$DEEPSEEK_API_KEY", "models": [ { "id": "deepseek-v4-pro", "name": "DeepSeek-V4-Pro", "context_window": 1048576, "default_max_tokens": 32768, "can_reason": true }, { "id": "deepseek-v4-flash", "name": "DeepSeek-V4-Flash", "context_window": 1048576, "default_max_tokens": 32768, "can_reason": true } ] } } }
```
```text
export DEEPSEEK_API_KEY="<your DeepSeek API Key>"
```

### 41. quick_start / agent_integrations / deepcode
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/deepcode
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：89；代码片段：1
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrate with Deep Code | H4 1. Install Deep Code ​ | H4 2. Configure Deep Code  ​ | H4 3. Enter a project directory and launch Deep Code ​ | H4 Key Shortcuts ​ | H4 Using Agent Skills ​
- 代码片段摘录：
```text
{ "env": { "MODEL": "deepseek-v4-pro", "BASE_URL": "https://api.deepseek.com", "API_KEY": "sk-..." }, "thinkingEnabled": true, "reasoningEffort": "max" }
```

### 42. quick_start / agent_integrations / github_copilot
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/github_copilot
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入 / 多模态
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：96；学习密度：89；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrate with GitHub Copilot | H4 1. Install the Extension ​ | H4 2. Get a DeepSeek API Key ​ | H4 3. Configure the API Key in VS Code ​ | H4 4. Select the Model and Start Chatting ​ | H4 Optional: Configure Thinking Effort ​ | H4 Optional: Vision Support ​

### 43. quick_start / agent_integrations / hermes
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/hermes
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：99；学习密度：86；代码片段：1
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrate with Hermes Agent | H4 1. Install Hermes ​ | H5 Quick Install ​ | H6 Linux / macOS / WSL2 ​ | H4 2. Run and Configure ​
- 代码片段摘录：
```text
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

### 44. quick_start / agent_integrations / kilo_code
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/kilo_code
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：83；学习密度：73；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrate with Kilo Code | H4 1. Install Kilo Code CLI ​ | H4 2. Run Kilo Code ​ | H4 3. Connect the DeepSeek Provider ​ | H4 4. Select a DeepSeek Model ​

### 45. quick_start / agent_integrations / langcli
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/langcli
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：3
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrate with Langcli | H4 1. Installation ​ | H5 Quick Install (Recommended) ​ | H5 Manual Installation ​ | H4 2. Quick Start ​ | H5 API Key Preparation ​ | H4 Running ​
- 代码片段摘录：
```text
bash -c "$(curl -fsSL https://assets.langcli.com/installation/install-langcli.sh)"
```
```text
cmd /c "curl -fsSL -o %TEMP%\install-langcli.bat https://assets.langcli.com/installation/install-langcli.bat && %TEMP%\install-langcli.bat"
```

### 46. quick_start / agent_integrations / nanobot
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/nanobot
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：96；代码片段：2
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrating nanobot | H4 1. Install nanobot ​ | H4 2. Configure nanobot ​ | H4 3. Get Started ​
- 代码片段摘录：
```text
$env:PATH = "$env:USERPROFILE\.local\bin;$env:PATH"
```
```text
{ "agents": { "defaults": { "model": "deepseek-v4-pro", "provider": "deepseek", } }, "providers": { "deepseek": { "apiKey": "<your DeepSeek API Key>", "apiBase": "https://api.deepseek.com/v1", }, }, }
```

### 47. quick_start / agent_integrations / oh_my_pi
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/oh_my_pi
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：2
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Using DeepSeek with Oh My Pi | H2 Prerequisites ​ | H2 Configuration ​ | H2 Configuration notes ​ | H3 Basics ​ | H3 Thinking mode ​ | H3 Three critical compat fields ​ | H2 Usage ​ | H2 Known issues ​
- 代码片段摘录：
```text
providers : deepseek : baseUrl : https : //api.deepseek.com api : openai - completions apiKey : DEEPSEEK_API_KEY authHeader : true models : - id : deepseek - v4 - pro name : DeepSeek V4 Pro reasoning : true thinking : minLevel : high maxLevel : xhigh mode : effort input : [ text ] contextWindow : 1000000 maxTokens : 384000 compat : supportsDeveloperRole : false supportsReasoningEffort : true maxTokensField : max_tokens reasoningEffortMap : high : high xhigh : max supportsToolChoice : false requiresReasoningContentForToolCalls : true requiresAssistantContentForToolCalls : true extraBody : thinking : type : enabled - id : deepseek - v4 - flash name : DeepSeek V4 Flash reasoning : true thinking : minLevel : high maxLevel : xhigh mode : effort input : [ text ] contextWindow : 1000000 maxTokens : 384000 compat : supportsDeveloperRole : false supportsReasoningEffort : true maxTokensField : max
```
```text
cd /path/to/your-project omp --model deepseek/deepseek-v4-pro
```

### 48. quick_start / agent_integrations / openclaw
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/openclaw
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：2
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrate with OpenClaw | H2 Migrate from Existing Installation to DeepSeek ​ | H2 Install OpenClaw from Scratch ​ | H4 1. Install OpenClaw ​ | H4 2. Configure the Default Model in OpenClaw ​ | H4 3. Get Started ​
- 代码片段摘录：
```text
curl -fsSL https://openclaw.ai/install.sh | bash
```
```text
iwr -useb https://openclaw.ai/install.ps1 | iex
```

### 49. quick_start / agent_integrations / opencode
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/opencode
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：83；学习密度：73；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrate with OpenCode | H2 Migrate from Existing Installation to DeepSeek ​ | H2 Install OpenCode from Scratch ​ | H4 1. Install OpenCode ​ | H4 2. Run and Configure ​

### 50. quick_start / agent_integrations / pi_mono
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/pi_mono
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：5
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrate with Pi | H4 1. Install Pi ​ | H4 2. Configure DeepSeek Provider ​ | H4 3. Run and Select Model ​
- 代码片段摘录：
```text
npm install -g @mariozechner/pi-coding-agent
```
```text
curl -fsSL https://pi.dev/install.sh | sh
```

### 51. quick_start / agent_integrations / reasonix
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/reasonix
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：81；学习密度：70；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrate with Reasonix | H4 1. Install Node.js ​ | H4 2. Get a DeepSeek API Key ​ | H4 3. Enter the project directory and run npx reasonix code to get started. ​

### 52. quick_start / agent_integrations / workbuddy
- URL：https://api-docs.deepseek.com/quick_start/agent_integrations/workbuddy
- 分类：集成 (integration)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：4
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations Claude Code GitHub Copilot GitHub Copilot CLI Kilo Code WorkBuddy/CodeBuddy OpenCode Oh My Pi OpenClaw AstrBot Deep Code Hermes nanobot Crush Pi Reasonix Langcli Contribute Your Agent Integr
- 标题树：H1 Integrate with WorkBuddy/CodeBuddy | H4 1. Install WorkBuddy/CodeBuddy ​ | H4 2. Configure Local Models ​ | H4 3. Restart and Select the Model ​ | H4 4. Optional: Verify the API Key ​ | H4 Troubleshooting ​
- 代码片段摘录：
```text
C:\Users\<your-username>\.codebuddy\models.json
```
```text
setx DEEPSEEK_API_KEY "<your DeepSeek API Key>"
```

### 53. quick_start / error_codes
- URL：https://api-docs.deepseek.com/quick_start/error_codes
- 分类：错误处理 (error)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：75；学习密度：61；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News Other Resources
- 标题树：H1 Error Codes

### 54. quick_start / pricing
- URL：https://api-docs.deepseek.com/quick_start/pricing
- 分类：计费 (pricing)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：79；学习密度：67；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News Other Resources
- 标题树：H1 Models & Pricing | H2 Model Details ​ | H2 Deduction Rules ​

### 55. quick_start / rate_limit
- URL：https://api-docs.deepseek.com/quick_start/rate_limit
- 分类：计费 (pricing)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：75；学习密度：61；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News Other Resources
- 标题树：H1 Rate Limit

### 56. quick_start / token_usage
- URL：https://api-docs.deepseek.com/quick_start/token_usage
- 分类：快速开始 (quick_start)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：77；学习密度：64；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News Other Resources
- 标题树：H1 Token & Token Usage | H2 Calculate token usage offline ​

### 57. updates
- URL：https://api-docs.deepseek.com/updates
- 分类：动态 (news)
- 主题：协议 & 结构 / 思考模式 / 工具调用 / 运维与错误码 / 生态接入
- 形式：sourceType=web；contentType=text/html；本地存储=JSON record
- 价值分：100；学习密度：100；代码片段：0
- 摘要：DeepSeek API Docs English English 中文（中国） DeepSeek Platform Quick Start Your First API Call Models & Pricing Token & Token Usage Rate Limit Error Codes Agent Integrations API Guides Thinking Mode Multi-round Conversation Chat Prefix Completion (Beta) FIM Completion (Beta) JSON Output Tool Calls Context Caching Anthropic API API Reference News Other Resources
- 标题树：H1 Change Log | H2 Date: 2026-04-24 ​ | H3 DeepSeek-V4 ​ | H2 Date: 2025-12-01 ​ | H3 DeepSeek-V3.2 ​ | H3 DeepSeek-V3.2-Speciale ​ | H2 Date: 2025-09-29 ​ | H3 DeepSeek-V3.2-Exp ​ | H2 Date: 2025-09-22 ​ | H3 DeepSeek-V3.1-Terminus ​ | H2 Date: 2025-08-21 ​ | H3 DeepSeek-V3.1 ​
