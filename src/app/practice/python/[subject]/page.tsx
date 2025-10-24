"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { bodyFont, headingFont } from "@/lib/fonts";
import problems from "@/data/python_questions.json";

type Problem = {
  id: string;
  instruction: string;
  input?: string;
  output?: string;
};

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
}

declare global {
  interface Window {
    loadPyodide?: () => Promise<PyodideInterface>;
  }
}

export default function PythonEditor() {
  const params = useParams();
  const problemId =
    typeof params?.subject === "string" ? params.subject : undefined;

  const problem = (problems as Problem[]).find(
    (p: Problem) => p.id === problemId
  );

  const [code, setCode] = useState<string>(problem?.output || "");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);

  useEffect(() => {
    const loadPyodide = async () => {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
      script.onload = async () => {
        if (window.loadPyodide) {
          const py = await window.loadPyodide();
          setPyodide(py);
        }
      };
      document.body.appendChild(script);
    };
    loadPyodide();
  }, []);

  if (!problem) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center text-gray-400 ${bodyFont.className}`}
      >
        Problem not found ❌
      </div>
    );
  }

  const handleRun = async () => {
    if (!pyodide) return;
    setIsRunning(true);
    setOutput("");
    try {
      const result = await pyodide.runPythonAsync(code);
      setOutput(String(result ?? ""));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setOutput("Error: " + err.message);
      } else {
        setOutput("Unknown error occurred");
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleClear = () => setCode(problem.output || "");

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row bg-black text-gray-100 ${bodyFont.className}`}
    >
      {/* Left: Problem */}
      <div className="md:w-1/2 border-r border-gray-800 p-8 overflow-y-auto">
        <h1
          className={`text-3xl font-bold mb-4 ${headingFont.className}`}
        >
          {problem.instruction}
        </h1>
        {problem.input && (
          <pre className="bg-gray-900 p-3 rounded mb-3 text-sm">{`Input: ${problem.input}`}</pre>
        )}
        {problem.output && (
          <pre className="bg-gray-900 p-3 rounded mb-3 text-sm">{`Expected Output: ${problem.output}`}</pre>
        )}
      </div>

      {/* Right: Editor */}
      <div className="md:w-1/2 flex flex-col p-6 gap-4">
        <div className="flex justify-end gap-3 border-b border-gray-700 pb-3">
          <button
            onClick={handleClear}
            className="px-4 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-sm"
          >
            Clear
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning || !pyodide}
            className="px-5 py-1.5 rounded-md bg-white text-black font-semibold hover:bg-gray-200 text-sm"
          >
            {isRunning ? "Running..." : "Run ▶"}
          </button>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 w-full bg-gray-900 text-gray-200 border border-gray-700 rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Write your Python code here..."
        />

        <div className="bg-[#111] border border-gray-700 rounded-lg p-4 text-sm whitespace-pre-wrap">
          {output || "▶ Output will appear here"}
        </div>
      </div>
    </div>
  );
}
