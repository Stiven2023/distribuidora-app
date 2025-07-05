import { title } from "@/components/primitives";
import { DashboardStatistics } from "@/components/DashboardStatistics";
import { useUser } from "@/app/providers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@/types";

export default function SellerDashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== UserRole.SELLER) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  if (!user || user.role !== UserRole.SELLER) return null;

  // Simulación de estadísticas
  const stats = [
    { label: "Mis productos", value: 45 },
    { label: "Ventas este mes", value: 120 },
    { label: "Ingresos", value: "$3,200" },
    { label: "Valoración promedio", value: "4.7/5" },
  ];
  return (
    <section className="flex flex-col items-center justify-center w-full gap-4 py-8 md:py-10">
      <div className="justify-center inline-block max-w-lg text-center">
        <h1 className={title()}>Dashboard del Vendedor</h1>
        <p className="mt-4">
          Bienvenido a tu panel. Gestiona tus productos, revisa tus ventas y actualiza tu perfil.
        </p>
      </div>
      <DashboardStatistics stats={stats} />
    </section>
  );
}