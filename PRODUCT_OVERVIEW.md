# code4deepseek 产品总览

> 面向非技术读者的项目说明。技术细节请看 [DEMO_DEVELOPMENT_GUIDE.md](DEMO_DEVELOPMENT_GUIDE.md) 与 [CLAUDE.md](CLAUDE.md)。

## 我们在做什么

一个**桌面端 AI 编程工具**，专为 [Deepseek](https://www.deepseek.com) 模型打造。
形态是装在电脑上的 App（Tauri 桌面壳），不是网页、不是浏览器插件。

一句话说清：

> 让 Deepseek 帮你改本地代码，但每一次改动你都先看见预览、亲手确认才会真正落到磁盘上。

## 为什么做这件事

- **Claude Code** 是为 Claude 调过的工具；**Codex** 是为 GPT 调过的工具。Deepseek 还没有一个真正为它行为特性优化的桌面 harness。
- 国产大模型在编码场景的表现，需要一个**专门的容器**来放大它的优点、控制它的弱点。多模型抽象层会把这件事拖慢。
- 安全是底线：模型再聪明，写文件这一步也必须有人按下确认键。

## 当前能体验什么

**v0 阶段，目标只有一个安全编辑闭环：**

1. 打开本地一个项目目录
2. 看到文件树
3. 点开一个源码文件，看到内容
4. 用自然语言告诉 Deepseek 你想怎么改（比如"把按钮文案改得更清楚"）
5. Deepseek 返回一个 **Search & Replace 修改方案**（旧文本 → 新文本）
6. 应用先校验旧文本在文件里精确出现一次（避免误改）
7. 弹出 diff 预览给你看
8. 你确认 → 自动保存原文件快照 → 写入修改
9. 你可以撤回最近一次修改

整个流程**在桌面 GUI 内完成**，不需要终端、不需要 Git 操作。

## 当前不能做什么（v0 范围之外）

- ❌ 接其他模型（GPT/Claude/MiMo 都不接，Deepseek-only）
- ❌ 在 App 内执行终端命令
- ❌ RAG / 向量索引
- ❌ 多模态（图片、语音）
- ❌ 多文件批量改造（v0 只支持单文件单处修改）
- ❌ Git 分支管理可视化
- ❌ 用 `git reset` 做撤回（用内部快照）

这些都不是永远不做，只是**v0 不做**。验证完核心闭环再扩展。

## 视觉风格

参考 Claude / Anthropic 的"温暖、克制、编辑型工具"气质：

- 暖白底（不是冷蓝黑）
- 近黑文字、陶土橙强调色
- 安静的边框、克制的阴影
- 工作台式布局（一打开就能干活，不做营销 landing page）

不会出现：紫蓝渐变、玻璃拟态、霓虹、装饰性光球。

## 项目当前进度（截至 2026-05-06）

- ✅ 项目骨架（Tauri v2 + React 19 + TypeScript + Vite 7）
- ✅ 静态 Mock UI（文件树 / 文件预览 / Diff 预览 / 修改方案面板都已搭好布局）
- ✅ 类型契约（`EditProposal` 等核心数据类型对齐）
- ✅ 项目管理文档体系（任务板 / 决策记录 / 状态交接）
- ⏳ Phase 1：视觉外壳收尾
- ⏳ Phase 2：接通真实文件读写
- ⏳ Phase 3：Search & Replace 引擎
- ⏳ Phase 4：Mock Deepseek 联调
- ⏳ Phase 5：真实 Deepseek API
- ⏳ Phase 6：Demo 收尾

## 开发模式

- **单人项目**：一个开发者，两台电脑（公司 + 家），通过 GitHub 同步
- **AI 协作**：Claude Code 执行编码工作，开发者审核每次产出
- **慢即是快**：每次只领一个任务，做完验收再 commit，不追求速度追求清楚

## 怎么参与体验

```bash
# 克隆项目
git clone https://github.com/Uoooyono/code4deepseek.git
cd code4deepseek

# 安装依赖（需要 Node.js 20+）
npm install

# 启动开发界面
npm run dev
# 浏览器打开 http://127.0.0.1:1420

# 启动桌面端
npm run tauri:dev
```

当前看到的还是 Mock 数据界面。等 Phase 2 完成后就能真正读你的本地项目文件了。
