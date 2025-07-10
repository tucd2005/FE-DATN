import { useEffect, useState } from "react";
import { Filter, Grid3X3, List, ChevronDown, ShoppingCart, Zap } from "lucide-react";
import { productService } from "../../../services/productservice";
import { useNavigate } from "react-router-dom";

import {  Star,  Heart, Eye, Tag } from "lucide-react"


interface Variant {
  id: number
  so_luong: number
  gia: string
  gia_khuyen_mai: string
  hinh_anh: string[] | string
  thuoc_tinh: { ten: string; gia_tri: string }[]
}

interface Product {
  id: number
  ten: string
  mo_ta: string
  so_luong: number
  hinh_anh: string
  danh_muc_id: number
  created_at: string
  updated_at: string
  variants: Variant[]
}

export default function ChiTietSanPham() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("Phổ biến nhất")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Tất cả"])
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["Tất cả"])
  const [priceRange, setPriceRange] = useState([0, 4000000])
  const [favorites, setFavorites] = useState<number[]>([])


  const navigate = useNavigate();

  const categories = ["Tất cả", "Áo thể thao", "Giày thể thao", "Quần thể thao", "Áo khoác", "Đồ yoga", "Phụ kiện"];
  const brands = ["Tất cả", "Nike", "Adidas", "Under Armour", "Puma"];


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAll()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const formatPrice = (price?: string | number) => {
    const num = Number(price)
    if (!isNaN(num)) return num.toLocaleString("vi-VN") + "đ"
    return "0đ"
  }

  const calculateDiscount = (originalPrice: string, salePrice: string) => {
    const original = Number(originalPrice)
    const sale = Number(salePrice)
    if (original > 0 && sale > 0) {
      return Math.round(((original - sale) / original) * 100)
    }
    return 0
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleCategoryChange = (category: string) => {
    if (category === "Tất cả") {
      setSelectedCategories(["Tất cả"])
    } else {
      const newCategories = selectedCategories.includes("Tất cả")
        ? [category]
        : selectedCategories.includes(category)
          ? selectedCategories.filter((c) => c !== category)
          : [...selectedCategories.filter((c) => c !== "Tất cả"), category]

      setSelectedCategories(newCategories.length === 0 ? ["Tất cả"] : newCategories)
    }
  }

  const handleBrandChange = (brand: string) => {
    if (brand === "Tất cả") {
      setSelectedBrands(["Tất cả"])
    } else {
      const newBrands = selectedBrands.includes("Tất cả")
        ? [brand]
        : selectedBrands.includes(brand)
          ? selectedBrands.filter((b) => b !== brand)
          : [...selectedBrands.filter((b) => b !== "Tất cả"), brand]

      setSelectedBrands(newBrands.length === 0 ? ["Tất cả"] : newBrands)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Đang tải sản phẩm...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Bộ lọc</h3>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-teal-500" />
                  Danh mục
                </h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-teal-600 transition-colors font-medium">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-8">
                <h4 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  Thương hiệu
                </h4>
                <div className="space-y-3">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-teal-600 transition-colors font-medium">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-base font-semibold text-gray-800 mb-4">Khoảng giá</h4>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="4000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-sm font-medium text-gray-600 mt-3">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">0đ</span>
                    <span className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-2 py-1 rounded-md">
                      {formatPrice(priceRange[1])}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Sản phẩm thể thao</h1>
                <p className="text-gray-600 font-medium">
                  <span className="text-teal-600 font-bold">{products.length}</span> sản phẩm được tìm thấy
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 shadow-sm font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option>Phổ biến nhất</option>
                    <option>Giá thấp đến cao</option>
                    <option>Giá cao đến thấp</option>
                    <option>Mới nhất</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 transition-colors duration-200 ${
                      viewMode === "grid"
                        ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white"
                        : "bg-transparent text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 transition-colors duration-200 ${
                      viewMode === "list"
                        ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white"
                        : "bg-transparent text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
            >
              {products.map((product) => {
                const variant = product.variants?.[0]
                const price = variant?.gia
                const originalPrice = variant?.gia_khuyen_mai
                const discount = calculateDiscount(price || "0", originalPrice || "0")
                const isFavorite = favorites.includes(product.id)

                const imgPath = product.hinh_anh
                const src = imgPath?.startsWith("http")
                  ? imgPath
                  : imgPath
                    ? `http://127.0.0.1:8000/storage/${imgPath}`
                    : "/placeholder.svg"

                return (
                  <div
                    key={product.id}

                    onClick={() => navigate(`/san-pham/${product.id}`)} // hoặc dùng slug nếu có
                    className="cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"

                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={src}
                        alt={product.ten}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Discount Badge */}
                      {discount > 0 && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm flex items-center gap-1">
                          -{discount}%
                        </div>
                      )}

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`absolute top-4 right-4 p-2 rounded-full shadow-sm transition-colors duration-200 ${
                          isFavorite
                            ? "bg-red-500 text-white"
                            : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500"
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-800">{product.ten}</h3>

                      <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">{product.mo_ta}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                      </div>

                      <div className="flex items-center gap-3 mb-6">
                        {originalPrice && Number(originalPrice) > 0 ? (
                          <>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                              {formatPrice(price)}
                            </span>
                            <span className="text-sm text-gray-400 line-through font-medium">{formatPrice(originalPrice)}</span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-gray-800">{formatPrice(price)}</span>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-teal-600 transition-all duration-200 font-semibold shadow-sm">
                          <ShoppingCart className="w-4 h-4" />
                          Thêm vào giỏ
                        </button>

                        <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 text-gray-600 rounded-lg hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 font-semibold">
                          <Eye className="w-4 h-4" />
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
