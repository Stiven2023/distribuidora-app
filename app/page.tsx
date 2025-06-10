// import { Link } from "@heroui/link";
// import { Snippet } from "@heroui/snippet";
// import { Code } from "@heroui/code";
// import { button as buttonStyles } from "@heroui/theme";

import { title } from "@/components/primitives";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-8 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Nuestros Productos</h1>
        <h2 className={title({ color: "violet", size: "sm", class: "mt-2" })}>
          Calidad y estilo para tu día a día
        </h2>
      </div>

      <div className="w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
