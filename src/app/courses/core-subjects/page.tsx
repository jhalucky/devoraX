"use client";

import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { headingFont, bodyFont } from "@/lib/fonts";
import Link from "next/link";

const coreSubjects = [
  "Mathematics",
  "Physics",
  "OOPs",
  "DBMS",
  "Software Engineering",
  "Operating System",
  "Web Technology",
  "DAA",
  "Computer Network",
];

export default function CoreSubjectsPage() {
  return (
    <main className={`min-h-screen bg-[#f9fafb] text-gray-900 ${bodyFont.className}`}>
      <Navbar />

      {/* Heading */}
      <section className="text-center py-10">
        <h1 className={`text-4xl sm:text-5xl font-bold mb-2 ${headingFont.className}`}>
          Core Subjects
        </h1>
        <p className="text-gray-600 text-lg">
          Explore all core engineering subjects and start learning.
        </p>
      </section>

      {/* Subjects Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto pb-16">
        {coreSubjects.map((subject) => (
          <motion.div
            key={subject}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="bg-white border border-gray-200 hover:border-indigo-400 rounded-2xl shadow-md transition-all cursor-pointer">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h2 className={`text-xl font-semibold mb-3 ${headingFont.className}`}>
                    {subject}
                  </h2>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-indigo-500 h-3 rounded-full transition-all"
                      style={{ width: `0%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">0% completed</p>
                </div>

                {/* Arrow Link */}
                <Link
                  href={`/courses/core-subjects/${subject.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center justify-end text-indigo-500 font-semibold mt-4 hover:underline"
                >
                  Explore <ArrowRightIcon className="w-5 h-5 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
