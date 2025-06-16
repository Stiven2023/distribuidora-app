import { title } from "@/components/primitives";
import { DashboardStatistics } from "@/components/DashboardStatistics";

export default function AdminDashboardPage() {
  // Simulación de estadísticas
  const stats = [
    { label: "Usuarios", value: 120 },
    { label: "Productos", value: 340 },
    { label: "Categorías", value: 12 },
    { label: "Ventas totales", value: "$15,200" },
  ];
  return (
    <section className="flex flex-col items-center justify-center w-full gap-4 py-8 md:py-10">
      <div className="justify-center inline-block max-w-lg text-center">
        <h1 className={title()}>Dashboard del Administrador</h1>
        <p className="mt-4">
          Panel de administración. Gestiona usuarios, productos, categorías y revisa las estadísticas generales.
        </p>
      </div>
      <DashboardStatistics stats={stats} />
    </section>
  );
}