"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import MonacoEditor from "@monaco-editor/react";
import problems from "@/data/leetcode_problems.json";
import { headingFont, bodyFont } from "@/lib/fonts";
import { XMarkIcon, PlayCircleIcon } from "@heroicons/react/24/outline";

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  starterCode: {
    python: string;
    cpp: string;
    javascript: string;
  };
  examples?: { input: string; output: string }[];
};

const languageOptions = ["python", "cpp", "javascript"] as const;
type Language = typeof languageOptions[number];

type RunResponse = { output?: string; error?: string };

export default function DSACodeEditor() {
  const params = useParams();
  const problemId = params?.subject as string | undefined;
  const problem: Problem | undefined = problems.find((p) => p.id === problemId);

  const [language, setLanguage] = useState<Language>("python");
  const [code, setCode] = useState<string>(problem?.starterCode?.python ?? "");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [video, setVideo] = useState<{ title: string; videoId: string } | null>(null);
  const [loadingVideo, setLoadingVideo] = useState<boolean>(false);

  if (!problem) {
    return (
      <div className={`min-h-screen flex items-center justify-center text-gray-600 ${bodyFont.className}`}>
        Problem not found ❌
      </div>
    );
  }

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          source_code: code,
          stdin: problem.examples?.[0]?.input ?? "",
        }),
      });
      const data: RunResponse = await res.json();
      setOutput(data.output ?? data.error ?? "⚠️ No output received");
    } catch (err: unknown) {
      setOutput(err instanceof Error ? err.message : "Error running code");
    } finally {
      setIsRunning(false);
    }
  };

  const clearEditor = () => {
    setCode("");
    setOutput("");
  };

  const handleVideoClick = async (title: string) => {
    try {
      setLoadingVideo(true);
      const res = await fetch(`/api/youtube-search?query=${encodeURIComponent(title + " neetcode")}`);
      const data: { videoId?: string; title?: string } = await res.json();
      if (data.videoId) setVideo({ title: data.title ?? title, videoId: data.videoId });
      else alert("No NeetCode video found for this problem.");
    } catch {
      alert("Error fetching video");
    } finally {
      setLoadingVideo(false);
    }
  };

  return (
    <main className={`min-h-screen bg-[#f9fafb] text-gray-900 px-6 py-10 ${bodyFont.className}`}>
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Problem Description */}
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className={`text-3xl font-semibold mb-3 tracking-tight ${headingFont.className}`}>
              {problem.title}
              <span className="text-sm font-normal text-gray-500 ml-2">({problem.difficulty})</span>
            </h1>
          </div>

          <pre className="text-gray-700 whitespace-pre-wrap leading-relaxed text-[15px]">
            {problem.description}
          </pre>

          {problem.examples && (
            <div className="mt-4">
              <h2 className="font-semibold text-gray-800 mb-2">Examples:</h2>
              {problem.examples.map((ex, i) => (
                <div key={i} className="mb-3 p-3 bg-gray-50 border rounded-md text-sm">
                  <p><strong>Input:</strong> {ex.input}</p>
                  <p><strong>Output:</strong> {ex.output}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-200">
          {/* Toolbar */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <label className="font-medium text-gray-700">Language:</label>
              <select
                value={language}
                onChange={(e) => {
                  const lang = e.target.value as Language;
                  setLanguage(lang);
                  setCode(problem.starterCode[lang]);
                }}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearEditor}
                className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition"
              >
                Clear
              </button>

              <button
                onClick={runCode}
                disabled={isRunning}
                className={`text-sm px-4 py-1.5 rounded-md text-white transition ${
                  isRunning ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isRunning ? "Running..." : "Run ▶"}
              </button>
            </div>

            <button
              onClick={() => handleVideoClick(problem.title)}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition"
              title="Watch Video Solution"
              disabled={loadingVideo}
            >
              <PlayCircleIcon className="w-6 h-6" />
              <span className="hidden sm:inline text-sm font-medium">
                {loadingVideo ? "Loading..." : "Video Solution"}
              </span>
            </button>
          </div>

          {/* Monaco Editor */}
          <MonacoEditor
            height="500px"
            language={language}
            theme="vs-light"
            value={code}
            onChange={(value) => setCode(value ?? "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: `"${bodyFont.style.fontFamily}", monospace`,
              automaticLayout: true,
            }}
          />

          {/* Output */}
          {output && (
            <div className="mt-3 mx-3 mb-3 p-3 bg-gray-50 rounded-md border text-gray-800 text-sm whitespace-pre-wrap">
              <strong>Output:</strong>
              <pre>{output}</pre>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {video && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl relative">
            <button
              onClick={() => setVideo(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black transition"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full rounded-t-2xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{video.title}</h2>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
