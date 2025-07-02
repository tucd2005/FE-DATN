import { Facebook, Instagram, Mail, MapPin, Phone, Search, ShoppingCart, Twitter, User, Youtube } from 'lucide-react';
import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';

const ClientLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Sportigo</span>
              </Link>

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
                <Link to="/san-pham" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Sản phẩm
                </Link>
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
                  <Link
                    to="/gio-hang"
                    className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      2
                    </span>
                  </Link>

                  <button
                    className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => {
                      const token = localStorage.getItem('accessToken');
                      if (!token) {
                        navigate('/login');
                      } else {
                        navigate('/');
                      }
                    }}
                  >
                    <User className="w-5 h-5" />
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </header>

        <main className="min-h-screen">
          <Outlet />
        </main>

        <footer className="bg-gray-100 py-12">
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
                    <Link to="/san-pham" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Sản phẩm
                    </Link>
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
    </>
  )
}

export default ClientLayout