import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1️⃣ Verify authentication
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    // 2️⃣ Get user from Clerk
    const clerkUser = await clerkClient.users.getUser(userId);

    // 3️⃣ Sync user with your Prisma DB
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
        image: clerkUser.imageUrl,
      },
      create: {
        id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
        image: clerkUser.imageUrl,
        role: "student", // default role
      },
    });

    // 4️⃣ Return combined user info
    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
