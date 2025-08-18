import { useState, useEffect } from "react";
import type { ProductFilterParams } from "../../../services/productservice";
import { useProductsClient } from "../../../hooks/useProductsClient";
import ProductFilters from "./components/ProductFilters";
import ProductHeader from "./components/ProductHeader";
import ProductGrid from "./components/ProductGrid";
import Pagination from "./components/Pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instanceAxios from "../../../utils/axios";
import { message, Spin } from "antd";
import type { IFavoriteProduct } from "../../../types/product.type";

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchInput, setSearchInput] = useState(""); // giá trị nhập tạm

  const queryClient = useQueryClient();

  // Lấy danh sách yêu thích
  const { data: fav } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => instanceAxios.get("/wishlists").then((res) => res.data),
  });

  const { mutate: addFavorite } = useMutation({
    mutationFn: (productId: number) =>
      instanceAxios.post("/wishlists", { san_pham_id: productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      message.success("Đã thêm vào yêu thích!");
    },
  });

  const { mutate: removeFavorite } = useMutation({
    mutationFn: (productId: number) =>
      instanceAxios.delete("/wishlists/" + productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      message.success("Đã xóa khỏi yêu thích!");
    },
  });

  // Debounce search keyword
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKeyword(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Params API
  const filterParams: ProductFilterParams = {
    page: currentPage,
    per_page: 12,
    keyword: searchKeyword || undefined,
    danh_muc_id: selectedCategory === "Tất cả" ? undefined : parseInt(selectedCategory),
    gia_min: priceRange[0],
    gia_max: priceRange[1],
  };

  const { data, isLoading, error } = useProductsClient(filterParams);

  const rawProducts = data?.data || [];
  const meta = data?.meta;
  const products = rawProducts;
  const favoriteProducts = fav?.data?.map((e: IFavoriteProduct) => e.product.id) || [];

  const toggleFavorite = (productId: number) => {
    if (favoriteProducts.includes(productId)) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    if (range[0] !== priceRange[0] || range[1] !== priceRange[1]) {
      setCurrentPage(1);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("Tất cả");
    setPriceRange([0, 4000000]);
    setSearchKeyword("");
    setSearchInput("");
    setCurrentPage(1);
  };

  const handleSearchChange = (keyword: string) => {
    setSearchInput(keyword);
  };

  const handleSearchSubmit = (keyword: string) => {
    setSearchKeyword(keyword);
    setSearchInput(keyword);
    setCurrentPage(1);
  };

  const handleViewModeChange = (view: "grid" | "list") => {
    setViewMode(view);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
            selectedCategory={selectedCategory}
            priceRange={priceRange}
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={handlePriceRangeChange}
            onResetFilters={handleResetFilters}
          />

          {/* Main */}
          <div className="flex-1">
            <ProductHeader
              totalProducts={meta?.total || products.length}
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              searchKeyword={searchInput}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
            />

            {isLoading ? (
              <div className="flex flex-col gap-2 justify-center items-center min-h-[70dvh]">
                <Spin size="large" />
                <p className="text-gray-600 text-lg font-medium">Đang tải sản phẩm...</p>
              </div>
            ) : (
              <>
                <ProductGrid
                  products={products}
                  viewMode={viewMode}
                  favorites={favoriteProducts}
                  onToggleFavorite={toggleFavorite}
                />

                {meta && meta.last_page > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    lastPage={meta.last_page}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
