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

export default function PythonEditor() {
  const params = useParams();
  const problemId =
    typeof params?.subject === "string" ? params.subject : undefined;

  const problem = problems.find((p: Problem) => p.id === problemId);

  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);

  // ✅ Load Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
      script.onload = async () => {
        const py = await (window as any).loadPyodide();
        setPyodide(py);
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
      // Combine user code and problem input/output into one script
      const fullCode = `
import json
import sys
from io import StringIO

# Capture print output
buffer = StringIO()
sys.stdout = buffer

# User's code
${code}

# Auto test
try:
    result = None
    if "square_nums" in globals():
        result = square_nums(${problem.input || "[]"})

    print("Result:", result)
    expected = ${problem.output || "None"}
    if result == expected:
        print("✅ Correct!")
    else:
        print("❌ Incorrect! Expected:", expected)

except Exception as e:
    print("Error:", str(e))

sys.stdout = sys.__stdout__
buffer.getvalue()
`;

      const result = await pyodide.runPythonAsync(fullCode);
      setOutput(result || "No output");
    } catch (err: any) {
      setOutput("Error: " + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row bg-black text-gray-100 ${bodyFont.className}`}
    >
      {/* Left: Problem */}
      <div className="md:w-1/2 border-r border-gray-800 p-8 overflow-y-auto">
        <h1
          className={`text-2xl font-bold mb-4 leading-relaxed ${headingFont.className}`}
        >
          {problem.instruction}
        </h1>

        {problem.input && (
          <pre className="bg-gray-900 p-3 rounded mb-3 text-sm whitespace-pre-wrap">
            {`Input: ${problem.input}`}
          </pre>
        )}
        {problem.output && (
          <pre className="bg-gray-900 p-3 rounded mb-3 text-sm whitespace-pre-wrap">
            {`Expected Output: ${problem.output}`}
          </pre>
        )}
      </div>

      {/* Right: Editor */}
      <div className="md:w-1/2 flex flex-col p-6 gap-4">
        <div className="flex justify-end gap-3 border-b border-gray-700 pb-3">
          <button
            onClick={() => setCode("")}
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
