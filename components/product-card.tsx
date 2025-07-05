'use client';

import React from "react";
import { Button } from "@heroui/button";
import type { Product } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { ProductCardForm } from "./product-card-form";
import { addToast } from "@heroui/toast";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleAddClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);
  const handleSubmit = (quantity: number) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowForm(false);
      addToast({
        title: "Producto agregado",
        description: `Se agregaron ${quantity} unidad${quantity > 1 ? 'es' : ''} de ${product.name} al carrito.`
      });
      // Aquí podrías agregar lógica para agregar al carrito
    }, 1200);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md dark:border-gray-800 min-h-[370px]">
      <div className="w-full overflow-hidden bg-gray-100 aspect-square dark:bg-gray-900">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{product.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
        </div>
        <div className="flex items-center justify-between pt-2 mt-4">
          <span className="text-xl font-bold text-gray-900 dark:text-white">{product.price}</span>
          <motion.div
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              isIconOnly
              color="secondary"
              variant="solid"
              radius="full"
              aria-label={`Añadir ${product.name} al carrito`}
              onClick={handleAddClick}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-black/40 backdrop-blur-sm"
            >
              <ProductCardForm loading={loading} onClose={handleCloseForm} onSubmit={handleSubmit} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};