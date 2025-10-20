import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest } from "next";

export async function getUserRole(req: NextApiRequest): Promise<string | null> {
  const { userId } = getAuth(req);
  if (!userId) return null;

  const user = await users.getUser(userId); 

  return user.publicMetadata.role || "student";
}
