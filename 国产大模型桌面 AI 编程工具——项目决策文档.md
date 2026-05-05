# 国产大模型桌面 AI 编程工具——项目决策文档

**领域**：AI / Vibecoding / 产品设计

**核心要点（已修订）**：基于 Tauri v2 构建一个桌面 GUI AI 编程工具，Deepseek-only，深度适配 Deepseek 的代码编辑、上下文组织、输出格式和安全写入闭环，填补国内在 Claude Code / Codex 品类的空白。

**来源**：2026-05-03 于野 × 麒麟 Grill Me 对话

> **2026-05-05 执行口径修订**：本文档保留为项目早期决策与思考存档。当前 Demo 开发以 `DEMO_DEVELOPMENT_GUIDE.md` 为事实来源。自 2026-05-05 起，项目执行策略从“双模型 / 多模型预留”收敛为 **Deepseek-only**：产品设计、模型 harness、UI 状态、测试用例和代码结构都只围绕 Deepseek 优化，不再为其他模型预留入口或抽象复杂度。视觉设计要求同步修订为：整体主题色调和设计气质对齐 Claude / Anthropic 的温暖、克制、编辑型工具审美，但不复制 Claude 商标或品牌资产。

---

## 一、产品定位

- **一句话定义（已修订）**：Deepseek 专用桌面 AI 编程 Agent——为 Deepseek 打造的最佳本地代码编辑体验
- **差异化叙事**：Claude Code 是为 Claude 打造的，Codex 是为 GPT 打造的，本工具是为国产模型打造的
- **路径**：从 A（复刻）到 B（差异化），先做能力对齐，再做体验超越
- **长期愿景**：成为类似 Claude Code 的 Agent，通过开源让社区共同完善

**为什么做这件事（两个出发点）：**

1. Claude Code / Codex 是国外软件，国内目前没有同级别的中间层编程工具
2. 现有工具对 Deepseek 没有针对性适配，无法充分发挥其代码编辑能力
3. 个人需求：一个高度可定制、低成本维护和修改的自有编码工具

## 二、模型策略

**Deepseek-only（2026-05-05 修订）：**

- **唯一目标模型：Deepseek**。当前产品设计、harness、测试集、UI 状态和代码结构都只围绕 Deepseek 优化。
- **不再做多模型路线**。不预留其他模型入口、provider 切换、模型市场或任务路由。
- **不再以通用框架为目标**。项目差异化来自 Deepseek 专用适配深度，而不是模型覆盖广度。

**"专用适配"的核心逻辑：**

一个专门针对某模型设计的工具，一定优于通用工具调用该模型。具体适配维度：

1. **Prompt 工程**——针对 Deepseek 对指令格式、约束语气、JSON schema 和重试提示的响应方式调优。
2. **工具调用协议**——围绕 Deepseek 的输出稳定性设计校验、修复和重试策略。
3. **上下文窗口策略**——根据 Deepseek 实测表现（非标称能力）调整代码片段排列和摘要压缩策略。
4. **推理模式**——识别 Deepseek 在代码解释、重构、Search & Replace、错误修复中的稳定边界。
5. **输出格式控制**——适配 Deepseek 的输出习惯，优先稳定生成可校验的 Search & Replace JSON。

**模型行为测试集（先于工具建设，从 Phase 1 开始积累）：**

"先认识模型，再建工具"——Harness 的所有设计决策都依赖于对模型行为的系统认知。测试集覆盖以下 7 个维度，共 30+ 测试用例：

1. **基础编程能力**：写函数、修 bug、重构、解释代码、写测试
2. **输出格式控制**：能否稳定输出 JSON / Search & Replace 格式、能否只输出代码不加解释、按指定结构输出
3. **Function Calling / Tool Use**：协议格式、调用成功率、参数准确性、多工具串联、失败后重试
4. **上下文行为**：短 / 中 / 长上下文表现、"lost in the middle"注意力衰减、文件排列顺序对输出的影响、多轮对话上下文保持
5. **推理与规划**：多步骤任务拆解、CoT 引导效果、长链推理稳定性、是否过早给答案
6. **编码风格与习惯**：默认输出完整文件还是片段、注释风格、变量命名、错误处理、依赖引入倾向
7. **安全与边界**：是否拒绝某些操作、不确定时是否承认、是否擅自扩大范围、对"只改这一个文件"指令的遵守度

每个测试记录：测试 ID、类别、任务描述、输入 prompt、期望输出、实际输出、评分（通过 / 部分通过 / 失败）、备注。

测试集本身是项目最重要的资产之一，也是开源后社区贡献的入口。

## 三、技术架构

### 技术栈

- **桌面框架**：Tauri v2（Rust 后端 + Web 前端）
- **前端**：React + TypeScript + Tailwind CSS
- **后端**：Rust
- **运行时**：Tauri 自带 WebView（非 Electron，打包体积 10-20MB vs 150MB+）

**选 Tauri 而非 Electron 的理由：**

1. 轻量——对国内用户分发更友好
2. 前端用 React 改 UI 跟写网页一样快，后端 Rust 处理文件系统 / 进程管理 / API 调用，性能和安全性拉满
3. 开源社区贡献者门槛分层合理：前端（低门槛）+ Rust 后端（核心贡献者）
4. "轻量国产替代"的叙事对开源传播极其有利

**竞品技术栈参考：**

- **Codex 桌面版**：Electron + TypeScript + React + Radix UI + Tailwind + Framer Motion + TanStack
- **Codex CLI**：Rust（96.3%）
- **Claude Code**：TypeScript + React + Ink（终端 React）+ Yoga + Bun；90% 代码由自身编写

### 核心架构

```
┌─────────────────────────────────┐
│     GUI 前端 (React/TypeScript)  │
│  ┌───────────────────────┐      │
│  │ Skill 可视化面板       │      │
│  │ 对话树可视化           │      │
│  │ 终端集成               │      │
│  └───────────────────────┘      │
└──────────┬──────────────────────┘
           │ IPC (Tauri)
┌──────────▼──────────────────────┐
│     Agent 编排层 (Rust)          │
│  ┌─────────────────────┐        │
│  │  Deepseek Harness    │        │
│  │  ├─ Prompt 模板       │        │
│  │  ├─ JSON 输出校验     │        │
│  │  └─ 重试/修复策略     │        │
│  └─────────────────────┘        │
│  ┌─────────────────────┐        │
│  │  工具调用层           │        │
│  │  ├─ 文件读写          │        │
│  │  ├─ Diff 预览         │        │
│  │  ├─ 上下文管理        │        │
│  │  └─ 内部快照          │        │
│  └─────────────────────┘        │
└─────────────────────────────────┘
```

### 模型接入：Deepseek Harness

当前不采用通用 Adapter 模式，不为其他模型预留入口。`DeepseekHarness` 负责处理 Deepseek 特有的 prompt 格式、JSON 输出契约、token/延迟记录、上下文窗口策略、Search & Replace 输出格式控制和错误重试策略。

**DeepseekHarness 接口设计原则**：Harness 不只是 API 封装器，还应封装 Deepseek 的行为参数，让上层模块据此调整自身行为，而非在 UI 或文件编辑模块中硬编码模型策略：

- `requestEdit(context, instruction)` — 生成 Search & Replace 修改方案
- `repairEditResponse(rawOutput, validationError)` — 修复无效 JSON 或无效 `oldStr`
- `getMaxEffectiveContext()` — Deepseek 实际有效上下文（非标称值）
- `getContextArrangementStrategy()` — Deepseek 当前最稳定的上下文排列策略
- `getRetryStrategy()` — 错误重试配置
- `getTokenPricing()` — token 计费信息
- `getSystemPrompt(task)` — prompt 模板

**Deepseek-only 对复杂度的约束**：

以下能力不进入当前架构：

1. 非 Deepseek 模型接入
2. 多模型任务路由
3. 模型选择 UI
4. 多编辑格式自动切换
5. provider 配置市场

**v0.1 原则**：只实现 `DeepseekHarness`。不提前实现通用模型接口、任务路由层或多模型 UI。

## 四、核心设计决策

### 4.1 安全模型——分级权限（参考 Codex）

- **Read-only**：Agent 只能浏览文件，不做修改
- **Auto**（默认）：工作目录内自由读写，目录外和网络操作需确认
- **Full Access**：完全自主，不询问

### 4.2 上下文管理——文件树 + 按需加载

- **MVP**：把项目文件树（目录结构）塞入上下文，Agent 通过 tool call 按需读取具体文件
- **v0.2+**：引入 RAG（Embedding 索引 + 语义检索），混合模式
- **适配要点**：测试不同模型的"lost in the middle"表现，针对性调整代码片段在 prompt 中的排列策略

### 4.3 对话模型——树形结构（非线性）

**解决"上下文污染"问题：**

- 对话存储设计成**有向树**而非线性链表
- 每条消息有 `parentId`，回滚 = 把指针移回分叉点，开出新分支
- 发送给模型的上下文 = 从根节点到当前指针的**单条路径**，废弃分支不污染上下文
- 数据结构从 v0.1 就必须是树形，后期改代价极大

### 4.4 Diff 策略——Search & Replace + Git 自动快照

- **文件修改**：采用 Claude Code 的 Search & Replace 方案（`oldStr → newStr`）
- **回滚基础设施**：每次修改自动做一个 Git commit 作为快照
- 回滚对话分支时，文件系统通过 `git reset` 同步回滚

**选 Search & Replace 而非 Codex 的 apply_patch 的理由：**

1. 不依赖 Git——用户项目未必初始化了 Git
2. 对国产模型更友好——不要求输出格式完美的 git patch
3. Rust 实现简单——字符串搜索替换比 patch 解析器简单得多

### 4.5 UI 策略——骨架先定，皮肤后磨

**v0.1 前必须确定：**

- 设计语言方向（深色/浅色、科技感/温暖感，锚点：Claude Code 的设计美学）
- 布局架构（分栏方式、对话/终端/文件的空间分配）
- 组件库选型（Radix UI / Shadcn UI / Arco Design 等）

**可后期打磨：** 配色微调、间距、动画、图标风格、主题切换

用 Tailwind CSS + 好的组件库，后期改样式成本很低。

### 4.6 设计哲学——Codex 的直觉 + Claude Code 的美学

- **Codex 的优点**：直观易用，分支创建/回滚/版本管理可视化，功能在需要时恰如其分地出现
- **Claude Code 的优点**：能力深度，设计美学（配色、设计规范、设计理念）
- **目标**：结合两者各自的优点

## 五、Skill 系统

### 核心原则：不改变 Skill 的设计逻辑，在系统层面做两个增强

**兼容现有 Skill 格式（含 script），零迁移成本。**

### 增强 1：Agent 主动唤醒机制

- Agent 在工作过程中**自主判断**当前任务是否需要某个已安装的 Skill
- **普通模式**：识别到可用 Skill → 询问用户是否启用
- **全自动模式**：静默启用，不打断工作流
- 不是死板的规则匹配，而是 Agent 像有经验的人一样知道工具箱里有什么

### 增强 2：GUI 显式可视化

- 当前激活的 Skill 以徽章形式显示在对话窗口顶部
- 🟢 = 正在使用，💤 = 已安装未激活
- Agent 唤醒 Skill 时有视觉动画提示
- 用户可随时手动开关任意 Skill
- **核心体验**：用户始终知道 Agent 拥有什么能力、正在用什么能力，但不需要自己管理

### 文件结构

```
skill.md          ← 指令（兼容现有 Skill 格式）
scripts/          ← 可执行代码（兼容现有 Skill 格式）
trigger.toml      ← 🆕 Agent 唤醒规则配置（GUI 增强）
face.toml         ← 🆕 卡片展示配置（GUI 增强）
```

### 📌 待展开：Skill 自动沉淀机制

参考 Hermes Agent 项目——任务完成后 Agent 主动判断/询问是否将工作流固化为可复用 Skill。留待未来细化。

## 六、开发计划

### 开发方式

- **全程 Vibecoding**：同时使用 Codex + Claude Code 协作开发
- 关键前提：提前建立 `CONTEXT.md` 和架构文档，作为两个 Agent 的"共享大脑"
- Tauri 项目前后端分离，Agent 需要清楚知道改什么该动哪边

### 节奏：每周 1-2 小时（B 模式）

当前主线是考公备考，本项目作为 AI 学习的实践载体慢推。

**修正后的推进顺序（先认识模型，再建工具）：**

| 阶段 | 产出 | 目标 |
| --- | --- | --- |
| **Phase 0：API Demo** | 最小 CLI / 脚本，接通 Deepseek API，能 chat，能看 token 消耗和响应时间 | 接通模型 |
| **Phase 1：模型认知** | 30+ 测试用例覆盖 7 维度，形成《Deepseek 模型行为报告》 | 系统认识 Deepseek |
| **Phase 2：Harness 设计** | 基于测试结论确定 prompt 模板、输出格式、重试策略、上下文排列策略，写入 `MODEL_ADAPTER_SPEC.md` | Harness 设计定型 |
| **Phase 3：工具建设** | Tauri 空壳 → 文件树 → 文件读取 → 对话 UI → Search & Replace → diff → 写入 → 快照撤回 | 端到端最小闭环 |
| **Phase 4：自举评估** | 评估 Deepseek 能否胜任开发，达标则切换为 Deepseek 自主开发本工具 | self-hosting 验证 |

**里程碑**：Phase 3 完成后，应有一个能用 Deepseek 读写本地代码文件的最简桌面应用——丑但能跑。

### MVP（v0.1）功能边界

1. ✅ 对话式代码编辑（连接 Deepseek API，GUI 对话，读写本地文件）
2. ✅ 项目上下文管理（加载项目目录，模型理解代码库）
3. ✅ 终端集成（GUI 内执行命令，输出反馈给模型）

**v0.2+ 再做**：分支管理可视化、设计美学打磨、Skill 系统完整实现、RAG。继续保持 Deepseek-only，不做其他模型接入。

### 开源策略

- 核心架构搭好后开源
- Tauri 的前后端分离结构天然适合社区协作（前端低门槛 + Rust 后端核心贡献者）
- "轻量国产替代"叙事 + "用 Codex 和 Claude Code 造了一个它们的竞品"的元故事，对传播有利

## 七、命名

**待定。** 方向已确认：与"麒麟"意象相关。候选方案（按推荐排序）：

1. **Qilin** — 最纯粹，国际化拼写，搜索唯一性强
2. **Qirin** — Qilin 的变体，更独特
3. **QCode** — 麒 + Code，极简

最终命名在其他决策都确定后再敲定。

---

## 八、对话复盘

**方法论**：本次对话采用 Grill Me 模式，于野逐一追问每个决策分支，每个问题给出推荐答案，麒麟确认或修正。共覆盖 12 个核心问题。

**关键洞察：**

- 麒麟对"专用工具优于通用工具"的直觉非常准确——这是整个项目的差异化根基
- 在 Skill 系统讨论中，麒麟及时纠正了过度设计的倾向（Trait 四层 → 回归 Skill 本质 + 两个增强层）
- 选择 Tauri 而非 Electron 是一个有远见的决策——前期多投入，后期在性能、体积、安全性上持续回报
- 树形对话结构和 Git 快照的组合方案，是"上下文卫生"问题的优雅解法

**麒麟的思维特征（本次对话观察）：**

- 对产品的整体感觉很准（设计哲学、模型选择逻辑），但具体技术实现层面会诚实说"我不清楚"——这是好品质，避免了假装懂导致的错误决策
- 倾向于先确认方向再展开细节，不会被细节带着跑——适合做产品
- 善于从其他产品中提取优点并组合，而非从零发明——这在 Vibecoding 时代是高效策略

---

## 九、审计结果与下一步编程指引

**审计时间**：2026-05-03

**审计结论**：项目方向成立，但当前文档仍偏“项目愿景 + 产品决策”，下一步需要由真正负责编程的大模型综合本项目文档与本审计结果，产出一份严肃、可执行、可验收的工程工作文档。

### 9.1 与 OpenCode 的区别

**OpenCode 当前定位**：开源 AI coding agent，可用于终端、桌面应用和 IDE 扩展，支持 LSP、多会话、分享链接、GitHub Copilot / ChatGPT Plus 登录，以及通过 [Models.dev](http://Models.dev) 接入 75+ LLM providers 与本地模型。

**本项目定位（已修订）**：Deepseek 专用的桌面 AI 编程 Agent，核心不是“支持尽可能多模型”，而是围绕 Deepseek 做深度适配，形成更适合 Deepseek 输出习惯、工具调用稳定性和上下文行为的编程体验。

**关键差异**：

1. **模型策略不同**：OpenCode 是多模型通用框架；本项目是 Deepseek-only 专用工具。
2. **产品入口不同**：OpenCode 以 terminal-first 为主，同时提供桌面与 IDE；本项目应坚持 desktop GUI-first，强调可视化 Skill、对话树、文件修改预览和权限确认。
3. **差异化根基不同**：OpenCode 的优势是开放、通用、生态覆盖广；本项目的优势应是国产模型工程化体验、低成本、本地化、轻量分发和专用调优。
4. **适配深度不同**：本项目不应只做 API 接入，而要沉淀 Deepseek 行为测试集，针对 Deepseek 的 prompt、function calling、上下文排列、输出格式和重试策略做专项优化。
5. **MVP 目标不同**：OpenCode 已经是成熟开源 coding agent 方向；本项目第一阶段不应追求功能覆盖，而应验证“国产模型 + 桌面 GUI + 安全文件修改闭环”是否成立。

### 9.2 当前项目合理性

**成立的部分**：

- “Claude Code 为 Claude，Codex 为 GPT，本项目为国产模型”的产品叙事清晰，有传播点。
- Tauri v2 + React + Rust 的技术路线适合轻量桌面应用，符合“轻量国产替代”的长期叙事。
- Deepseek Harness 是当前正确抽象。项目不再为其他模型提前设计通用 Adapter。
- 对话树结构应从 v0.1 开始设计，避免线性对话导致上下文污染，后期再改代价极高。
- Search & Replace 比 apply_patch 更适合作为国产模型早期文件修改方案，但必须配套安全校验。

**需要收敛的部分**：

- Deepseek-only 是当前战略，不只是 MVP 收敛。第一版只接入 Deepseek，后续也不以新增模型为目标。
- Skill 系统方向成立，但不应进入 v0.1 核心功能。MVP 只保留接口或概念，不做完整 Skill runtime。
- 终端集成、RAG、多模态、Skill 自动沉淀、分支管理可视化都应后置。
- Git 快照不能默认使用破坏性的 `git reset`。应优先采用内部快照、独立分支、补丁记录或用户确认后的受控回滚。

### 9.3 MVP 边界重定义

**原 MVP 表述**：对话式代码编辑 + 项目上下文管理 + 终端集成。

**审计后建议 MVP**：

> 选择一个本地项目目录，加载文件树，让 Deepseek 读取指定文件，并通过 Search & Replace 修改一个文件。用户能看到修改预览，确认后写入，失败时能回退。
> 

**v0.1 必须完成的最小闭环**：

1. 打开本地项目目录。
2. 展示项目文件树。
3. 用户选择或要求 Agent 读取某个文件。
4. Deepseek 根据用户请求生成修改方案。
5. Agent 使用 Search & Replace 生成文件修改。
6. 系统检查 `oldStr` 是否唯一匹配。
7. 写入前展示 diff / 修改预览。
8. 用户确认后写入文件。
9. 写入前自动保存快照。
10. 支持撤回最近一次修改。

**v0.1 暂不做**：

- 多模型自动切换
- 任何非 Deepseek 模型接入
- 终端命令执行
- RAG / Embedding 索引
- Skill 可视化与自动唤醒
- 多模态
- 开源传播包装

### 9.4 编程大模型下一步应产出的严肃工程文档

下一步真正负责编程的大模型，不应直接开始写代码，而应先基于本项目文档和本审计结果，产出以下工程文档：

1. `PROJECT_BRIEF.md`：项目目标、非目标、目标用户、MVP 成功标准。
2. `ARCHITECTURE.md`：Tauri 前后端职责、Rust 模块边界、React 页面结构、数据流。
3. `CONTEXT.md`：给后续 Vibecoding Agent 的共享上下文，包括项目愿景、技术约束、命名约定、禁止事项。
4. `MVP_SPEC.md`：v0.1 功能清单、用户流程、验收标准、暂不实现内容。
5. `DEEPSEEK_HARNESS_SPEC.md`：Deepseek harness 接口、prompt、JSON 输出契约、校验失败重试策略。
6. `FILE_EDITING_SPEC.md`：文件读取、Search & Replace、唯一性校验、diff 预览、快照、撤回机制。
7. `SECURITY_MODEL.md`：Read-only / Auto / Full Access 权限模型的未来设计；v0.1 只实现最小安全确认。
8. `TEST_CASES.md`：20-30 个模型行为测试任务，作为后续判断国产模型适配效果的基准。

### 9.5 待验证假设

1. Deepseek 当前 API 在代码编辑任务中的稳定性、上下文长度和输出格式可控性。
2. Deepseek 是否能稳定生成可执行的 Search & Replace 修改。
3. 桌面 GUI 是否比 CLI 更适合目标用户的真实工作流。
4. Tauri + Rust 后端是否适合当前 Vibecoding 节奏，是否会在早期拖慢验证速度。
5. 每周 1-2 小时投入下，四周 MVP 是否现实；若不现实，应以“完成端到端最小闭环”为唯一优先级。

### 9.6 对后续执行的提醒

- 不要复刻 OpenCode 的完整功能面，也不要把 Claude Code / Codex / OpenCode 的所有优点一次性搬进来。
- 第一阶段只验证一个问题：国产模型能否在本工具中安全、稳定、可确认地修改本地代码文件。
- 所有“酷功能”都必须服从 MVP 闭环，不进入第一阶段。
- 编程大模型每次新增功能前，都应先说明它服务于 MVP 闭环中的哪一步；无法说明的功能默认推迟。

### 9.7 Claude Code 本质验证：项目立论基础

Claude Code 的本质是 Claude 的专用 Harness（模型专用中间层）——prompt 工程、输出格式控制、上下文窗口策略、工具调用协议、安全模型，全部针对 Claude 调优。Anthropic 自己也说过，Claude Code 的存在是因为模型自身能力还不够，终极目标是模型不再需要外部编排。

这直接验证了本项目的立论：如果 Claude Code 是 Claude 的专用 Harness，那 Deepseek 也需要自己的专用 Harness。本项目不是"又一个 AI 编程壳子"，而是"Deepseek 的能力释放层"。

### 9.8 项目推进顺序修正：先认识模型，再建工具

原计划是工具导向（搭 Tauri → 接 API → 做文件修改）。审计后修正为模型认知导向：

- **Phase 0**：最小 API Demo（CLI 脚本，不需要 GUI）
- **Phase 1**：设计 30+ 测试用例，覆盖 7 个维度，系统认识 Deepseek 的输出习惯、注意力分布、格式控制能力
- **Phase 2**：基于测试结论确定 Harness 设计（prompt 模板、输出格式、重试策略、上下文排列）
- **Phase 3**：开始建工具

模型认知是地基，工具建设是上层建筑。如果先搭工具再发现模型行为与假设不符，工具层需要返工。

### 9.9 Deepseek 自举策略

用 Deepseek 开发 Deepseek 专用工具（self-hosting / bootstrapping）存在理论优势：

- 开发过程中遇到的问题 = 未来用户会遇到的问题，每次开发迭代同时是模型行为测试
- Deepseek 的输出习惯会自然融入代码风格，后续模型读写更顺
- 叙事价值高："用 Deepseek 开发了 Deepseek 专用编程工具"

**但有前提条件**：Phase 1 测试集跑完后，Deepseek 在 Rust / TypeScript / React 场景的表现须达到"基本可用、偶尔需要修正"的水平。6 项评估中有 4 项达标即可开始切换。

**策略**：Phase 0-2 用 Claude Code 开发（需要快速出活），Phase 3 完成后根据测试数据决定是否切换到 Deepseek 自主开发。

**风险**："近亲繁殖"——代码全由 Deepseek 写，风格与 Deepseek 输出高度一致，其他模型 / 人类开发者可读性下降。应对：保持 Claude Code / Codex 做 code review，定期让其他模型读同一代码库测试可理解性。

[AGENTS-md v0.1——Claude Code 执行规则](https://www.notion.so/AGENTS-md-v0-1-Claude-Code-aeab78ef49944d8b9f0272788bb46a41?pvs=21)
