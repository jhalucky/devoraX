"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import problems from "@/data/leetcode_problems.json";
import { bodyFont } from "@/lib/fonts";

type Language = "python" | "cpp" | "js";

interface Problem {
  id: string;
  title: string;
  difficulty: string;
  topics: string[];
  description: string;
  starterCode: {
    python: string;
    cpp: string;
    js: string;
  };
}

type RunResponse = { output?: string; error?: string };

export default function DSACodeEditor() {
  const params = useParams();
  const problemId = typeof params?.subject === "string" ? params.subject : undefined;

  const problem = problems.find((p) => p.id === problemId) as Problem | undefined;

  const [language, setLanguage] = useState<Language>("python");
  const [code, setCode] = useState<string>(problem?.starterCode?.[language] ?? "");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);

  if (!problem) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center text-gray-600 ${bodyFont.className}`}
      >
        Problem not found ❌
      </div>
    );
  }

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });

      const data: RunResponse = await res.json();
      setOutput(data.output || data.error || "No output");
    } catch {
      setOutput("Error running code");
    } finally {
      setIsRunning(false);
    }
  };

  const handleClear = () => setCode(problem.starterCode[language] ?? "");

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row bg-[#0a0a0a] text-gray-100 ${bodyFont.className}`}
    >
      {/* 🧩 Left: Problem Section */}
      <div className="md:w-1/2 border-r border-gray-800 p-8 overflow-y-auto">
        <div className="bg-[#111] border border-gray-800 rounded-xl p-6 shadow-inner">
          <h1 className="text-3xl font-bold mb-2 text-white">{problem.title}</h1>
          <p className="text-gray-400 mb-4 text-sm">
            Difficulty:{" "}
            <span
              className={`font-medium ${
                problem.difficulty === "Easy"
                  ? "text-green-400"
                  : problem.difficulty === "Medium"
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {problem.difficulty}
            </span>
          </p>

          {/* Problem description with proper spacing */}
          <div
            className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{
              __html: problem.description.replace(/\n/g, "<br/><br/>"),
            }}
          />

          {/* Topics */}
          {problem.topics.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {problem.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-xs bg-gray-800/70 px-3 py-1 rounded-full text-gray-300 border border-gray-700"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 💻 Right: Code Editor Section */}
      <div className="md:w-1/2 flex flex-col p-6 gap-4">
        {/* Toolbar */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <div className="flex gap-3">
            {(["python", "cpp", "js"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setCode(problem.starterCode[lang]);
                }}
                className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
                  language === lang
                    ? "bg-white text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleClear}
              className="px-4 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-sm"
            >
              Clear
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-5 py-1.5 rounded-md bg-white text-black font-semibold hover:bg-gray-200 text-sm"
            >
              {isRunning ? "Running..." : "Run ▶"}
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 w-full bg-black text-gray-200 border border-gray-700 rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
        />

        {/* Output */}
        <div className="bg-[#111] border border-gray-700 rounded-lg p-4 text-sm whitespace-pre-wrap">
          {output || "▶ Output will appear here"}
        </div>
      </div>
    </div>
  );
}
