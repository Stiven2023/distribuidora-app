"use client";

import { useState, useMemo, useEffect } from "react";
import { title } from "@/components/primitives";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductCatalog } from "@/components/ProductCatalog";
import { useIsMobile } from "@/lib/useIsMobile";
import { products } from "@/lib/data";
import { useUser } from "@/app/providers";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types";

const PRODUCTS_PER_PAGE = 8;

export default function ClientDashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== UserRole.CLIENT) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  if (!user || user.role !== UserRole.CLIENT) return null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortDescriptor, setSortDescriptor] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);

  const isMobile = useIsMobile();

  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category);

    return ["Todos", ...Array.from(new Set(allCategories))];
  }, []);

  const brands = useMemo(() => {
    const allBrands = products.map((p) => p.brand);

    return ["Todas", ...Array.from(new Set(allBrands))];
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (selectedCategory !== "all" && selectedCategory !== "Todos") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (selectedBrand !== "all" && selectedBrand !== "Todas") {
      filtered = filtered.filter((product) => product.brand === selectedBrand);
    }

    const [sortField, sortDirection] = sortDescriptor.split("-");

    filtered.sort((a, b) => {
      const aValue = sortField === "price" ? a.price : a.name;
      const bValue = sortField === "price" ? b.price : b.name;

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;

      return 0;
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedBrand, sortDescriptor]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;

    return filteredProducts.slice(start, end);
  }, [currentPage, filteredProducts]);

  return (
    <section className="flex flex-col gap-8 py-8 md:py-10">
      <div className="text-center">
        <h1 className={title()}>Catálogo de Productos</h1>
        <p className="mt-2 text-default-500">
          Explora nuestra dulce selección de golosinas
        </p>
      </div>
      <div className="left-0 flex w-full gap-8 mx-auto">
        {/* Filtros a la izquierda */}
        <div className="sticky flex w-64 gap-2 md:flex top-32">
          <ProductFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            sortDescriptor={sortDescriptor}
            setSortDescriptor={setSortDescriptor}
            categories={categories}
            brands={brands}
            isMobile={false}
          />
        </div>
        {/* Filtros en mobile */}
        <div className="w-full mb-4 md:hidden">
          <ProductFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            sortDescriptor={sortDescriptor}
            setSortDescriptor={setSortDescriptor}
            categories={categories}
            brands={brands}
            isMobile={true}
          />
        </div>
        {/* Catálogo centrado */}
        <div className="flex-1">
          <ProductCatalog
            products={currentProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}