import { title } from "@/components/primitives";

export default function AdminDashboardPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Dashboard del Administrador</h1>
        <p className="mt-4">
          Panel de administración. Gestiona usuarios, productos, categorías y revisa las estadísticas generales.
        </p>
      </div>
    </section>
  );
}