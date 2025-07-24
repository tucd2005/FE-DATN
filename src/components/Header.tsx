import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '../stores/cart.store';
import React from 'react';

const Header = () => {
    const navigate = useNavigate();
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
                            <button
                                className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
                                onClick={() => {
                                    const token = localStorage.getItem('accessToken');
                                    if (!token) {
                                        navigate('/login');
                                    } else {
                                        navigate('/thong-tin-khach-hang');
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
    );
};

export default Header; 