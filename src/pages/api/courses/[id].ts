import { prisma } from "../../../lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { userId } = getAuth(req);

  if (typeof id !== "string") return res.status(400).json({ error: "Invalid ID" });

  try {
    if (req.method === "GET") {
      const course = await prisma.course.findUnique({
        where: { id },
        include: { lessons: true },
      });
      if (!course) return res.status(404).json({ error: "Course not found" });
      return res.status(200).json(course);
    }

    if (req.method === "PUT") {
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const { title, description } = req.body as { title: string; description: string };
      const updated = await prisma.course.update({
        where: { id },
        data: { title, description },
      });
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      await prisma.course.delete({ where: { id } });
      return res.status(204).end();
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error in /api/courses/[id]:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
