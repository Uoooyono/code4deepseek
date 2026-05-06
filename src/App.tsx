import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  CircleAlert,
  Code2,
  FileText,
  FolderOpen,
  GitCompareArrows,
  MessageSquareText,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  SquarePen
} from "lucide-react";
import { fileContents, mockFiles, proposal, userRequest } from "./mockWorkspace";
import type { DiffLine, FileNode, ValidationState } from "./types";

const primaryEdit = proposal.edits[0];

function countMatches(source: string, needle: string) {
  if (!needle) return 0;
  return source.split(needle).length - 1;
}

function FileTreeNode({
  node,
  selectedPath,
  onSelect
}: {
  node: FileNode;
  selectedPath: string;
  onSelect: (path: string) => void;
}) {
  if (node.kind === "directory") {
    return (
      <div className="tree-group">
        <div className="tree-directory">
          <ChevronDown size={14} aria-hidden="true" />
          <span>{node.name}</span>
        </div>
        <div className="tree-children">
          {node.children?.map((child) => (
            <FileTreeNode
              key={child.path}
              node={child}
              selectedPath={selectedPath}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <button
      className={node.path === selectedPath ? "tree-file is-active" : "tree-file"}
      type="button"
      onClick={() => onSelect(node.path)}
      title={node.path}
    >
      <FileText size={14} aria-hidden="true" />
      <span>{node.name}</span>
    </button>
  );
}

function App() {
  const [selectedPath, setSelectedPath] = useState("src/App.tsx");
  const [applied, setApplied] = useState(false);

  const originalContent = fileContents[selectedPath] ?? "";
  const selectedContent =
    selectedPath === primaryEdit.path && applied
      ? originalContent.replace(primaryEdit.oldStr, primaryEdit.newStr)
      : originalContent;

  const validation: ValidationState = useMemo(() => {
    if (selectedPath !== primaryEdit.path) {
      return {
        ok: false,
        message: `当前 proposal 指向 ${primaryEdit.path}`,
        matchCount: 0
      };
    }

    const matchCount = countMatches(originalContent, primaryEdit.oldStr);
    return {
      ok: matchCount === 1,
      message: matchCount === 1 ? "oldStr 精确匹配一次" : `oldStr 匹配 ${matchCount} 次`,
      matchCount
    };
  }, [originalContent, selectedPath]);

  const diffLines: DiffLine[] = [
    { kind: "context", value: "      <h1>Deepseek Workbench</h1>" },
    { kind: "delete", value: `-      ${primaryEdit.oldStr}` },
    { kind: "add", value: `+      ${primaryEdit.newStr}` },
    { kind: "context", value: "    </main>" }
  ];

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">
            ✳
          </span>
          <span className="brand-name">Deepseek Workbench</span>
        </div>
        <div className="topbar-status">
          <span className="status-pill">
            <Sparkles size={14} aria-hidden="true" />
            Deepseek-only
          </span>
          <span className="status-pill">
            <ShieldCheck size={14} aria-hidden="true" />
            写入前确认
          </span>
        </div>
      </header>

      <section className="workspace">
        <aside className="sidebar" aria-label="工作区文件树">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">工作区</p>
              <h2>sample-project</h2>
            </div>
            <button className="icon-button" type="button" title="打开文件夹" aria-label="打开文件夹">
              <FolderOpen size={17} aria-hidden="true" />
            </button>
          </div>
          <nav className="file-tree">
            {mockFiles.map((node) => (
              <FileTreeNode
                key={node.path}
                node={node}
                selectedPath={selectedPath}
                onSelect={(path) => {
                  setSelectedPath(path);
                  setApplied(false);
                }}
              />
            ))}
          </nav>
        </aside>

        <section className="editor-panel" aria-label="文件和 diff 预览">
          <div className="panel-heading editor-heading">
            <div>
              <p className="eyebrow">当前文件</p>
              <h2>{selectedPath}</h2>
            </div>
            <span className={validation.ok ? "validation is-ok" : "validation"}>
              {validation.ok ? <Check size={15} /> : <CircleAlert size={15} />}
              {validation.message}
            </span>
          </div>

          <div className="code-surface">
            <div className="code-title">
              <Code2 size={15} aria-hidden="true" />
              <span>当前内容</span>
            </div>
            <pre>{selectedContent}</pre>
          </div>

          <div className="diff-surface">
            <div className="code-title">
              <GitCompareArrows size={15} aria-hidden="true" />
              <span>Diff 预览</span>
            </div>
            <pre>
              {diffLines.map((line) => (
                <span className={`diff-line ${line.kind}`} key={`${line.kind}-${line.value}`}>
                  {line.value}
                  {"\n"}
                </span>
              ))}
            </pre>
          </div>
        </section>

        <aside className="assistant-panel" aria-label="Deepseek 修改方案">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Deepseek</p>
              <h2>修改方案</h2>
            </div>
            <span className="small-meter">0.8s</span>
          </div>

          <section className="request-block">
            <div className="section-label">
              <MessageSquareText size={15} aria-hidden="true" />
              <span>请求</span>
            </div>
            <p>{userRequest}</p>
          </section>

          <section className="proposal-block">
            <div className="section-label">
              <SquarePen size={15} aria-hidden="true" />
              <span>方案</span>
            </div>
            <p className="proposal-summary">{proposal.summary}</p>
            <dl>
              <div>
                <dt>Path</dt>
                <dd>{primaryEdit.path}</dd>
              </div>
              <div>
                <dt>oldStr</dt>
                <dd>
                  <code>{primaryEdit.oldStr}</code>
                </dd>
              </div>
              <div>
                <dt>newStr</dt>
                <dd>
                  <code>{primaryEdit.newStr}</code>
                </dd>
              </div>
            </dl>
          </section>

          <div className="action-row">
            <button
              className="primary-button"
              type="button"
              disabled={!validation.ok || applied}
              onClick={() => setApplied(true)}
              title="应用修改"
            >
              <Check size={17} aria-hidden="true" />
              应用
            </button>
            <button
              className="secondary-button"
              type="button"
              disabled={!applied}
              onClick={() => setApplied(false)}
              title="撤回最近一次修改"
            >
              <RotateCcw size={16} aria-hidden="true" />
              撤回
            </button>
          </div>

          <footer className="safety-note">
            <ShieldCheck size={15} aria-hidden="true" />
            <span>快照就绪 / 预览后写入</span>
          </footer>
        </aside>
      </section>
    </main>
  );
}

export default App;
