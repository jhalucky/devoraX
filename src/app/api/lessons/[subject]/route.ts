// app/api/lessons/[subject]/route.ts
import { NextRequest } from "next/server";

const lessons: Record<string, string[]> = {
  "core-subjects": [
    "Mathematics",
    "Physics",
    "OOPs",
    "DBMS",
    "Software Engineering",
    "Operating System",
    "Web Technology",
    "DAA",
    "Computer Networks",
  ],
  "dsa": [
    "Arrays",
    "Linked List",
    "Stack",
    "Queue",
    "Trees",
    "Graphs",
    "Hashing",
    "Sorting Algorithms",
  ],
  "machine-learning": [
    "Linear Regression",
    "Logistic Regression",
    "Decision Trees",
    "Neural Networks",
    "Clustering",
    "Dimensionality Reduction",
  ],
  python: ["Variables", "Loops", "Functions", "OOPs", "Modules", "File Handling"],
  cpp: ["Syntax", "Pointers", "OOPs", "STL", "Memory Management"],
  javascript: ["ES6 Syntax", "DOM Manipulation", "Async JS", "Events", "APIs"],
};

export async function GET(req: NextRequest, { params }: { params: { subject: string } }) {
  const subject = params.subject.toLowerCase();
  const subjectLessons = lessons[subject] || [];
  return new Response(JSON.stringify(subjectLessons), {
    headers: { "Content-Type": "application/json" },
  });
}
