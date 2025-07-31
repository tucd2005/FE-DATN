import { useEffect, useState } from "react";
import { productService } from "../../../services/productservice";
import type { Product } from "../../../types/product.type";
import LoadingSpinner from "./components/LoadingSpinner";
import ProductFilters from "./components/ProductFilters";
import ProductHeader from "./components/ProductHeader";
import ProductGrid from "./components/ProductGrid";
import { Pagination } from "antd";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Phổ biến nhất");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Tất cả"]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["Tất cả"]);
  const [priceRange, setPriceRange] = useState([0, 4000000]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<{
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  } | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productService.getPaginated({ page: currentPage });
        setProducts(res.data);
        setMeta(res.meta);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleCategoryChange = (category: string) => {
    if (category === "Tất cả") {
      setSelectedCategories(["Tất cả"]);
    } else {
      const newCategories = selectedCategories.includes("Tất cả")
        ? [category]
        : selectedCategories.includes(category)
          ? selectedCategories.filter((c) => c !== category)
          : [...selectedCategories.filter((c) => c !== "Tất cả"), category];

      setSelectedCategories(newCategories.length === 0 ? ["Tất cả"] : newCategories);
    }
  };

  const handleBrandChange = (brand: string) => {
    if (brand === "Tất cả") {
      setSelectedBrands(["Tất cả"]);
    } else {
      const newBrands = selectedBrands.includes("Tất cả")
        ? [brand]
        : selectedBrands.includes(brand)
          ? selectedBrands.filter((b) => b !== brand)
          : [...selectedBrands.filter((b) => b !== "Tất cả"), brand];

      setSelectedBrands(newBrands.length === 0 ? ["Tất cả"] : newBrands);
    }
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <ProductFilters
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            priceRange={priceRange}
            onCategoryChange={handleCategoryChange}
            onBrandChange={handleBrandChange}
            onPriceRangeChange={handlePriceRangeChange}
          />

          {/* Main */}
          <div className="flex-1">
            <ProductHeader
              totalProducts={meta?.total || products.length}
              sortBy={sortBy}
              viewMode={viewMode}
              onSortChange={handleSortChange}
              onViewModeChange={handleViewModeChange}
            />

            <ProductGrid
              products={products}
              viewMode={viewMode}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />

            {meta && meta.last_page > 1 && (
              <Pagination
                currentPage={currentPage}
                lastPage={meta.last_page}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;