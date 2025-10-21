import { getAuth, clerkClient } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Get Clerk client instance
    const client = await clerkClient();

    // Fetch the user from Clerk
    const clerkUser = await client.users.getUser(userId);

    // Sync with Prisma
    const user = await prisma.user.upsert({
      where: { email: clerkUser.emailAddresses[0].emailAddress },
      update: { name: clerkUser.firstName || clerkUser.fullName },
      create: {
        id: userId,
        name: clerkUser.firstName || clerkUser.fullName || "No Name",
        email: clerkUser.emailAddresses[0].emailAddress,
        role: "STUDENT", // default role
        passwordHash: "", // blank if auth handled by Clerk
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
