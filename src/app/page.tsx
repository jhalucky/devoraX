"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      {/* Brand */}
      <h1
        className="text-6xl md:text-7xl font-extrabold mb-6 text-white text-center"
        style={{ fontFamily: "'Share Tech Mono', monospace" }} // Rare font
      >
        De<span className="text-blue-500">V</span>ora<span className="text-blue-500">X</span>
      </h1>

      {/* Tagline */}
      <p
        className="text-gray-300 text-xl md:text-2xl mb-10 text-center"
        style={{ fontFamily: "'Share Tech Mono', monospace" }}
      >
        Kitni bhi karle <span className="text-blue-500">mazdoori</span>, <strong><span className="text-blue-500">DSA</span> hai jaroori</strong>.
      </p>

      {/* Get Started button */}
      <button
        onClick={() => router.push("/sign-in")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition"
      >
        Get Started
      </button>

      {/* Import rare font */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');`}
      </style>
    </main>
  );
}
