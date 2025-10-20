import { getAuth } from "@clerk/nextjs/server";
import { users } from "@clerk/clerk-sdk-node"; // correct public server API
import type { NextApiRequest } from "next";

interface UserPublicMetadata {
  role?: string;
}

export async function getUserRole(req: NextApiRequest): Promise<string | null> {
  const { userId } = getAuth(req);
  if (!userId) return null;

  let user;
  try {
    user = await users.getUser(userId); // now users is correctly imported
  } catch (err) {
    console.error("Error fetching user from Clerk:", err);
    return null;
  }

  const metadata = user.publicMetadata as UserPublicMetadata | undefined;
  return metadata?.role || "student";
}
