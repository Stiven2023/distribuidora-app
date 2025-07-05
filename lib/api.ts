export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

import type { User } from "@/types";

export async function fetchUser(): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/api/me`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("No autenticado");
  return res.json();
} 