import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

/**
 * Dashboard: Personalized view for signed-in users
 */
export default function DashboardPage() {
  const { user } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me");
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Error loading user info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <Layout>
      <SignedIn>
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <p className="text-lg">
              Welcome back,{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {user?.firstName || userData?.name || "Learner"}
              </span>
              👋
            </p>

            <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Email:</strong> {userData?.email || "—"}
              </p>
              <p>
                <strong>Role:</strong> {userData?.role || "student"}
              </p>
              <p>
                <strong>User ID:</strong> {userData?.id || "—"}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
              <p className="text-gray-500">Progress tracking coming soon 🚧</p>
            </div>
          </div>
        )}
      </SignedIn>

      <SignedOut>
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-3">Please sign in to view your dashboard</h2>
          <SignInButton mode="modal">
            <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium">
              Sign in
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </Layout>
  );
}
