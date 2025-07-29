import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductsFilter } from "../../../hooks/useProducts";
import LoadingSpinner from "./components/LoadingSpinner";
import ProductFilters from "./components/ProductFilters";
import ProductHeader from "./components/ProductHeader";
import ProductGrid from "./components/ProductGrid";
import Pagination from "./components/Pagination";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<number[]>([]);

  // Filter states
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || "");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000000]);
  const [currentPage, setCurrentPage] = useState(1);

  // Build filter params
  const filterParams: Record<string, unknown> = {
    page: currentPage,
    sort_by: sortBy,
    sort_order: sortOrder
  };

  if (keyword) {
    filterParams.keyword = keyword;
  }

  if (selectedCategoryId) {
    filterParams.danh_muc_id = selectedCategoryId;
  }

  if (priceRange[1] < 4000000) {
    filterParams.gia_max = priceRange[1];
  }

  if (priceRange[0] > 0) {
    filterParams.gia_min = priceRange[0];
  }

  // Use TanStack Query
  const {
    data: productsData,
    isLoading,
    error,
    refetch
  } = useProductsFilter(filterParams);

  const products = productsData?.data || [];
  const meta = productsData?.meta;

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Debounced search
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return (searchKeyword: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setKeyword(searchKeyword);
          setCurrentPage(1); // Reset to first page when searching

          // Update URL params
          const newSearchParams = new URLSearchParams(searchParams);
          if (searchKeyword.trim()) {
            newSearchParams.set('keyword', searchKeyword.trim());
          } else {
            newSearchParams.delete('keyword');
          }
          setSearchParams(newSearchParams);
        }, 500);
      };
    })(),
    [searchParams, setSearchParams]
  );

  const handleSearch = (searchKeyword: string) => {
    debouncedSearch(searchKeyword);
  };

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(1);
  };

  const handleSort = (newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    setCurrentPage(1);
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Error handling
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl font-bold mb-4">Có lỗi xảy ra!</div>
          <button
            onClick={() => refetch()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <ProductFilters
            keyword={keyword}
            selectedCategoryId={selectedCategoryId}
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
            priceRange={priceRange}
            onPriceRangeChange={handlePriceRangeChange}
          />

          {/* Main */}
          <div className="flex-1">
            <ProductHeader
              totalProducts={meta?.total || products.length}
              sortBy={sortBy}
              sortOrder={sortOrder}
              viewMode={viewMode}
              onSort={handleSort}
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