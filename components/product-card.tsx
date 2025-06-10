import React from "react";
import { Button } from "@heroui/button";
import { ShoppingCartIcon } from "@/components/icons";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md dark:border-gray-800">
      <div className="aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">{product.price}</span>
          <Button
            isIconOnly
            color="secondary"
            variant="solid"
            radius="full"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <ShoppingCartIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};