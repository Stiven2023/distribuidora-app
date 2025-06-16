import { title } from "@/components/primitives";
import { DashboardStatistics } from "@/components/DashboardStatistics";

export default function SuperAdminDashboardPage() {
  // Simulación de estadísticas
  const stats = [
    { label: "Administradores", value: 5 },
    { label: "Usuarios totales", value: 1200 },
    { label: "Ventas globales", value: "$120,000" },
    { label: "Errores críticos", value: 0 },
  ];
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Dashboard del Superadministrador</h1>
        <p className="mt-4">
          Panel de superadministración. Acceso a configuraciones críticas del sistema y gestión de administradores.
        </p>
      </div>
      <DashboardStatistics stats={stats} />
    </section>
  );
}