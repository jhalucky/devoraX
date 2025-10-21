import { headingFont, bodyFont } from "@/lib/fonts";

interface SubjectPageProps {
  params: {
    subject: string;
  };
}

export default function SubjectPage({ params }: SubjectPageProps) {
  const { subject } = params;

  return (
    <main className={`min-h-screen px-6 py-10 ${bodyFont.className} bg-[#f9fafb] text-gray-900`}>
      <h1 className={`text-4xl font-bold mb-4 ${headingFont.className}`}>
        {subject.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </h1>
      <p className="text-gray-600 text-lg">
        Here you can find all the resources and lessons for {subject.replace(/-/g, " ")}.
      </p>
    </main>
  );
}
