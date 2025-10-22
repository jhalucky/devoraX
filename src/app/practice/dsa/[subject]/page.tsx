"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import MonacoEditor from "@monaco-editor/react";
import problems from "@/data/leetcode_problems.json";
import { headingFont, bodyFont } from "@/lib/fonts";

export default function DSACodeEditor() {
  const params = useParams();
  const problemId = params.subject;
  const problem = problems.find((p) => p.id === problemId);

  const [code, setCode] = useState(problem?.starterCode?.python || "");
  const [language, setLanguage] = useState<"python" | "cpp" | "javascript">("python");
  const [outputs, setOutputs] = useState<{ input: string; output: string; status: string }[]>([]);
  const [running, setRunning] = useState(false);

  if (!problem) {
    return (
      <div className={`min-h-screen flex items-center justify-center text-gray-400 ${bodyFont.className}`}>
        Problem not found ❌
      </div>
    );
  }

  const runCode = async () => {
    if (!problem.examples) return;
    setRunning(true);
    const results: typeof outputs = [];

    for (let i = 0; i < problem.examples.length; i++) {
      const ex = problem.examples[i];
      try {
        const res = await fetch("/api/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source_code: code,
            language,
            stdin: ex.input,
          }),
        });
        const data = await res.json();
        const output = (data.output || "").trim();
        const status = output === ex.output.trim() ? "Passed ✅" : "Failed ❌";
        results.push({ input: ex.input, output, status });
      } catch (err) {
        results.push({ input: ex.input, output: "Error running code", status: "Failed ❌" });
      }
    }

    setOutputs(results);
    setRunning(false);
  };

  return (
    <main className={`min-h-screen bg-gray-900 text-gray-100 px-6 py-10 ${bodyFont.className}`}>
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Problem Description */}
        <div className="p-6 bg-gray-800 rounded-xl shadow-md">
          <h1 className={`text-3xl font-semibold mb-4 ${headingFont.className}`}>
            {problem.title} <span className="text-sm font-normal text-gray-400 ml-2">({problem.difficulty})</span>
          </h1>
          <pre className="text-gray-200 whitespace-pre-wrap leading-relaxed">{problem.description}</pre>
        </div>

        {/* Code Editor */}
        <div className="flex flex-col h-full">
          {/* Language Dropdown */}
          <div className="flex justify-end mb-2">
            <label className="font-medium text-gray-200 mr-2">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-gray-700 text-gray-200 border border-gray-600 rounded px-2 py-1"
            >
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>

          <MonacoEditor
            height="500px"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: `"${bodyFont.style.fontFamily}", monospace`,
              automaticLayout: true,
            }}
          />
          <button
            onClick={runCode}
            disabled={running}
            className={`mt-4 px-4 py-2 rounded-md text-white ${
              running ? "bg-gray-600" : "bg-indigo-600 hover:bg-indigo-700"
            } transition`}
          >
            {running ? "Running..." : "Run Code"}
          </button>

          {/* Test case outputs */}
          {outputs.length > 0 && (
            <div className="mt-4 space-y-2">
              {outputs.map((o, idx) => (
                <div key={idx} className="p-3 bg-gray-700 rounded-md">
                  <p className="text-gray-300"><strong>Input:</strong> {o.input}</p>
                  <p className="text-gray-100"><strong>Output:</strong> {o.output}</p>
                  <p className={o.status.includes("Passed") ? "text-green-400" : "text-red-400"}>
                    <strong>Status:</strong> {o.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
