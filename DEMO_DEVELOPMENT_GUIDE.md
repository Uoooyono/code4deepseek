# Demo 开发指南：国产大模型桌面 AI 编程工具

**状态**：首个 Demo 的工作指南  
**来源**：`国产大模型桌面 AI 编程工具——项目决策文档.md`  
**日期**：2026-05-05  
**当前执行口径**：Deepseek-only；视觉风格对齐 Claude / Anthropic 的温暖、克制、编辑型工具审美。  

本文档将项目决策文档整理为首个可用 Demo 的执行指南。原始文档继续作为战略存档；本文档作为 Demo 开发期间的工作参考。

---

## 1. Demo 目标

构建一个轻量级桌面 AI 编程 Demo，用来验证一件事：

> 国产大模型能否通过桌面 GUI 安全地读取并修改本地代码文件，同时让用户在写入前看见修改预览，并支持可逆写入。

这个 Demo 不追求在功能覆盖面上对标 Claude Code、Codex 或 OpenCode。它只需要验证 Deepseek 专用 coding harness 的核心闭环是否成立。

### 一句话产品定义

一个只围绕 Deepseek 优化的 Tauri 桌面编程 Agent，专注于通过可视化流程安全编辑本地文件。

### 核心判断

Claude Code 是为 Claude 调优的 harness。Codex 是为 GPT 调优的 harness。本项目的执行判断是：Deepseek 需要一个专门针对其 prompt 行为、工具调用可靠性、上下文行为和编辑格式调优的桌面 harness。后续不再为任何其他模型预留产品设计、UI 入口或抽象层复杂度。

---

## 2. Demo 范围

### v0 Demo 闭环

首个 Demo 必须完成以下闭环：

1. 用户打开一个本地项目目录。
2. 应用展示文件树。
3. 用户选择一个源码文件，或要求 Agent 处理某个源码文件。
4. 应用读取文件，并将相关上下文发送给 Deepseek。
5. Deepseek 返回结构化的 Search & Replace 修改方案。
6. 应用校验每个 `oldStr` 是否只匹配一次。
7. 应用在写入前展示 diff 预览。
8. 用户确认修改。
9. 应用在写入前保存本地快照。
10. 应用写入修改。
11. 用户可以撤回最近一次已应用的修改。

### Demo 成功标准

当用户可以完成以下动作时，Demo 即可视为成功：

- 打开一个小型本地项目。
- 用自然语言要求修改一个简单文件。
- 在写入前看到模型提出的修改方案。
- 只有在确认后才应用修改。
- 撤回最近一次已应用的修改。
- 从 UI 中清楚理解读取了哪个文件、提出了什么修改、实际改动了什么。

### Demo 非目标

首个 Demo 不做以下内容：

- 任何非 Deepseek 模型接入。
- 多模型路由、模型市场、provider 切换。
- 终端命令执行。
- RAG 或 embedding 索引。
- 完整 Skill runtime。
- Skill 可视化。
- 多模态输入或输出。
- 分支管理可视化。
- 开源官网、品牌包装或营销文案。
- 基于 Git 的破坏性回滚。
- 自主多步骤仓库修改。

如果某个功能不能直接服务于 v0 Demo 闭环，就推迟。

---

## 3. 产品形态

### 主要用户流程

1. **启动应用**  
   用户看到一个空工作区状态，以及 Open Folder 操作。

2. **选择项目**  
   应用要求用户选择一个本地目录。被选中的目录成为 workspace root。

3. **查看项目**  
   应用在左侧展示文件树。用户可以点击文件并预览内容。

4. **提出修改请求**  
   用户在聊天面板中输入请求，例如：

   ```text
   把这个按钮文案改得更清楚，并保持现有组件结构不变。
   ```

5. **生成修改方案**  
   应用将选中文件内容、文件路径和用户指令发送给 Deepseek harness。

6. **审核修改方案**  
   应用展示：

   - 模型摘要。
   - 目标文件。
   - Search & Replace 块。
   - Diff 预览。
   - 校验结果。

7. **应用或拒绝**  
   用户点击 Apply 写入修改，或点击 Reject 放弃方案。

8. **撤回**  
   用户可以在同一会话中撤回最近一次已应用的修改。

### 推荐布局

使用安静、工具化的桌面布局，不要做成 landing page。

- 左侧栏：workspace 文件树。
- 中间面板：选中文件预览和 diff 预览。
- 右侧或底部面板：聊天与修改方案控制。
- 顶栏：workspace 名称、模型状态、权限模式。
- 状态区：当前操作、token 估算、校验错误。

UI 应该像一个工作台：信息密度高、清晰、可预测。

### Claude-like 视觉规范

设计目标不是复制 Claude 商标或 logo，而是吸收 Claude / Anthropic 的视觉语言：温暖白底、深黑主文本、陶土橙强调色、克制边框、低噪声布局、编辑型工具气质。

参考来源：

- [Claude 登录页](https://claude.ai/login)：温暖浅色背景、黑色主操作、陶土橙品牌符号、大留白。
- [Claude Code 产品页](https://claude.com/product/claude-code)：面向开发者工具的克制表达，强调清晰任务流而非装饰。
- [Anthropic brand-guidelines skill](https://github.com/anthropics/skills/blob/main/skills/brand-guidelines/SKILL.md)：可参考色值包括深黑、暖白、浅灰、陶土橙、低饱和蓝绿。
- [Claude Design 的设计系统文档](https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design)：颜色、字体、组件、布局模式和交互规范应作为统一系统维护。

#### 颜色

优先使用以下设计 token：

```css
--color-bg: #faf9f5;
--color-surface: #ffffff;
--color-surface-warm: #f3f1e8;
--color-border: #e8e6dc;
--color-border-strong: #d8d4ca;
--color-text: #141413;
--color-text-muted: #6f6b63;
--color-accent: #d97757;
--color-accent-hover: #c96442;
--color-success: #788c5d;
--color-info: #6a9bcc;
```

使用规则：

- 背景以暖白 / 米白为主，不使用冷白、深蓝黑或紫色渐变。
- 主按钮优先使用近黑色；陶土橙用于品牌标识、当前状态、关键强调和小面积高亮。
- 边框必须低对比，阴影必须轻，不做发光、玻璃拟态或渐变装饰。
- Diff 中新增可使用低饱和绿，删除可使用低饱和陶土红，避免刺眼高饱和红绿。

#### 字体与排版

- 工具界面正文使用系统 sans 字体，保证代码工具中的可读性和密度。
- 品牌名、空状态标题、少量一级展示标题可以使用 Georgia / Lora 风格的 serif，呼应 Claude 的编辑型、书卷感气质。
- 代码区域使用等宽字体：`SFMono-Regular`, `Menlo`, `Monaco`, `Consolas`, monospace。
- 不使用 viewport 相关字体缩放；不使用负字距。
- 工具面板内标题要克制，避免 landing page 式超大 hero 字体。

#### 组件风格

- 卡片和面板半径控制在 8px 内，除非是登录/营销页式独立容器。
- 面板使用 1px 暖灰边框，必要时加非常轻的阴影。
- 按钮分三类：黑色主按钮、白底描边次按钮、陶土橙小面积强调按钮。
- 图标使用细线风格，尺寸以 16px / 18px 为主。
- 状态 badge 使用浅底、细边框、小字号，不使用大面积彩色胶囊。

#### 布局气质

- 第一屏就是可工作的编辑界面，不做营销页。
- 保持明显留白，但工具区信息密度不能过低。
- 视觉重心放在文件、diff、Deepseek 修改方案和确认动作上。
- 不使用装饰性 orb、bokeh、霓虹、紫蓝渐变或过度插画。
- UI 文案要短，避免在应用内解释功能原理。

---

## 4. 架构

### 技术基线

- 桌面壳：Tauri v2。
- 前端：React + TypeScript + 手写 CSS。
- 后端：Rust Tauri commands。
- 模型：只接入 Deepseek。
- 模型策略：Deepseek-only，不做其他模型的接口、UI 或路由预留。
- 编辑格式：Search & Replace。
- 快照：内部文件快照，不使用 `git reset`。

### 前端职责

前端负责展示、用户意图和审核流程。

建议组件：

- `AppShell`：全局布局。
- `WorkspacePicker`：打开文件夹的空状态。
- `FileTree`：可浏览的 workspace 文件树。
- `FileViewer`：只读的选中文件视图。
- `ChatPanel`：用户指令输入和消息历史。
- `EditProposalPanel`：结构化模型修改方案。
- `DiffPreview`：修改前后的可视化 diff。
- `ApplyControls`：应用、拒绝、撤回。
- `StatusBar`：模型、权限、校验和写入状态。

前端不能直接写文件。它通过 Rust commands 完成文件读取、校验、写入和撤回。

### Rust 后端职责

后端负责文件系统访问、校验、模型请求、快照和写入。

建议模块：

- `workspace`：workspace root、路径安全、文件列表。
- `files`：读取文本文件，识别二进制或不支持的文件。
- `deepseek`：Deepseek harness、prompt、响应解析和重试。
- `editing`：Search & Replace 校验和应用。
- `diff`：为前端生成预览数据。
- `snapshot`：保存和恢复最近一次已应用修改。
- `commands`：Tauri IPC command surface。

### 建议 Tauri Commands

```rust
select_workspace() -> Workspace
list_files(root: WorkspaceId) -> Vec<FileNode>
read_file(path: WorkspacePath) -> FileContent
request_deepseek_edit(input: EditRequest) -> EditProposal
validate_edit(proposal: EditProposal) -> ValidationResult
preview_edit(proposal: EditProposal) -> DiffPreview
apply_edit(proposal: EditProposal) -> ApplyResult
undo_last_edit() -> UndoResult
```

具体 command 名称可以在实现时调整，但边界应保持稳定：前端发起请求，Rust 负责 Deepseek 请求、校验和写入。

---

## 5. 核心数据契约

### File Node

```ts
type FileNode = {
  name: string;
  path: string;
  kind: "file" | "directory";
  children?: FileNode[];
};
```

### Edit Request

```ts
type EditRequest = {
  workspaceRoot: string;
  targetFiles: string[];
  instruction: string;
  selectedFileContent: string;
};
```

### Model Edit Proposal

应要求 Deepseek 返回符合以下结构的 JSON：

```json
{
  "summary": "用一句短句说明本次修改意图。",
  "edits": [
    {
      "path": "src/App.tsx",
      "oldStr": "当前文件中必须精确存在的原文",
      "newStr": "替换后的完整文本",
      "reason": "为什么需要这处修改"
    }
  ],
  "notes": []
}
```

规则：

- `oldStr` 必须从当前文件中精确复制。
- `newStr` 必须包含完整替换文本。
- 模型不能声称文件已经被写入。
- harness 模式下，模型不能在 JSON 外输出非结构化 Markdown。
- v0 优先支持单文件修改；多文件修改后续再扩展。

### Validation Result

```ts
type ValidationResult = {
  ok: boolean;
  errors: string[];
  editMatches: Array<{
    path: string;
    matchCount: number;
  }>;
};
```

只有当每个 `oldStr` 都精确匹配一次时，修改才能被应用。

---

## 6. 文件编辑规则

### Search & Replace 策略

v0 只支持 Search & Replace 这一种编辑格式。

一个修改只有在满足以下条件时才有效：

- 目标路径位于所选 workspace 内。
- 目标路径指向文本文件。
- 目标文件自方案生成后没有发生变化。
- `oldStr` 非空。
- `oldStr` 在目标文件中只出现一次。
- 应用修改后仍然生成合法 UTF-8 文本。

### 写入安全

写入前：

1. 保存原始文件内容快照。
2. 展示 diff 预览。
3. 要求用户明确确认。

写入后：

1. 记录已应用修改的元数据。
2. 清楚展示成功或失败状态。
3. 启用最近一次修改的撤回功能。

### 快照策略

Demo 中不要使用 `git reset`。

使用内部快照存储，例如：

```text
.qilin/
  snapshots/
    last-edit.json
```

快照应存储：

- Workspace root。
- 文件路径。
- 原始内容。
- 新内容。
- 时间戳。
- 用户指令。
- 模型摘要。

这样可以保持撤回逻辑简单，并避免破坏性的 Git 行为。

---

## 7. Deepseek Harness 计划

### v0 规则

只实现 `DeepseekHarness`。不再设计任何非 Deepseek adapter、多模型路由或 provider 切换。代码可以保持模块边界清晰，但不要为不存在的模型提前制造抽象复杂度。

### Harness 职责

Deepseek harness 不只是 API 包装器。它负责 Deepseek 专用行为：

- System prompt。
- 修改输出 JSON 契约。
- 无效 JSON 后的重试 prompt。
- `oldStr` 匹配失败后的重试 prompt。
- 可用时展示 token 和延迟信息。
- 选中文件内容的上下文组织方式。

### 最小 Harness 接口

```ts
interface DeepseekHarness {
  requestEdit(input: EditRequest): Promise<EditProposal>;
  repairEditResponse(rawOutput: string): Promise<EditProposal>;
  getModelName(): "deepseek";
}
```

Rust 实现可以通过 Tauri commands 暴露等价行为。具体语言边界可以调整，但概念应保持稳定。

### Deepseek Prompt 要求

生成修改方案的 prompt 应包含：

- 角色：代码修改规划器。
- 硬性规则：只返回 JSON。
- 硬性规则：绝不直接写文件。
- 硬性规则：使用精确 Search & Replace。
- Workspace 相对文件路径。
- 当前文件内容。
- 用户指令。
- 期望 schema。

当校验失败时，使用校验错误和当前文件内容进行重试。

---

## 8. 开发顺序

按薄垂直切片推进。每个切片完成后，应用都应保持可运行。

### Slice 1: Tauri Shell

目标：启动桌面应用，并呈现最终粗略布局。

交付物：

- Tauri v2 应用可启动。
- React 布局包含文件树区域、编辑器/diff 区域和聊天区域。
- 静态 mock 数据可以验证布局密度和间距。

验收：

- 应用打开无错误。
- 不需要后端模型调用。

### Slice 2: Workspace and File Tree

目标：选择本地文件夹并查看文本文件。

交付物：

- Open folder command。
- 安全的 workspace root 状态。
- 带基础忽略规则的递归文件树。
- 点击文件后读取并展示内容。

验收：

- 用户可以打开一个小型项目并查看一个源码文件。
- 应用会拒绝 workspace 外部路径。

### Slice 3: Search & Replace Engine

目标：在不接入模型的情况下，校验、预览、应用并撤回一个手动修改方案。

交付物：

- 内部 `EditProposal` 类型。
- 唯一匹配校验。
- Diff 预览。
- 写入前快照。
- 应用和撤回。

验收：

- 一个硬编码或手动输入的 proposal 可以修改选中文件。
- 无效 `oldStr` 会被阻止，并显示清晰错误。
- 撤回可以精确恢复原始内容。

### Slice 4: Mock Deepseek Harness

目标：在不依赖真实 API 稳定性的情况下，把聊天流程接到修改方案流程上。

交付物：

- Mock Deepseek harness 可以针对已知样例文件返回有效 proposal。
- UI 展示模型摘要、校验状态和 diff。

验收：

- 完整 Demo 闭环可以离线跑通，并作用于准备好的样例文件。

### Slice 5: Deepseek API Harness

目标：用真实 Deepseek 调用替换 mock harness。

交付物：

- API key 配置。
- Deepseek 请求/响应处理。
- JSON 解析和修复路径。
- 校验失败后的重试。
- 可用时展示 token/延迟。

验收：

- Deepseek 能为简单源码文件提出至少一个有效 Search & Replace 修改。
- 无效模型输出不会写入磁盘。

### Slice 6: Demo Polish

目标：让 Demo 一眼可理解。

交付物：

- 清晰的空状态。
- 清晰的校验消息。
- 清晰的 apply/reject/undo 控制。
- 用于 Demo 的小型样例项目。

验收：

- 新用户不看日志也能理解发生了什么。

---

## 9. Demo 脚本

使用一个小型 React 或 TypeScript 样例项目。样例应包含一个明显的目标文件和一个简单修改请求。

### 示例场景

目标文件：

```text
src/App.tsx
```

用户请求：

```text
把首页按钮的文案从 "Start" 改成 "Start coding"，不要改变组件结构。
```

预期行为：

1. 应用读取 `src/App.tsx`。
2. Deepseek 返回一个 Search & Replace 修改。
3. 校验确认 `oldStr` 只出现一次。
4. Diff 预览只展示按钮文案变化。
5. 用户应用修改。
6. 文件内容发生变化。
7. 用户点击撤回。
8. 原始文件内容被恢复。

### 备用 Demo 路径

如果真实 API 在 Demo 时不稳定，就使用 mock harness。只要它证明产品流程和文件安全机制成立，这个 Demo 仍然有效。真实 Deepseek 集成可以通过日志或受控测试单独展示。

---

## 10. 起步模型行为测试

完整项目后续应扩展出 30+ 个模型行为测试用例。Demo 阶段先从以下最小测试开始：

1. 返回符合 edit proposal schema 的有效 JSON。
2. 从短 TypeScript 文件中精确复制 `oldStr`。
3. 完成一处单行 UI 文案修改。
4. 做一个小型重构，且不改变无关代码。
5. 在被告知 `oldStr` 匹配 0 次后能够恢复。
6. 在被告知 `oldStr` 匹配多次后能够恢复。
7. 当目标文件不存在时，拒绝或要求澄清。
8. 在被明确要求时，避免在 JSON 外包裹 Markdown fence。

每个测试记录：

- 测试 ID。
- Prompt。
- 目标文件。
- 原始输出。
- 解析后输出。
- 校验结果。
- 备注。

这些测试会反过来指导 Deepseek harness 的 prompt 和重试策略。

---

## 11. v0 安全规则

Demo 默认权限模式：**写入前确认**。

规则：

- 只允许读取所选 workspace 内的文件。
- 只允许写入所选 workspace 内的文件。
- 每次写入都必须先预览并明确确认。
- 网络只用于已配置的模型 API。
- v0 不执行终端命令。
- 不做后台编辑。
- 不使用 Git reset。
- 不编辑二进制文件。
- 不编辑超过配置文本文件大小上限的文件。

未来权限模式可以沿用原始文档中的 Read-only / Auto / Full Access 模型，但 v0 只需要一个保守模式。

---

## 12. 风险与应对

### 风险：Deepseek 无法稳定遵守 JSON 输出格式。

应对：保留 mock harness，增加 JSON 修复，并用只强调 schema 的 prompt 重试。不要让无效输出进入写入路径。

### 风险：Search & Replace 过于脆弱。

应对：把脆弱性视为有价值的信号。Demo 应清楚展示匹配错误，并要求模型基于当前文件内容重新生成。

### 风险：Tauri 和 Rust 拖慢早期迭代。

应对：隔离复杂部分。先用 mock 数据构建 UI 和编辑流程，再逐个接入 Rust commands。

### 风险：范围膨胀成完整 coding agent。

应对：每个任务都必须映射到 v0 Demo 闭环中的某一步。否则推迟。

---

## 13. 给 Coding Agent 的工作规则

工作规则、产品红线、Git 与验证流程的单一事实来源是 [CLAUDE.md](CLAUDE.md)。本文件只作为 Demo 的产品/架构规格说明，**不重复定义规则**。

新增任何功能前，对照 CLAUDE.md 检查是否违反 §Prohibitions，并说明该功能服务于 §2 v0 Demo 闭环中的哪一步。

---

## 14. 完成定义

当以下条件满足时，首个 Demo 完成：

- 应用能作为桌面 GUI 启动。
- 用户可以选择本地 workspace。
- Workspace 文件树可见。
- 可以读取并展示一个源码文件。
- 用户指令可以通过 mock harness 或真实 Deepseek 生成 edit proposal。
- Search & Replace 校验能阻止不安全修改。
- 写入前显示 diff 预览。
- 用户确认后应用修改。
- 基于快照的撤回能恢复先前内容。
- 已推迟的功能保持推迟。

Demo 可以视觉粗糙，但行为必须清楚、安全。
