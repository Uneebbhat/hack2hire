import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import type { Payload } from "@/helper/generateToken";

export default async function getOptionalSession(): Promise<Payload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as Payload;
  } catch {
    return null;
  }
}
