import { useState, useMemo } from "react";
import type { ProductFilterParams } from "../../../services/productservice";
import { useProductsClient } from "../../../hooks/useProductsClient";
import { sortProducts } from "../../../utils/sortProducts";
import LoadingSpinner from "./components/LoadingSpinner";
import ProductFilters from "./components/ProductFilters";
import ProductHeader from "./components/ProductHeader";
import ProductGrid from "./components/ProductGrid";
import Pagination from "./components/Pagination";

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Phổ biến nhất");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Tất cả"]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["Tất cả"]);
  const [priceRange, setPriceRange] = useState([0, 4000000]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Định nghĩa các tùy chọn sắp xếp
  const sortOptions = {
    "Phổ biến nhất": { sort_by: 'created_at' as const, sort_order: 'desc' as const },
    "Giá thấp đến cao": { sort_by: 'variants_min_gia_khuyen_mai' as const, sort_order: 'asc' as const },
    "Giá cao đến thấp": { sort_by: 'variants_min_gia_khuyen_mai' as const, sort_order: 'desc' as const },
    "Tên A-Z": { sort_by: 'ten' as const, sort_order: 'asc' as const },
    "Tên Z-A": { sort_by: 'ten' as const, sort_order: 'desc' as const },
    "Mới nhất": { sort_by: 'created_at' as const, sort_order: 'desc' as const },
  };

  // Tạo params cho API
  const filterParams: ProductFilterParams = {
    page: currentPage,
    per_page: 12,
    ...sortOptions[sortBy as keyof typeof sortOptions],
  };

  // Sử dụng TanStack Query
  const { data, isLoading, error } = useProductsClient(filterParams);

  // Lấy dữ liệu từ response và sort client-side nếu cần
  const rawProducts = data?.data || [];
  const meta = data?.meta;

  // Sort client-side để đảm bảo chính xác
  const products = useMemo(() => {
    return sortProducts(rawProducts, sortBy);
  }, [rawProducts, sortBy]);

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Có lỗi xảy ra</h2>
          <p className="text-gray-600">Không thể tải danh sách sản phẩm</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <ProductFilters
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            priceRange={priceRange as [number, number]}
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