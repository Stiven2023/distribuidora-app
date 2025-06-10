"use client";

import { useState, useMemo } from "react";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Pagination } from "@heroui/pagination";

import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { title } from "@/components/primitives";
import { SearchIcon } from "@/components/icons";

const PRODUCTS_PER_PAGE = 8;

export default function ClientDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortDescriptor, setSortDescriptor] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);

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

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <Input
          isClearable
          className="w-full md:max-w-sm"
          placeholder="Buscar por nombre..."
          startContent={<SearchIcon />}
          value={searchQuery}
          onValueChange={setSearchQuery}
          aria-label="Buscar productos"
        />
        <Select
          label="Categoría"
          className="w-full md:max-w-xs"
          selectedKeys={[selectedCategory]}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Filtrar por categoría"
        >
          {categories.map((category) => (
            <SelectItem key={category}>{category}</SelectItem>
          ))}
        </Select>
        <Select
          label="Marca"
          className="w-full md:max-w-xs"
          selectedKeys={[selectedBrand]}
          onChange={(e) => setSelectedBrand(e.target.value)}
          aria-label="Filtrar por marca"
        >
          {brands.map((brand) => (
            <SelectItem key={brand}>{brand}</SelectItem>
          ))}
        </Select>
        <Select
          label="Ordenar por"
          className="w-full md:max-w-xs"
          selectedKeys={[sortDescriptor]}
          onChange={(e) => setSortDescriptor(e.target.value)}
          aria-label="Ordenar productos"
        >
          <SelectItem key="name-asc">Nombre (A-Z)</SelectItem>
          <SelectItem key="name-desc">Nombre (Z-A)</SelectItem>
          <SelectItem key="price-asc">Precio (Menor a Mayor)</SelectItem>
          <SelectItem key="price-desc">Precio (Mayor a Menor)</SelectItem>
        </Select>
      </div>

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-default-500">
            No se encontraron productos con esos criterios.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            isCompact
            showControls
            color="secondary"
            total={totalPages}
            initialPage={1}
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
}