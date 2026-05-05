import type { EditProposal, FileNode } from "./types";

export const mockFiles: FileNode[] = [
  {
    name: "src",
    path: "src",
    kind: "directory",
    children: [
      { name: "App.tsx", path: "src/App.tsx", kind: "file" },
      { name: "deepseekHarness.ts", path: "src/deepseekHarness.ts", kind: "file" },
      { name: "styles.css", path: "src/styles.css", kind: "file" }
    ]
  },
  {
    name: "docs",
    path: "docs",
    kind: "directory",
    children: [{ name: "MODEL_BEHAVIOR.md", path: "docs/MODEL_BEHAVIOR.md", kind: "file" }]
  },
  { name: "package.json", path: "package.json", kind: "file" }
];

export const fileContents: Record<string, string> = {
  "src/App.tsx": `export function App() {
  return (
    <main className="home">
      <h1>Deepseek Workbench</h1>
      <button>Start</button>
    </main>
  );
}
`,
  "src/deepseekHarness.ts": `export async function requestDeepseekEdit() {
  return {
    summary: "等待接入真实 Deepseek API",
    edits: []
  };
}
`,
  "src/styles.css": `.home {
  min-height: 100vh;
  display: grid;
  place-items: center;
}
`,
  "docs/MODEL_BEHAVIOR.md": `# Deepseek 模型行为记录

- JSON 输出稳定性
- Search & Replace 精确复制能力
- 校验失败后的修复能力
`,
  "package.json": `{
  "name": "sample-project",
  "private": true
}
`
};

export const proposal: EditProposal = {
  summary: "将首页主按钮文案改得更明确，同时保持组件结构不变。",
  path: "src/App.tsx",
  oldStr: "<button>Start</button>",
  newStr: "<button>Start coding</button>",
  reason: "按钮动作更具体，便于用户理解下一步是进入编码工作流。"
};

export const userRequest =
  '把首页按钮的文案从 "Start" 改成 "Start coding"，不要改变组件结构。';

