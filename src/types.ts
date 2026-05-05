export type FileNode = {
  name: string;
  path: string;
  kind: "file" | "directory";
  children?: FileNode[];
};

export type EditProposal = {
  summary: string;
  path: string;
  oldStr: string;
  newStr: string;
  reason: string;
};

export type ValidationState = {
  ok: boolean;
  message: string;
  matchCount: number;
};

