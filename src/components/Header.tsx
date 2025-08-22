import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '../stores/cart.store';
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { useSearch } from '../hooks/useSearch';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { data: profile } = useProfile();
  const { totalQuantity } = useCartStore();
  const { query, setQuery, results, loading, error } = useSearch();

  const placeHolders = [
    'Tìm kiếm đồ thể thao...',
    'Quần áo thể thao chất...',
    'Chuyên gia bán đồ đẹp...',
    'Mua sắm ngay cùng Sportigo',
  ];
  const [index, setIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null); // Tham chiếu đến container tìm kiếm

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeHolders.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Xử lý nhấp chuột bên ngoài để ẩn kết quả tìm kiếm
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setQuery(''); // Xóa query để ẩn kết quả
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

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
          <div className="relative w-96" ref={searchRef}> {/* Gắn ref vào container tìm kiếm */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={placeHolders[index]}
              className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={query}
              onChange={handleSearchChange}
            />
            {query && (
              // iamas
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setQuery('')}
              >
                X
              </button>
            )}
            {loading && (
              <div className="absolute left-0 right-0 p-2 text-gray-600 bg-white rounded-md shadow-md">
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span className="ml-2">Đang tìm kiếm...</span>
                </div>
              </div>
            )}
            {error && (
              <div className="absolute left-0 right-0 p-2 text-red-600 bg-white rounded-md shadow-md">
                {error}
              </div>
            )}
            {results.length > 0 && query && (
              <div className="absolute left-0 right-0 bg-white shadow-lg rounded-lg mt-2 max-h-80 overflow-y-auto border border-gray-100">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/san-pham/${product.id}`}
                    className="flex items-center p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-all duration-200 rounded-md"
                    onClick={() => setQuery('')} // Xóa query khi nhấp vào kết quả
                  >
                    {product.anh && (
                      <img
                        src={product.anh}
                        alt={product.ten}
                        className="w-10 h-10 object-cover rounded-md mr-3"
                      />
                    )}
                    <div className="flex-1">
                      <span className="text-gray-800 font-medium">{product.ten}</span>
                      <div className="flex items-center space-x-2 mt-1">
                        {product.variants?.[0]?.attributeValues?.[0]?.gia_tri && (
                          <span className="text-xs text-gray-500">
                            {product.variants[0].attributeValues[0].gia_tri}
                          </span>
                        )}
                        {product.variants?.[0]?.gia_khuyen_mai ? (
                          <span className="text-sm text-red-600 font-semibold">
                            {product.variants[0].gia_khuyen_mai.toLocaleString()} VND
                          </span>
                        ) : (
                          <span className="text-sm text-gray-600">
                            {product.variants?.[0]?.gia?.toLocaleString()} VND
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
                <Link
                  to={`/san-pham?keyword=${encodeURIComponent(query)}`}
                  className="block p-3 text-center text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-b-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200"
                  onClick={() => setQuery('')} // Xóa query khi nhấp vào "Xem tất cả"
                >
                  Xem tất cả kết quả
                </Link>
              </div>
            )}
            {!loading && !error && results.length === 0 && query && (
              <div className="absolute left-0 right-0 p-2 text-gray-600 bg-white rounded-md shadow-md">
                Không tìm thấy sản phẩm
              </div>
            )}
          </div>
          <nav className="flex items-center space-x-6">
            <Link to="/san-pham" className="text-gray-700 hover:text-blue-600 transition-colors">
              Sản phẩm
            </Link>
            <a href="/bai_viet" className="text-gray-700 hover:text-blue-600 transition-colors">
              Tin tức
            </a>
            <a href="/lien-he" className="text-gray-700 hover:text-blue-600 transition-colors">
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
                      src={profile?.anh_dai_dien || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-KTBlqHftCBwjj38pFMWEiMgX_vBq2KUvWQ&s'}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-700">{profile?.email}</span>
                  </div>
                ) : (
                  <button
                    className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => navigate('/login')}
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
                    <button
                      onClick={() => {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('user');
                        navigate('/login');
                        window.location.reload();
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