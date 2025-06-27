
import { Filter, Grid3X3, List, ChevronDown, Star, ShoppingCart, Search, User } from "lucide-react"
import { useState } from "react"

export default function ChiTietSanPham() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Tất cả"])
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["Tất cả"])
  const [priceRange, setPriceRange] = useState([0, 4000000])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("Phổ biến nhất")

  const categories = ["Tất cả", "Áo thể thao", "Giày thể thao", "Quần thể thao", "Áo khoác", "Đồ yoga", "Phụ kiện"]

  const brands = ["Tất cả", "Nike", "Adidas", "Under Armour", "Puma"]

  const products = [
    {
      id: 1,
      name: "Áo thun thể thao Nike Dri-FIT",
      brand: "Nike",
      price: 599000,
      originalPrice: 799000,
      discount: 25,
      rating: 4.9,
      reviews: 234,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: 2,
      name: "Giày chạy bộ Adidas Ultraboost",
      brand: "Adidas",
      price: 2999000,
      originalPrice: 3599000,
      discount: 17,
      rating: 4.8,
      reviews: 189,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: 3,
      name: "Quần short thể thao Under Armour",
      brand: "Under Armour",
      price: 899000,
      originalPrice: 1199000,
      discount: 25,
      rating: 4.7,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: 4,
      name: "Áo khoác thể thao Puma",
      brand: "Puma",
      price: 1799000,
      originalPrice: 2299000,
      discount: 22,
      rating: 4.6,
      reviews: 98,
      image:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: 5,
      name: "Giày tennis Wilson",
      brand: "Wilson",
      price: 1599000,
      originalPrice: 1999000,
      discount: 20,
      rating: 4.8,
      reviews: 67,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: 6,
      name: "Bộ đồ tập yoga Lululemon",
      brand: "Lululemon",
      price: 2199000,
      originalPrice: 2799000,
      discount: 21,
      rating: 4.9,
      reviews: 145,
      image:
        "https://images.unsplash.com/photo-1506629905607-d9c297d3f5f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: 7,
      name: "Bộ đồ tập yoga Lululemon",
      brand: "Lululemon",
      price: 2199000,
      originalPrice: 2799000,
      discount: 21,
      rating: 4.9,
      reviews: 145,
      image:
        "https://images.unsplash.com/photo-1506629905607-d9c297d3f5f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: 8,
      name: "Bộ đồ tập yoga Lululemon",
      brand: "Lululemon",
      price: 2199000,
      originalPrice: 2799000,
      discount: 21,
      rating: 4.9,
      reviews: 145,
      image:
        "https://images.unsplash.com/photo-1506629905607-d9c297d3f5f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: 9,
      name: "Bộ đồ tập yoga Lululemon",
      brand: "Lululemon",
      price: 2199000,
      originalPrice: 2799000,
      discount: 21,
      rating: 4.9,
      reviews: 145,
      image:
        "https://images.unsplash.com/photo-1506629905607-d9c297d3f5f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    },
     
  ]

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

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ"
  }

  return (
    <div className="min-h-screen bg-white">
  

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              {/* Filter Header */}
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

              {/* Price Range */}
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-4">Khoảng giá</h4>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="4000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0đ</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Sản phẩm thể thao</h1>
                <p className="text-gray-600">{products.length} sản phẩm được tìm thấy</p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Phổ biến nhất</option>
                    <option>Giá thấp đến cao</option>
                    <option>Giá cao đến thấp</option>
                    <option>Mới nhất</option>
                    <option>Đánh giá cao nhất</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                      -{product.discount}%
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-3">{product.brand}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                      <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Thêm vào giỏ
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  Trước
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-md">1</button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  3
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
