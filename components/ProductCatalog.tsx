import { ProductCard } from "@/components/product-card";
import { Pagination } from "@heroui/pagination";

import type { Product } from "@/lib/data";

interface ProductCatalogProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductCatalog({
  products,
  currentPage,
  totalPages,
  onPageChange,
}: ProductCatalogProps) {
  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center">
          <p className="text-lg text-default-500">
            No se encontraron productos con esos criterios.
          </p>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            isCompact
            showControls
            color="secondary"
            total={totalPages}
            initialPage={1}
            page={currentPage}
            onChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
