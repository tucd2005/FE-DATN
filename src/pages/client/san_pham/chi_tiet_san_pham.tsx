import { useEffect, useState } from "react";
import { Filter, Grid3X3, List, ChevronDown, ShoppingCart, Zap } from "lucide-react";
import { productService } from "../../../services/productservice";
import { useNavigate } from "react-router-dom";

interface Variant {
  id: number;
  so_luong: number;
  gia: string;
  gia_khuyen_mai: string;
  hinh_anh: string[] | string;
  thuoc_tinh: { ten: string; gia_tri: string }[];
}

interface Product {
  id: number;
  ten: string;
  mo_ta: string;
  so_luong: number;
  hinh_anh: string;
  danh_muc_id: number;
  created_at: string;
  updated_at: string;
  variants: Variant[];
}

export default function ChiTietSanPham() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Phổ biến nhất");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Tất cả"]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["Tất cả"]);
  const [priceRange, setPriceRange] = useState([0, 4000000]);

  const navigate = useNavigate();

  const categories = ["Tất cả", "Áo thể thao", "Giày thể thao", "Quần thể thao", "Áo khoác", "Đồ yoga", "Phụ kiện"];
  const brands = ["Tất cả", "Nike", "Adidas", "Under Armour", "Puma"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const formatPrice = (price?: string | number) => {
    const num = Number(price);
    if (!isNaN(num)) return num.toLocaleString("vi-VN") + "đ";
    return "0đ";
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

  if (loading) return <div className="text-center py-10 text-gray-500">Đang tải sản phẩm...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Bộ lọc</h3>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-900 mb-4">Danh mục</h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-900 mb-4">Thương hiệu</h4>
                <div className="space-y-3">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-4">Khoảng giá</h4>
                <input
                  type="range"
                  min="0"
                  max="4000000"
                  step="100000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>0đ</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Sản phẩm</h1>
                <p className="text-gray-600">{products.length} sản phẩm được tìm thấy</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 shadow-sm"
                  >
                    <option>Phổ biến nhất</option>
                    <option>Giá thấp đến cao</option>
                    <option>Giá cao đến thấp</option>
                    <option>Mới nhất</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-gray-900 text-white" : "bg-white text-gray-600"}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-gray-900 text-white" : "bg-white text-gray-600"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {products.map((product) => {
                const variant = product.variants?.[0];
                const price = variant?.gia;
                const originalPrice = variant?.gia_khuyen_mai;
                let imgPath = Array.isArray(variant?.hinh_anh) ? variant?.hinh_anh[0] : variant?.hinh_anh;
                let src = imgPath?.startsWith("http") ? imgPath : `http://127.0.0.1:8000/storage/${imgPath}`;

                return (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/san-pham/${product.id}`)} // hoặc dùng slug nếu có
                    className="cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative">
                      <img src={src} alt={product.ten} className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1 line-clamp-2">{product.ten}</h3>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.mo_ta}</p>
                      <div className="flex items-center gap-2 mb-4">
                        {originalPrice && Number(originalPrice) > 0 ? (
                          <>
                            <span className="text-xl font-bold text-red-600">{formatPrice(originalPrice)}</span>
                            <span className="text-sm text-gray-500 line-through">{formatPrice(price)}</span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-gray-900">{formatPrice(price)}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
                          <ShoppingCart className="w-4 h-4" /> Thêm vào giỏ
                        </button>
                        <button className="flex items-center gap-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                          <Zap className="w-4 h-4" /> Mua ngay
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
