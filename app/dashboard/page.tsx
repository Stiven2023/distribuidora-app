"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/providers";
import { UserRole } from "@/types";

export default function DashboardRedirect() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    switch (user.role) {
      case UserRole.SUPERADMIN:
        router.replace("/dashboard/superadmin");
        break;
      case UserRole.ADMIN:
        router.replace("/dashboard/admin");
        break;
      case UserRole.SELLER:
        router.replace("/dashboard/seller");
        break;
      case UserRole.CLIENT:
        router.replace("/dashboard/client");
        break;
      default:
        router.replace("/");
    }
  }, [user, router]);

  return null;
} 