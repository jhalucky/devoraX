"use client";

import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div className="text-center mt-20">Loading...</div>;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-gray-100 flex flex-col items-center justify-center font-inter">
      <h1 className="text-5xl font-bold mb-4">
        Hi{user?.firstName ? `, ${user.firstName} 👋` : " there 👋"}
      </h1>
      <p className="text-gray-400 text-lg">
        Welcome back to <span className="text-blue-500 font-semibold">EngineersHub</span>.
      </p>
    </main>
  );
}
