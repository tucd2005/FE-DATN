import { useState, useEffect } from "react";
import type { ProductFilterParams } from "../../../services/productservice";
import { useProductsClient } from "../../../hooks/useProductsClient";
import LoadingSpinner from "./components/LoadingSpinner";
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Tất cả"]);
  const [priceRange, setPriceRange] = useState([0, 4000000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchInput, setSearchInput] = useState(""); // Separate state for input value

  const queryClient = useQueryClient();

  const { data: fav } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => instanceAxios.get("/wishlists").then(res => res.data),
  })

  const { mutate: addFavorite } = useMutation({
    mutationFn: (productId: number) => instanceAxios.post("/wishlists", { san_pham_id: productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      message.success('Đã thêm vào yêu thích!');
    }
  });

  const { mutate: removeFavorite } = useMutation({
    mutationFn: (productId: number) => instanceAxios.delete("/wishlists/" + productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      message.success('Đã xóa khỏi yêu thích!');
    }
  });


  // Debounce search keyword
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKeyword(searchInput);
      setCurrentPage(1); // Reset to page 1 when search changes
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Định nghĩa params cho API, bao gồm các tham số lọc
  const filterParams: ProductFilterParams = {
    page: currentPage,
    per_page: 12,
    keyword: searchKeyword || undefined,
    danh_muc_id: selectedCategories.includes("Tất cả")
      ? undefined
      : selectedCategories.length > 0 && selectedCategories[0] !== "Tất cả"
        ? parseInt(selectedCategories[0])
        : undefined,
    gia_min: priceRange[0],
    gia_max: priceRange[1],
  };

  // Sử dụng TanStack Query
  const { data, isLoading, error } = useProductsClient(filterParams);

  // Lấy dữ liệu từ response
  const rawProducts = data?.data || [];
  const meta = data?.meta;
  const products = rawProducts;
  const favoriteProducts = fav?.data?.map((e: IFavoriteProduct) => e.product.id);

  const toggleFavorite = async (productId: number) => {
    const check = favoriteProducts.includes(productId);
    if (check) {
      removeFavorite(productId);
      return;
    }
    addFavorite(productId);
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
    setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
  };

  const handleResetFilters = () => {
    setSelectedCategories(["Tất cả"]);
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

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
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
            selectedCategories={selectedCategories}
            priceRange={priceRange as [number, number]}
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
              selectedCategories={selectedCategories}
              priceRange={priceRange as [number, number]}
              searchKeyword={searchInput}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
            />

            {isLoading ? <div className="flex justify-center items-center min-h-[70dvh]"><Spin /></div> : <> <ProductGrid
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
              )}</>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;