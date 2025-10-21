import { headingFont, bodyFont } from "@/lib/fonts";

const lessons = [
  "Regression",
  "Classification",
  "Clustering",
  "Neural Networks",
  "Decision Trees",
  "Model Evaluation",
];

export default function MachineLearningPage() {
  return (
    <main className={`min-h-screen px-6 py-10 ${bodyFont.className} bg-[#f9fafb] text-gray-900`}>
      <h1 className={`text-4xl font-bold mb-6 ${headingFont.className}`}>Machine Learning</h1>
      <p className="text-gray-600 mb-6">Learn ML fundamentals with practical projects and exercises.</p>

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
