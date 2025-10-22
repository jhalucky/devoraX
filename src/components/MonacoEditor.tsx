"use client";

import Editor from "@monaco-editor/react";

interface MonacoEditorProps {
  language: string;
  defaultCode: string;
}

export default function MonacoEditor({ language, defaultCode }: MonacoEditorProps) {
  return (
    <Editor
      height="100%"
      theme="vs-light"
      defaultLanguage={language}
      defaultValue={defaultCode || "// Write your solution here..."}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: "on",
        automaticLayout: true,
        fontFamily: "Menlo, Monaco, 'Courier New', monospace",
      }}
    />
  );
}
