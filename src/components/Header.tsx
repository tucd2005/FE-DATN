import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '../stores/cart.store';
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
    const navigate = useNavigate();
    
    const { user, isLoggedIn, logout } = useAuth();
//     const user = JSON.parse(localStorage.getItem("user") || "null");
// const isLoggedIn = !!localStorage.getItem("accessToken");



    const { totalQuantity } = useCartStore();
    return (
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
                        <a href="lien-he" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Liên hệ
                        </a>
                        <div className="flex items-center space-x-2">
                            <Link
                                to="/gio-hang"
                                className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {totalQuantity}
                                    </span>
                                )}
                            </Link>
                            <div className="relative group">
  {isLoggedIn ? (
    <div className="flex items-center space-x-2 cursor-pointer group">
      <img
        src={user?.avatar || "/default-avatar.png"}
        alt="avatar"
        className="w-8 h-8 rounded-full object-cover"
      />
      <span className="text-sm text-gray-700">{user?.firstName} {user?.lastName}</span>
    </div>
  ) : (
    <button
      className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
      onClick={() => navigate("/login")}
    >
      <User className="w-5 h-5" />
    </button>
  )}

  {isLoggedIn && (
    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md border border-gray-200 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
      <Link
        to="/thong-tin-khach-hang"
        className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
      >
        Thông tin cá nhân
      </Link>
      <Link
        to="/don-hang"
        className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
      >
        Đơn hàng của tôi
      </Link>
      <button
        onClick={() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          navigate("/login");
          window.location.reload(); // để update UI
        }}
        className="w-full text-left px-4 py-2 text-sm hover:bg-red-100 text-red-600"
      >
        Đăng xuất
      </button>
    </div>
  )}
</div>

                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header; 