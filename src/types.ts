export type FileNode = {
  name: string;
  path: string;
  kind: "file" | "directory";
  children?: FileNode[];
};

export type EditOperation = {
  path: string;
  oldStr: string;
  newStr: string;
  reason: string;
};

export type EditProposal = {
  summary: string;
  edits: EditOperation[];
  notes: string[];
};

export type DiffLineKind = "context" | "add" | "delete";

export type DiffLine = {
  kind: DiffLineKind;
  value: string;
};

export type ValidationState = {
  ok: boolean;
  message: string;
  matchCount: number;
};
