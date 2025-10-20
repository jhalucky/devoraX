import { prisma } from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  try {
    if (req.method === "GET") {
      const lessons = await prisma.lesson.findMany({
        include: { course: true },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(lessons);
    }

    if (req.method === "POST") {
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const { title, content, courseId } = req.body;
      if (!title || !content || !courseId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const lesson = await prisma.lesson.create({
        data: { title, content, courseId },
      });
      return res.status(201).json(lesson);
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Error in /api/lessons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
