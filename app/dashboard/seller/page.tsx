import { title } from "@/components/primitives";
import { DashboardStatistics } from "@/components/DashboardStatistics";

export default function SellerDashboardPage() {
  // Simulación de estadísticas
  const stats = [
    { label: "Mis productos", value: 45 },
    { label: "Ventas este mes", value: 120 },
    { label: "Ingresos", value: "$3,200" },
    { label: "Valoración promedio", value: "4.7/5" },
  ];
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Dashboard del Vendedor</h1>
        <p className="mt-4">
          Bienvenido a tu panel. Gestiona tus productos, revisa tus ventas y actualiza tu perfil.
        </p>
      </div>
      <DashboardStatistics stats={stats} />
    </section>
  );
}