"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import pythonProblems from "@/data/python_questions.json";
import { bodyFont } from "@/lib/fonts";

interface PythonProblem {
  id: number;
  instruction: string;
  input: string;
  output: string;
}

type RunResponse = { output?: string; error?: string };

export default function PythonCodeEditor() {
  const params = useParams();
  const problemId = typeof params?.subject === "string" ? params.subject : undefined;

  // Match problem safely
  const problem = pythonProblems.find(
    (p: PythonProblem) => String(p.id) === problemId
  ) as PythonProblem | undefined;

  const [code, setCode] = useState(problem?.output ?? "");
  const [result, setResult] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  if (!problem) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center text-gray-500 ${bodyFont.className}`}
      >
        Problem not found ❌
      </div>
    );
  }

  const handleRun = async () => {
    setIsRunning(true);
    setResult("");
    try {
      const res = await fetch("/pages/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: "python", code }),
      });
      const data: RunResponse = await res.json();
      setResult(data.output || data.error || "No output");
    } catch {
      setResult("Error running code");
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => setCode(problem.output ?? "");

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row bg-[#0a0a0a] text-gray-100 ${bodyFont.className}`}
    >
    
      <div className="md:w-1/2 border-r border-gray-800 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">🐍 Python Problem #{problem.id}</h1>
        <p className="text-gray-300 mb-3 leading-relaxed">{problem.instruction}</p>

        {problem.input && (
          <div className="bg-black/50 border border-gray-800 p-3 rounded-md text-sm text-gray-400 mb-3">
            <span className="text-gray-500">Input:</span> {problem.input}
          </div>
        )}

        <p className="text-gray-400 text-sm">
          You can modify and run the given code to test your understanding.
        </p>
      </div>

      {/* Right Section: Code Editor */}
      <div className="md:w-1/2 flex flex-col p-6 gap-4">
        {/* Toolbar */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <button
            onClick={handleReset}
            className="px-4 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-sm"
          >
            Reset
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-5 py-1.5 rounded-md bg-white text-black font-semibold hover:bg-gray-200 text-sm"
          >
            {isRunning ? "Running..." : "Run ▶"}
          </button>
        </div>

    
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 w-full bg-black text-gray-200 border border-gray-700 rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
        />

        {/* Output */}
        <div className="bg-[#111] border border-gray-700 rounded-lg p-4 text-sm whitespace-pre-wrap">
          {result || "▶ Output will appear here"}
        </div>
      </div>
    </div>
  );
}
