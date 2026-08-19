---
title: Hermes Agent：能动手的长期 AI 助手
link: agent-hermes
catalog: true
date: 2026-03-10 00:00:00
description: 可以长期协作的数字同事：它不只生成文字，还能读取文件、修改代码、执行命令、查询网页、管理 GitHub，并在完成任务后运行测试验证结果。大模型负责思考，Hermes 负责记忆、工具调用和实际执行。
tags:
  - Agent
categories:
  - Agent
sticky: true
keywords:
  - Agent
  - Hermes
  - AI
---
# Hermes Agent：能动手的长期 AI 助手

大多数 AI 产品解决的是“回答问题”，而 Hermes Agent 更像一个可以长期协作的数字同事：它不只生成文字，还能读取文件、修改代码、执行命令、查询网页、管理 GitHub，并在完成任务后运行测试验证结果。

我更愿意把它理解成：**大模型负责思考，Hermes 负责记忆、工具调用和实际执行。**

## Hermes Agent 是什么

Hermes Agent 是 Nous Research 开源的通用 AI Agent，主要运行在终端中，也可以接入 Telegram、Discord、Slack、微信等消息平台。

它不绑定某一家模型，可以连接 OpenAI、Anthropic、OpenRouter、Gemini、DeepSeek、本地模型以及兼容接口。更换模型后，Hermes 保存的会话、记忆和技能仍然可以继续使用。

## 它能做什么

| 能力 | 典型用途 |
| --- | --- |
| 文件与代码操作 | 读取项目、修改代码、创建文档、批量重构 |
| 终端执行 | 安装依赖、运行测试、构建项目、检查系统状态 |
| 联网与研究 | 搜索资料、读取网页、整理调研结果 |
| 浏览器与桌面操作 | 自动操作网页或桌面应用 |
| GitHub 协作 | 查看 Issue、审查 PR、创建分支和提交改动 |
| 持久记忆 | 记住用户偏好、项目环境和长期目标 |
| 历史检索 | 从过去的会话中找到真实消息并恢复上下文 |
| Skills 技能 | 把可复用的工作流程沉淀为长期能力 |
| 自动化 | 通过定时任务、Webhook、MCP 和插件扩展工作流 |
| 多模型与多 Agent | 切换模型，或将多个独立任务并行处理 |

它和普通聊天机器人的核心区别是：**不仅告诉你怎么做，还可以直接把事情做完。**

## 安装与开始使用

```bash
# 安装
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash

# 运行初始化向导
hermes setup

# 检查配置和依赖
hermes doctor

# 启动交互式会话
hermes
```

进入项目目录后再启动 Hermes，它会把当前目录作为工作环境：

```bash
cd ~/workspace/my-project
hermes
```

如果项目根目录存在 `.hermes.md` 或 `AGENTS.md`，Hermes 可以自动读取其中的项目规则，例如构建命令、代码规范和禁止修改的范围。

## 最常用的 CLI 命令

| 命令 | 作用 |
| --- | --- |
| `hermes` | 启动交互式会话 |
| `hermes -z "任务"` | 执行一次性任务，只输出最终结果 |
| `hermes -c` | 继续最近一次会话 |
| `hermes --resume <会话ID>` | 恢复指定会话 |
| `hermes sessions browse` | 交互式浏览历史会话 |
| `hermes model` | 选择默认模型和服务商 |
| `hermes config` | 查看当前配置 |
| `hermes tools` | 启用或关闭工具 |
| `hermes skills browse` | 浏览可安装的技能 |
| `hermes memory status` | 查看记忆系统状态 |
| `hermes sessions stats` | 查看本地会话库统计 |
| `hermes profile list` | 查看相互隔离的配置档案 |
| `hermes gateway status` | 查看消息网关状态 |
| `hermes status --all` | 查看全部组件状态 |
| `hermes logs errors` | 查看错误日志 |
| `hermes doctor --fix` | 检查并尝试修复环境问题 |
| `hermes update` | 更新 Hermes |
| `hermes --help` | 查看完整 CLI 帮助 |

## 会话内常用快捷命令

在 Hermes 对话中，可以直接输入 `/` 命令：

| 快捷命令 | 作用 |
| --- | --- |
| `/help` | 查看当前版本支持的全部命令 |
| `/new` | 开启一个新会话 |
| `/resume` | 恢复历史会话 |
| `/title 名称` | 给当前会话命名 |
| `/retry` | 重新发送上一条消息 |
| `/undo` | 撤销上一轮对话 |
| `/compress` | 压缩过长的上下文 |
| `/model` | 查看或切换当前模型 |
| `/reasoning high` | 调整推理强度 |
| `/tools` | 管理当前可用工具 |
| `/skills` | 搜索和管理技能 |
| `/skill <名称>` | 加载指定技能 |
| `/background <任务>` | 在后台执行任务 |
| `/agents` | 查看正在运行的 Agent 和任务 |
| `/goal <目标>` | 设置需要持续推进的目标 |
| `/branch` | 从当前会话创建分支 |
| `/history` | 查看当前会话历史 |
| `/save` | 将会话保存为文件 |
| `/copy` | 复制最近一次回复 |
| `/quit` | 退出 Hermes |

命令会随着版本更新，**以会话内的 `/help` 和终端中的 `hermes --help` 为准**。

## Hermes 为什么能“记住我”

Hermes 的长期记忆不是模型天然拥有的，而是由三部分组成：

1. **持久记忆**：保存用户偏好、项目环境和长期有效的信息，每次新会话自动加载。
2. **会话数据库**：历史对话保存在本地数据库中，需要时再搜索，不会把全部聊天一次性塞进模型。
3. **Skills**：保存可重复使用的工作流程，例如代码审查、调研、写作和部署方法。

可以把它们理解为：

```text
当前上下文 = 桌面上正在处理的材料
持久记忆 = 随身携带的个人档案卡
历史会话 = 可以搜索的聊天图书馆
Skills = 不断积累的工作手册
```

所以，即使重新打开对话或更换模型，Hermes 依然能够延续重要背景。但它并不是无限记忆：被删除的会话无法恢复，搜索也可能遗漏，因此关键任务仍应提供明确的路径和目标。

## 怎样更高效地使用 Hermes

使用 Hermes 时，不要只问“这个问题怎么解决”，而要直接给出任务、范围和验收标准。

一个实用的指令结构是：

```text
目标 + 工作目录或资料 + 限制条件 + 要执行的动作 + 验收标准
```

例如：

```text
检查 ~/workspace/demo 中登录失败的问题，先定位根因再修改。
不要改动无关模块。修复后运行测试和构建，最后告诉我修改了哪些文件、执行了哪些验证命令以及真实结果。
```

相比“帮我看看这个 Bug”，这种表达能明显减少来回沟通。

再比如写文章：

```text
读取 draft.md，在不改变核心观点和表达节奏的前提下优化标题、开头和 Markdown 排版。
直接修改原文件，完成后运行 Prettier 检查。
```

我认为最有效的使用原则只有四条：

1. **给真实材料**：提供项目路径、文件、日志或链接，不要只描述现象。
2. **明确边界**：说明哪些内容可以修改，哪些不能碰。
3. **要求实际执行**：让 Hermes 直接修改、运行和验证，而不只是给建议。
4. **定义完成标准**：测试通过、构建成功、文件生成或结果可复现，才算完成。

## 安全与边界

Hermes 能执行终端命令和修改本地文件，因此能力越强，越需要明确权限边界：

- 重要项目先使用 Git，方便检查和回滚改动。
- API Key 和密码应放在环境变量或密钥文件中，不要写进公开文档。
- 对删除文件、重置 Git、部署线上环境等高风险操作保持人工确认。
- `--yolo` 会跳过危险命令确认，只适合明确隔离的测试环境。
- AI 仍可能误解需求，财务、医疗、法律和生产环境操作必须人工复核。

## 适合哪些人

Hermes 特别适合：

- 希望 AI 直接参与真实项目的开发者；
- 需要跨会话保留项目背景和个人偏好的长期用户；
- 想把研究、写作、运维和信息处理串成工作流的人；
- 希望自由选择模型，不被单一平台绑定的人。

如果只是偶尔问一个知识问题，普通聊天工具已经足够；如果希望 AI 能读取真实环境、持续理解你的工作方式，并把任务推进到可验证结果，Hermes 才真正体现价值。

## 相关链接

- 官方文档：<https://hermes-agent.nousresearch.com/docs/>
- GitHub：<https://github.com/NousResearch/hermes-agent>
- CLI 命令：<https://hermes-agent.nousresearch.com/docs/reference/cli-commands>
- 会话快捷命令：<https://hermes-agent.nousresearch.com/docs/reference/slash-commands>
- 持久记忆：<https://hermes-agent.nousresearch.com/docs/user-guide/features/memory>
