import Link from "next/link";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* Logo / Brand */}
      <Link href="/" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Learnly
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link
          href="/courses"
          className="text-gray-700 dark:text-gray-200 hover:text-indigo-500 transition"
        >
          Courses
        </Link>
        {isSignedIn && (
          <Link
            href="/dashboard"
            className="text-gray-700 dark:text-gray-200 hover:text-indigo-500 transition"
          >
            Dashboard
          </Link>
        )}

        {/* Auth Buttons */}
        {isSignedIn ? (
          <div className="flex items-center space-x-3">
            <span className="hidden sm:block text-gray-500 dark:text-gray-400 text-sm">
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
    </nav>
  );
}
