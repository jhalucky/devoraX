import { headingFont, bodyFont } from "@/lib/fonts";

const lessons = [
  "Arrays",
  "Linked Lists",
  "Stacks",
  "Queues",
  "Trees",
  "Graphs",
  "Dynamic Programming",
];

export default function DsaPage() {
  return (
    <main className={`min-h-screen px-6 py-10 ${bodyFont.className} bg-[#f9fafb] text-gray-900`}>
      <h1 className={`text-4xl font-bold mb-6 ${headingFont.className}`}>Data Structures & Algorithms</h1>
      <p className="text-gray-600 mb-6">Master fundamental DSA concepts with practical examples.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-200 transition"
          >
            <span className="font-semibold text-lg">{lesson}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
