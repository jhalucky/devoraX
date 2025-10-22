"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorProps {
  language?: "python" | "cpp" | "javascript";
}

export default function CodeEditor({ language = "python" }: CodeEditorProps) {
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const runCode = async () => {
    try {
      setOutput("Running...");
      const payload = {
        source_code: code,
        language_id: language === "python" ? 71 : language === "cpp" ? 54 : 63, // Judge0 IDs
        stdin: "",
      };

      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
          },
        }
      );

      setOutput(response.data.stdout || response.data.compile_output || response.data.stderr || "No output");
    } catch (err: any) {
      setOutput(err.message || "Error running code");
    }
  };

  return (
    <div className="space-y-4">
      <MonacoEditor
        height="300px"
        language={language}
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
      />
      <button
        onClick={runCode}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Run Code
      </button>
      <div className="bg-gray-100 p-4 rounded-md min-h-[80px] whitespace-pre-wrap">{output}</div>
    </div>
  );
}
