import Link from "next/link";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  lessonCount?: number;
}

export default function CourseCard({ id, title, description, lessonCount }: CourseCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
        {lessonCount !== undefined && (
          <p className="text-xs text-gray-500 mb-3">{lessonCount} lessons</p>
        )}
        <Link
          href={`/courses/${id}`}
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md font-medium"
        >
          View Course
        </Link>
      </div>
    </div>
  );
}
