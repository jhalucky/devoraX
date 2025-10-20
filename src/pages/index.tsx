import Layout from "../components/Layout";
import CourseCard from "../components/CourseCard";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  lessons: { id: string }[];
}

/**
 * Home page: Lists all available courses
 */
export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Layout>
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Welcome to Learnly</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your AI-powered learning platform. Start learning today 🚀
        </p>
      </section>

      {loading ? (
        <Loader />
      ) : courses.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              lessonCount={course.lessons.length}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">No courses available yet.</p>
      )}
    </Layout>
  );
}
