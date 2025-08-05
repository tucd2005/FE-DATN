import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => {
    return (
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
                                <span>Số 1 Trịnh Văn Bô, Nam Từ Liêm, Hà Nội</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Đăng ký nhận tin tức từ Sportigo</h4>
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
                    <p>© 2025 Sportigo. Tất cả quyền được bảo lưu.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 