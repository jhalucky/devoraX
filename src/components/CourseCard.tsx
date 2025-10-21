import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { headingFont, bodyFont } from "@/lib/fonts";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
}

export default function CourseCard({ id, title, description, progress }: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`}>
      <Card className="hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer">
        <CardHeader>
          <CardTitle className={headingFont.className}>{title}</CardTitle>
        </CardHeader>
        <CardContent className={bodyFont.className}>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs mt-2 text-gray-500">{progress}% completed</p>
        </CardContent>
      </Card>
    </Link>
  );
}

