"use client";

import Link from "next/link";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { headingFont, bodyFont } from "@/lib/fonts";

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className={`flex items-center justify-between px-6 py-4 shadow-sm bg-white border-b border-gray-200 ${bodyFont.className}`}>
      <Link href="/" className={`text-2xl font-bold text-gray-900`}
       style={{ fontFamily: "'Share Tech Mono', monospace" }}
      >
        De<span className="text-blue-500">V</span>ora<span className="text-blue-500">X</span>
      </Link>

      <div className="flex items-center space-x-6">
        <Link href="/courses" className="text-gray-700 hover:text-indigo-500 transition">
          Courses
        </Link>

        {isSignedIn && (
          <Link href="/dashboard" className="text-gray-700 hover:text-indigo-500 transition">
            Dashboard
          </Link>
        )}

        {isSignedIn ? (
          <div className="flex items-center space-x-3">
            <span className="text-gray-500 text-sm hidden sm:block">
              Hi, {user?.firstName || "Learner"}
            </span>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium">
              Sign in
            </button>
          </SignInButton>
        )}
      </div>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');`}
      </style>
    </nav>
  );
}

