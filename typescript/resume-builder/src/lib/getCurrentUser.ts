import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = verifyToken(token);

  return decoded;
}