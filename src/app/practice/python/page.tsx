"use client";

import React from "react";
import pythonProblems from "@/data/python_questions.json"; // <-- ensure file exists: src/data/python-questions.json
import { headingFont, bodyFont } from "@/lib/fonts";
import Link from "next/link";

type PythonProblem = {
  id: number | string;
  instruction: string;
  input?: string;
  output?: string;
};

export default function PythonPracticePage() {
  const problems: PythonProblem[] = (pythonProblems as unknown) as PythonProblem[];

  return (
    <main className={`min-h-screen bg-black text-white px-6 py-12 ${bodyFont.className}`}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className={`text-4xl font-semibold mb-2 ${headingFont.className}`}>🐍 Learn Python</h1>
          <p className="text-gray-400 mt-2">Practice problems and solutions — run them in the editor (coming next).</p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <article
              key={p.id}
              className="group bg-[#0b0b0b] rounded-2xl p-5 shadow-sm border border-gray-800 hover:shadow-md transition"
            >
                
              <div className="flex items-start justify-between">
                <div className="pr-3">
                  <h3 className={`text-lg font-semibold mb-1 ${headingFont.className}`}>{p.instruction}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {p.input ? `Example input: ${String(p.input).slice(0, 80)}${String(p.input).length > 80 ? "…" : ""}` : "No input example"}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-300 mt-2 line-clamp-4 whitespace-pre-wrap">
                {p.output ? (String(p.output).length > 210 ? `${String(p.output).slice(0, 210)}...` : p.output) : "No solution provided."}
              </p>

              <div className="mt-5 flex items-center justify-between">
                {/* If you later create individual problem pages, change href */}
                <Link
                  href={`/practice/python/${p.id}`}
                  className="text-indigo-400 font-medium hover:underline"
                >
                  Solve
                </Link>

                <span className="text-xs text-gray-500">
                  ID: {p.id}
                </span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
