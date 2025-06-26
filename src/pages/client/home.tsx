import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  User,
  Star,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Shirt,
  Dumbbell,
  Target,
  Zap,
  Trophy,
  Percent,
} from "lucide-react"

export default function HomeClient() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Sportigo</span>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm đồ thể thao..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <nav className="flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Sản phẩm
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Danh mục
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Khuyến mãi
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Liên hệ
              </a>
              <div className="flex items-center space-x-2">
                <button className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </button>
                <button className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors">
                  <User className="w-5 h-5" />
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section data-aos="fade-up" className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-lg">
              <span
                data-aos="fade-right"
                data-aos-delay="100"
                className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium rounded-full"
              >
                Bộ sưu tập thể thao 2024
              </span>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                <span data-aos="fade-right" data-aos-delay="200">Thể thao</span>
                <br />
                <span
                  data-aos="fade-right"
                  data-aos-delay="300"
                  className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
                >
                  Chuyên nghiệp
                </span>
                <br />
                <span data-aos="fade-right" data-aos-delay="400">Phong cách</span>
              </h1>
              <p
                data-aos="fade-right"
                data-aos-delay="500"
                className="text-gray-600 text-lg mb-8"
              >
                Khám phá bộ sưu tập đồ thể thao cao cấp với công nghệ tiên tiến, chất liệu thoáng khí và thiết kế năng động.
              </p>
              <div className="flex space-x-4">
                <button
                  data-aos="zoom-in"
                  data-aos-delay="600"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
                >
                  Mua sắm ngay
                </button>
                <button
                  data-aos="zoom-in"
                  data-aos-delay="700"
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-md font-medium transition-colors"
                >
                  Xem bộ sưu tập
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="relative">
                <img
                  data-aos="zoom-in-up"
                  data-aos-delay="400"
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;h=500&amp;q=80"
                  alt="Woman exercising"
                  className="rounded-lg shadow-lg w-[750px] h-[550px] object-cover -translate-x-6"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  40% GIẢM GIÁ
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section data-aos="fade-up" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Danh mục thể thao</h2>
            <p className="text-gray-600">Khám phá các danh mục đồ thể thao đa dạng cho mọi môn thể thao và hoạt động</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Shirt, name: "Áo thể thao", count: "450 sản phẩm", color: "bg-blue-100 text-blue-600" },
              { icon: Dumbbell, name: "Giày thể thao", count: "320 sản phẩm", color: "bg-green-100 text-green-600" },
              { icon: Target, name: "Quần thể thao", count: "280 sản phẩm", color: "bg-cyan-100 text-cyan-600" },
              { icon: Percent, name: "Phụ kiện gym", count: "150 sản phẩm", color: "bg-orange-100 text-orange-600" },
              { icon: Zap, name: "Đồ bơi", count: "90 sản phẩm", color: "bg-purple-100 text-purple-600" },
              { icon: Trophy, name: "Thể thao đội", count: "200 sản phẩm", color: "bg-red-100 text-red-600" },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="p-6 text-center">
                  <div
                    className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                  >
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section data-aos="fade-up" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sản phẩm nổi bật</h2>
            <p className="text-gray-600">
              Những sản phẩm thể thao được yêu thích nhất với công nghệ tiên tiến và chất lượng cao
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {[
              {
                name: "Áo thể thao Nike Pro",
                price: "1,200,000",
                originalPrice: "1,600,000",
                discount: "-25%",
                badge: "Bán chạy",
                badgeColor: "bg-blue-500",
                image:
                  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80",
              },
              {
                name: "Giày chạy bộ Adidas UltraBoost",
                price: "2,400,000",
                originalPrice: "3,200,000",
                discount: "-25%",
                badge: "Mới",
                badgeColor: "bg-red-500",
                image:
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80",
              },
              {
                name: "Quần legging Nike",
                price: "800,000",
                originalPrice: "1,200,000",
                discount: "-33%",
                badge: "Khuyến mãi",
                badgeColor: "bg-green-500",
                image:
                  "https://images.unsplash.com/photo-1506629905607-d9c297d3f5f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80",
              },
              {
                name: "Túi thể thao Adidas",
                price: "600,000",
                originalPrice: "800,000",
                discount: "-25%",
                badge: "Hot",
                badgeColor: "bg-orange-500",
                image:
                  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80",
              },
              {
                name: "Áo khoác Nike Windrunner",
                price: "1,800,000",
                originalPrice: "2,400,000",
                discount: "-25%",
                badge: "Trending",
                badgeColor: "bg-purple-500",
                image:
                  "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80",
              },
              {
                name: "Giày training Nike Metcon",
                price: "2,200,000",
                originalPrice: "2,800,000",
                discount: "-21%",
                badge: "Pro",
                badgeColor: "bg-gray-700",
                image:
                  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80",
              },
              {
                name: "Quần short Adidas",
                price: "450,000",
                originalPrice: "600,000",
                discount: "-25%",
                badge: "Sale",
                badgeColor: "bg-red-500",
                image:
                  "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80",
              },
              {
                name: "Áo tank top Under Armour",
                price: "680,000",
                originalPrice: "850,000",
                discount: "-20%",
                badge: "New",
                badgeColor: "bg-blue-500",
                image:
                  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80",
              },
             
            ].map((product, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="aspect-square bg-gray-100 overflow-hidden rounded-lg">
                    <img
                      data-aos="fade-up"
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span
                    className={`absolute top-2 left-2 ${product.badgeColor} text-white px-2 py-1 text-xs font-medium rounded`}
                  >
                    {product.badge}
                  </span>
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                    {product.discount}
                  </span>

                  {/* Hover Cart Icon */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <button className="bg-white text-gray-900 hover:bg-gray-100 p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-blue-600">{product.price}đ</span>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}đ</span>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors">
              Xem tất cả sản phẩm
            </button>
          </div>
        </div>
      </section>

      {/* Sports Trends */}
      <section data-aos="fade-up" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium rounded-full">
              Xu hướng thể thao
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thể thao đang hot</h2>
            <p className="text-gray-600">Cập nhật những xu hướng thể thao mới nhất và được ưa chuộng nhất hiện nay</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Running Tech",
                subtitle: "Công nghệ chạy bộ tiên tiến nhất",
                growth: "+65%",
                image:
                  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
              },
              {
                title: "Athleisure Style",
                subtitle: "Phong cách thể thao hàng ngày",
                growth: "+48%",
                image:
                  "https://images.unsplash.com/photo-1506629905607-d9c297d3f5f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
              },
              {
                title: "Sustainable Sports",
                subtitle: "Thể thao bền vững thân thiện môi trường",
                growth: "+72%",
                image:
                  "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
              },
            ].map((trend, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img data-aos="fade-up" src={trend.image || "/placeholder.svg"} alt={trend.title} className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <span className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 text-xs font-medium rounded">
                    {trend.growth}
                  </span>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{trend.title}</h3>
                    <p className="text-sm opacity-90">{trend.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-md font-medium">
              Khám phá xu hướng
            </button>
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <section data-aos="fade-up" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thương hiệu thể thao hàng đầu</h2>
            <p className="text-gray-600">Đối tác với những thương hiệu thể thao uy tín nhất thế giới</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center opacity-60">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-24 h-12 bg-gray-300 rounded flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                  <span className="text-gray-600 font-bold text-xs">BRAND</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Equipment */}
      <section data-aos="fade-up" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-full">
              Sport Collection 2024
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">Phối đồ thể thao chuyên nghiệp</h2>
            <p className="text-gray-300">
              Khám phá cách phối đồ thể thao hoàn hảo cho từng hoạt động với những gợi ý từ chuyên gia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Running Performance Card */}
            <div className="relative h-96 rounded-2xl overflow-hidden group cursor-pointer">
              <img
                data-aos="fade-up"
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80"
                alt="Running Performance"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              <div className="absolute top-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">Running Performance</h3>
                <p className="text-white/90 text-sm mb-4">Trang phục chạy bộ chuyên nghiệp</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 text-xs rounded-full transition-colors">
                    Áo thun Dri-FIT
                  </span>
                  <span className="px-3 py-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 text-xs rounded-full transition-colors">
                    Quần short
                  </span>
                  <span className="px-3 py-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 text-xs rounded-full transition-colors">
                    Giày chạy
                  </span>
                  <span className="px-3 py-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 text-xs rounded-full transition-colors">
                    Đồng hồ thể thao
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <button className="w-full bg-white text-gray-900 hover:bg-gray-100 py-3 rounded-md font-medium transition-colors">
                  Xem bộ sưu tập
                </button>
              </div>
            </div>

            {/* Gym Workout Card */}
            <div className="relative h-96 rounded-2xl overflow-hidden group cursor-pointer">
              <img
                data-aos="fade-up"
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80"
                alt="Gym Workout"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              <div className="absolute top-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">Gym Workout</h3>
                <p className="text-white/90 text-sm mb-4">Bộ đồ tập gym hiệu quả</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 text-xs rounded-full transition-colors">
                    Tank top
                  </span>
                  <span className="px-3 py-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 text-xs rounded-full transition-colors">
                    Quần legging
                  </span>
                  <span className="px-3 py-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 text-xs rounded-full transition-colors">
                    Giày training
                  </span>
                  <span className="px-3 py-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 text-xs rounded-full transition-colors">
                    Găng tay
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <button className="w-full bg-white text-gray-900 hover:bg-gray-100 py-3 rounded-md font-medium transition-colors">
                  Xem bộ sưu tập
                </button>
              </div>
            </div>

            {/* Outdoor Adventure Card */}
            <div className="relative h-96 rounded-2xl overflow-hidden group cursor-pointer">
              <img
                data-aos="fade-up"
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80"
                alt="Outdoor Adventure"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              <div className="absolute top-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">Outdoor Adventure</h3>
                <p className="text-white/90 text-sm mb-4">Trang phục thể thao ngoài trời</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 text-xs rounded-full transition-colors">
                    Áo khoác
                  </span>
                  <span className="px-3 py-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 text-xs rounded-full transition-colors">
                    Quần dài
                  </span>
                  <span className="px-3 py-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 text-xs rounded-full transition-colors">
                    Giày hiking
                  </span>
                  <span className="px-3 py-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 text-xs rounded-full transition-colors">
                    Ba lô
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <button className="w-full bg-white text-gray-900 hover:bg-gray-100 py-3 rounded-md font-medium transition-colors">
                  Xem bộ sưu tập
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-md font-medium transition-colors">
              Xem toàn bộ bộ sưu tập
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section data-aos="fade-up" className="py-16 bg-gradient-to-r from-blue-500 to-green-500">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block mb-4 px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-full">
            Ưu đãi thể thao
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">Đăng ký nhận tin & Giảm 30%</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Đăng ký để nhận thông tin về sản phẩm thể thao mới, tips tập luyện và các ưu đãi độc quyền
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 bg-white border-white text-gray-900 placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-colors">
              Đăng ký ngay
            </button>
          </div>

          <p className="text-white/70 text-sm">
            Bằng cách đăng ký, bạn đồng ý với{" "}
            <a href="#" className="underline hover:no-underline">
              điều khoản dịch vụ
            </a>{" "}
            của chúng tôi
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-white">
            <div>
              <div className="text-3xl font-bold">100K+</div>
              <div className="text-white/80">Vận động viên</div>
            </div>
            <div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-white/80">Sản phẩm</div>
            </div>
            <div>
              <div className="text-3xl font-bold">98%</div>
              <div className="text-white/80">Hài lòng</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-white/80">Hỗ trợ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section data-aos="fade-up" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vận động viên nói gì về chúng tôi</h2>
            <p className="text-gray-600">
              Những phản hồi chân thực từ các vận động viên và người yêu thể thao đã tin tướng Sportigo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Nguyễn Văn Minh",
                role: "Vận động viên chạy bộ",
                content:
                  "Chất lượng sản phẩm tuyệt vời! Áo thun Dri-FIT giúp tôi luôn khô ráo trong suốt quá trình tập luyện. Rất hài lòng với dịch vụ của Sportigo.",
                rating: 5,
                avatar:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80",
              },
              {
                name: "Trần Thị Lan",
                role: "Huấn luyện viên Yoga",
                content:
                  "Bộ đồ yoga ở đây rất thoải mái và co giãn tốt. Thiết kế đẹp, chất liệu cao cấp. Tôi đã giới thiệu cho nhiều học viên.",
                rating: 5,
                avatar:
                  "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80",
              },
              {
                name: "Lê Hoàng Nam",
                role: "Gym trainer",
                content:
                  "Giày training ở Sportigo có độ bám tốt và hỗ trợ chân rất tốt. Phù hợp cho các bài tập cường độ cao. Giao hàng nhanh, đóng gói cẩn thận.",
                rating: 5,
                avatar:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      data-aos="fade-up"
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer data-aos="fade-up" className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Sportigo</span>
              </div>
              <p className="text-gray-600 mb-4">
                Cửa hàng đồ thể thao trực tuyến hàng đầu Việt Nam với hàng ngàn sản phẩm chất lượng từ các thương hiệu
                uy tín.
              </p>
              <div className="flex space-x-3">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-200 rounded-md transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-200 rounded-md transition-colors">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-200 rounded-md transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-200 rounded-md transition-colors">
                  <Youtube className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Sản phẩm
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Khuyến mãi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Blog thể thao
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Hỗ trợ khách hàng</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Trung tâm trợ giúp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Chính sách giao hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Đổi trả hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Bảo hành sản phẩm
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Chính sách bảo mật
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Liên hệ</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>1900 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@sportigo.vn</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>456 Lê Văn Việt, Quận 9, TP.HCM</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Đăng ký nhận tin thể thao</h4>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-md font-medium transition-colors">
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>© 2024 Sportigo. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
