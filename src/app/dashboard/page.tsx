"use client";

import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { headingFont, bodyFont } from "@/lib/fonts";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const dashboardCards = [
  { title: "DSA Mastery", route: "/practice/dsa", progress: 0 },
  { title: "Python Practice", route: "/practice/python", progress: 0 },
  { title: "C++ Practice", route: "/practice/cpp", progress: 0 },
  { title: "JavaScript Practice", route: "/practice/javascript", progress: 0 },
];

export default function Dashboard() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div className="text-center mt-20">Loading...</div>;

  return (
    <main className={`min-h-screen bg-[#f9fafb] text-gray-900 ${bodyFont.className}`}>
      <Navbar />

      {/* Greeting */}
      <section className="text-center py-10">
        <h1 className={`text-4xl sm:text-5xl font-bold mb-2 ${headingFont.className}`}>
          Hi{user?.firstName ? `, ${user.firstName} 👋` : " there 👋"}
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome back! Continue coding and mastering your skills 🚀
        </p>
      </section>

      {/* Practice Sections */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 px-6 max-w-5xl mx-auto pb-16">
        {dashboardCards.map((card) => (
          <motion.div
            key={card.title}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="bg-white border border-gray-200 hover:border-indigo-400 rounded-2xl shadow-md transition-all cursor-pointer">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h2 className={`text-2xl font-semibold mb-3 ${headingFont.className}`}>
                    {card.title}
                  </h2>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-indigo-500 h-3 rounded-full transition-all"
                      style={{ width: `${card.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500">{card.progress}% completed</p>
                </div>

                {/* Arrow Link */}
                <a
                  href={card.route}
                  className="flex items-center justify-end text-indigo-500 font-semibold mt-4 hover:underline"
                >
                  Practice Now <ArrowRightIcon className="w-5 h-5 ml-1" />
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </main>
  );
}

