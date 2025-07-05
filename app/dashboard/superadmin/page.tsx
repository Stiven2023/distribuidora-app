import { title } from "@/components/primitives";
import { DashboardStatistics } from "@/components/DashboardStatistics";
import { useUser } from "@/app/providers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@/types";

export default function SuperAdminDashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== UserRole.SUPERADMIN) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  if (!user || user.role !== UserRole.SUPERADMIN) return null;

  // Simulación de estadísticas
  const stats = [
    { label: "Administradores", value: 5 },
    { label: "Usuarios totales", value: 1200 },
    { label: "Ventas globales", value: "$120,000" },
    { label: "Errores críticos", value: 0 },
  ];
  return (
    <section className="flex flex-col items-center justify-center w-full gap-4 py-8 md:py-10">
      <div className="justify-center inline-block max-w-lg text-center">
        <h1 className={title()}>Dashboard del Superadministrador</h1>
        <p className="mt-4">
          Panel de superadministración. Acceso a configuraciones críticas del sistema y gestión de administradores.
        </p>
      </div>
      <DashboardStatistics stats={stats} />
    </section>
  );
}