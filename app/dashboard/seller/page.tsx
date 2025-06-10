import { title } from "@/components/primitives";

export default function SellerDashboardPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Dashboard del Vendedor</h1>
        <p className="mt-4">
          Bienvenido a tu panel. Gestiona tus productos, revisa tus ventas y actualiza tu perfil.
        </p>
      </div>
    </section>
  );
}