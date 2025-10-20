import { prisma } from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { userId } = getAuth(req);

  if (typeof id !== "string") return res.status(400).json({ error: "Invalid ID" });

  try {
    if (req.method === "GET") {
      const lesson = await prisma.lesson.findUnique({
        where: { id },
        include: { course: true },
      });
      if (!lesson) return res.status(404).json({ error: "Lesson not found" });
      return res.status(200).json(lesson);
    }

    if (req.method === "PUT") {
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      const { title, content } = req.body;
      const updated = await prisma.lesson.update({
        where: { id },
        data: { title, content },
      });
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      await prisma.lesson.delete({ where: { id } });
      return res.status(204).end();
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Error in /api/lessons/[id]:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
