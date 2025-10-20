import { prisma } from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify"; // npm install slugify

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  try {
    if (req.method === "GET") {
      const courses = await prisma.course.findMany({
        include: { lessons: true },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(courses);
    }

    if (req.method === "POST") {
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const { title, description } = req.body as { title: string; description: string };
      if (!title || !description)
        return res.status(400).json({ error: "Missing required fields" });

      // ✅ Generate a URL-safe slug from the course title
      const slug = slugify(title, { lower: true, strict: true });

      const course = await prisma.course.create({
        data: {
          title,
          description,
          slug, // include the slug here
        },
      });

      return res.status(201).json(course);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error in /api/courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
