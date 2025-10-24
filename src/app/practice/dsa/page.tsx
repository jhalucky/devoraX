"use client";

import { useState } from "react";
import Link from "next/link";
import { headingFont, bodyFont } from "@/lib/fonts";
import problems from "@/data/leetcode_problems.json";
import { ArrowRightIcon, PlayCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

type Problem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | string;
  description?: string;
  topics?: string[];
};

export default function DSADashboard() {
  const [video, setVideo] = useState<{ title: string; videoId: string } | null>(null);
  const [loadingVideo, setLoadingVideo] = useState(false);

  const handleVideoClick = async (title: string) => {
    try {
      setLoadingVideo(true);
      const res = await fetch(`/api/youtube-search?query=${encodeURIComponent(title)}`);
      const data: { videoId?: string; title?: string } = await res.json();
      if (data.videoId) setVideo({ title: data.title ?? title, videoId: data.videoId });
      else alert("No video found for this problem.");
    } catch {
      alert("Error fetching video");
    } finally {
      setLoadingVideo(false);
    }
  };

  return (
    <main className={`min-h-screen bg-black text-gray-100 px-6 py-12 ${bodyFont.className}`}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className={`text-4xl font-semibold ${headingFont.className}`}>DSA Practice</h1>
          <p className="text-gray-600 mt-2">
            Solve curated LeetCode-style problems with an in-browser IDE — and watch NeetCode explanations instantly!
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p: Problem) => (
            <article
              key={p.id}
              className="group bg-gray-700 rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:scale-[1.02] transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-lg font-semibold mb-1 ${headingFont.className}`}>{p.title}</h3>
                  <p className="text-sm text-white mb-2">{p.topics?.slice(0, 3).join(", ") ?? "General"}</p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    p.difficulty === "Easy"
                      ? "bg-green-100 text-green-700"
                      : p.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.difficulty ?? "Unknown"}
                </span>
              </div>

              <p className="text-sm text-white mt-2 line-clamp-3">{p.description?.slice(0, 150) ?? "No description available."}...</p>

              <div className="mt-5 flex items-center justify-between">
                <Link
                  href={`/practice/dsa/${p.id}`}
                  className="text-indigo-600 font-medium flex items-center gap-2 hover:underline"
                >
                  Solve <ArrowRightIcon className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => handleVideoClick(p.title)}
                  className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition"
                  title="Watch Video Solution"
                  disabled={loadingVideo}
                >
                  <PlayCircleIcon className="w-6 h-6" />
                  <span className="text-sm">{loadingVideo ? "..." : "Video"}</span>
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>

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
              <p className="text-gray-500 text-sm mt-1">Powered by NeetCode YouTube</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
