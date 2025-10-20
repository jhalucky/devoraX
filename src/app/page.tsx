"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] text-gray-100 font-inter text-center px-4">
      <h1 className="text-6xl sm:text-7xl font-bold mb-6">
        Engineers<span className="text-blue-500">Hub</span>
      </h1>

      <p className="text-gray-400 text-lg max-w-lg mb-10">
        Learn <strong>DSA</strong>, <strong>Machine Learning</strong>, and <strong>Core Engineering</strong> subjects — all in one place.
      </p>

      <button
        onClick={() => router.push("/sign-in")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition"
      >
        Get Started
      </button>
    </main>
  );
}
