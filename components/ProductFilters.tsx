import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { SearchIcon } from "@/components/icons";

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  sortDescriptor: string;
  setSortDescriptor: (value: string) => void;
  categories: string[];
  brands: string[];
  isMobile?: boolean;
}

export function ProductFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  sortDescriptor,
  setSortDescriptor,
  categories,
  brands,
  isMobile = false,
}: ProductFiltersProps) {
  if (isMobile) {
    return (
      <div className="w-full mb-4 md:hidden">
        <Select label="Filtros" className="w-full mb-2">
          <SelectItem key="search" textValue="Buscar">
            <Input
              isClearable
              className="w-full"
              placeholder="Buscar por nombre..."
              startContent={<SearchIcon />}
              value={searchQuery}
              onValueChange={setSearchQuery}
              aria-label="Buscar productos"
            />
          </SelectItem>
          <SelectItem key="category" textValue="Categoría">
            <Select
              label="Categoría"
              className="w-full"
              selectedKeys={[selectedCategory]}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filtrar por categoría"
            >
              {categories.map((category) => (
                <SelectItem key={category}>{category}</SelectItem>
              ))}
            </Select>
          </SelectItem>
          <SelectItem key="brand" textValue="Marca">
            <Select
              label="Marca"
              className="w-full"
              selectedKeys={[selectedBrand]}
              onChange={(e) => setSelectedBrand(e.target.value)}
              aria-label="Filtrar por marca"
            >
              {brands.map((brand) => (
                <SelectItem key={brand}>{brand}</SelectItem>
              ))}
            </Select>
          </SelectItem>
          <SelectItem key="sort" textValue="Ordenar por">
            <Select
              label="Ordenar por"
              className="w-full"
              selectedKeys={[sortDescriptor]}
              onChange={(e) => setSortDescriptor(e.target.value)}
              aria-label="Ordenar productos"
            >
              <SelectItem key="name-asc">Nombre (A-Z)</SelectItem>
              <SelectItem key="name-desc">Nombre (Z-A)</SelectItem>
              <SelectItem key="price-asc">Precio (Menor a Mayor)</SelectItem>
              <SelectItem key="price-desc">Precio (Mayor a Menor)</SelectItem>
            </Select>
          </SelectItem>
        </Select>
      </div>
    );
  }

  return (
    <div className="sticky flex flex-col gap-2 top-32">
      <Input
        isClearable
        className="w-full"
        placeholder="Buscar por nombre..."
        startContent={<SearchIcon />}
        value={searchQuery}
        onValueChange={setSearchQuery}
        aria-label="Buscar productos"
      />
      <Select
        label="Categoría"
        className="w-full"
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
        className="w-full"
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
        className="w-full"
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
  );
}
