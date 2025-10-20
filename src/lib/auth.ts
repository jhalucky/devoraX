import { getAuth } from "@clerk/nextjs/server";
import { users } from "@clerk/nextjs/dist/server"; // import users explicitly
// OR
// import { clerkClient } from "@clerk/nextjs/server"; // works in newer versions

export async function getUserRole(req: any) {
  const { userId } = getAuth(req);
  if (!userId) return null;

  // Using explicit users import
  const user = await users.getUser(userId); 

  // OR if clerkClient works
  // const user = await clerkClient.users.getUser(userId);

  return user.publicMetadata.role || "student";
}
