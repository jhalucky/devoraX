"use client";

import Link from "next/link";
import { headingFont, bodyFont } from "@/lib/fonts";
import problems from "@/data/leetcode_problems.json";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function DSADashboard() {
  return (
    <main className={`min-h-screen bg-[#f9fafb] text-gray-900 px-6 py-12 ${bodyFont.className}`}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className={`text-4xl font-semibold ${headingFont.className}`}>DSA Practice</h1>
          <p className="text-gray-600 mt-2">Solve curated leetcode-style problems with an in-browser IDE.</p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p: any) => (
            <article
              key={p.id}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-lg font-semibold mb-1 ${headingFont.className}`}>{p.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {p.topics?.slice(0, 3).join(", ") || "General"}
                  </p>
                </div>

                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    p.difficulty === "Easy"
                      ? "bg-green-100 text-green-700"
                      : p.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.difficulty || "Unknown"}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-3 line-clamp-3 whitespace-pre-wrap">{p.description?.slice(0, 220) || "No description available."}...</p>

              <div className="mt-6 flex items-center justify-between">
                <Link
                  href={`/practice/dsa/${p.id}`}
                  className="text-indigo-600 font-medium flex items-center gap-2"
                >
                  Solve <ArrowRightIcon className="w-4 h-4" />
                </Link>

                <div className="text-xs text-gray-400">
                  {p.examples?.length ? `${p.examples.length} example(s)` : "—"}
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
