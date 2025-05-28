import type React from "react"

const SignIn: React.FC = () => {
    return (
        <div className="m-0 font-sans antialiased font-normal bg-gradient-to-br from-slate-50 to-blue-50 text-start text-base leading-default text-slate-600">

                    {/* Main Section */}
                    <main className="min-h-screen flex items-center justify-center py-12 px-4">
                        <div className="w-full max-w-6xl">
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                                <div className="flex flex-col lg:flex-row min-h-[600px]">
                                    {/* Left Side - Login Form */}
                                    <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                                        <div className="max-w-md mx-auto w-full">
                                            {/* Header */}
                                            <div className="text-center mb-8">
                                                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                                    Đăng Nhập
                                                </h1>
                                                <p className="text-slate-500 text-lg">Chào mừng bạn trở lại!</p>
                                            </div>

                                            {/* Form */}
                                            <form className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-slate-700 block">Email</label>
                                                    <input
                                                        type="email"
                                                        placeholder="Nhập email của bạn"
                                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200 hover:border-slate-300"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-slate-700 block">Mật khẩu</label>
                                                    <input
                                                        type="password"
                                                        placeholder="Nhập mật khẩu"
                                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200 hover:border-slate-300"
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="rememberMe"
                                                            type="checkbox"
                                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                                                        />
                                                        <label htmlFor="rememberMe" className="ml-2 text-sm text-slate-600">
                                                            Ghi nhớ đăng nhập
                                                        </label>
                                                    </div>
                                                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                                        Quên mật khẩu?
                                                    </a>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                                                >
                                                    Đăng Nhập
                                                </button>

                                                {/* Divider */}
                                                <div className="relative my-6">
                                                    <div className="absolute inset-0 flex items-center">
                                                        <div className="w-full border-t border-slate-200"></div>
                                                    </div>
                                                    <div className="relative flex justify-center text-sm">
                                                        <span className="px-4 bg-white text-slate-500">hoặc</span>
                                                    </div>
                                                </div>

                                                {/* Social Login */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        type="button"
                                                        className="flex items-center justify-center px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors duration-200"
                                                    >
                                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                                            <path
                                                                fill="#4285F4"
                                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                            />
                                                            <path
                                                                fill="#34A853"
                                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                            />
                                                            <path
                                                                fill="#FBBC05"
                                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                            />
                                                            <path
                                                                fill="#EA4335"
                                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                            />
                                                        </svg>
                                                        Google
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="flex items-center justify-center px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors duration-200"
                                                    >
                                                        <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                        </svg>
                                                        Facebook
                                                    </button>
                                                </div>
                                            </form>

                                            {/* Sign Up Link */}
                                            <div className="text-center mt-8 pt-6 border-t border-slate-200">
                                                <p className="text-slate-600">
                                                    Chưa có tài khoản?{" "}
                                                    <a
                                                        href="/admin/auth/sign_up"
                                                        className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700"
                                                    >
                                                        Đăng ký ngay
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side - Brand Section */}
                                    <div className="flex-1 relative bg-gradient-to-br from-white-600 via-purple-600 to-blue-800 p-8 lg:p-12 flex flex-col justify-center text-white">
                                        {/* Background Pattern */}
                                        <div className="absolute inset-0 opacity-10">
                                            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                                        </div>

                                        <div className="relative z-10 text-center lg:text-left">
                                            <div className="mb-8">
                                                <h2 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                                                    SUDES
                                                    <span className="block bg-gradient-to-r from-lime-200 to-orange-300 bg-clip-text text-transparent">
                                                        SPORT
                                                    </span>
                                                </h2>
                                                <div className="w-20 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full mx-auto lg:mx-0"></div>
                                            </div>

                                            <blockquote className="text-xl lg:text-2xl font-light leading-relaxed mb-8 italic">
                                                "Thời trang không chỉ là cách bạn mặc, mà là cách bạn khẳng định bản lĩnh."
                                            </blockquote>

                                            <div className="space-y-4 text-lg opacity-90">
                                                <div className="flex items-center justify-center lg:justify-start">
                                                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                                                    <span>Thương hiệu thể thao hàng đầu</span>
                                                </div>
                                                <div className="flex items-center justify-center lg:justify-start">
                                                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                                                    <span>Chất lượng được tin tưởng</span>
                                                </div>
                                                <div className="flex items-center justify-center lg:justify-start">
                                                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                                                    <span>Phong cách sống năng động</span>
                                                </div>
                                            </div>

                                            {/* Decorative Elements */}
                                            <div className="absolute top-10 right-10 w-20 h-20 border-2 border-white/20 rounded-full hidden lg:block"></div>
                                            <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full hidden lg:block"></div>
                                            <div className="absolute top-1/2 right-20 w-3 h-3 bg-yellow-300 rounded-full hidden lg:block"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <div className="mt-12 pt-8 border-t border-lime-700">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        </div>
                    </div>
                    {/* Footer */}
                    <footer className="bg-gradient-t text-black" >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                                {/* Logo and Introduction */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="flex items-center space-x-3">

                                        <img src="https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/logo_footer.png?1745145147644" alt="" />
                                    </div>
                                    <p className=" leading-relaxed max-w-md">
                                        Nhà bán lẻ & phân phối thương hiệu các mặt hàng về thể thao với chất lượng hàng đầu tại Việt Nam. Khẳng
                                        định phong cách sống năng động của bạn.
                                    </p>
                                    <div className="flex space-x-4">
                                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                                            <span className="text-white text-sm">f</span>
                                        </div>
                                        <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                                            <span className="text-white text-sm">@</span>
                                        </div>
                                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                                            <span className="text-white text-sm">in</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold mb-6  text-blue-900">LIÊN HỆ</h3>
                                    <div className="space-y-3 ">
                                        <div className="flex items-start space-x-3">
                                            <span className="text-blue-400 mt-1">📍</span>
                                            <span className="text-sm">Số 1 Trịnh Văn Bô, Bắc Từ Liêm, Hà Nội</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-blue-400">📞</span>
                                            <span className="text-sm">1900 6750</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-blue-400">💬</span>
                                            <span className="text-sm">036 1234 567</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-blue-400">✉️</span>
                                            <span className="text-sm">support@sapo.vn</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Policies */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold mb-6  text-blue-900">CHÍNH SÁCH</h3>
                                    <ul className="space-y-3 text-sm ">
                                        <li className="hover:text-blue-300 transition-colors cursor-pointer">Chính sách mua hàng</li>
                                        <li className="hover:text-blue-300 transition-colors cursor-pointer">Chính sách thanh toán</li>
                                        <li className="hover:text-blue-300 transition-colors cursor-pointer">Chính sách vận chuyển</li>
                                        <li className="hover:text-blue-300 transition-colors cursor-pointer">Chính sách bảo mật</li>
                                        <li className="hover:text-blue-300 transition-colors cursor-pointer">Cam kết cửa hàng</li>
                                    </ul>
                                </div>

                                {/* Guides */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold mb-6  text-blue-900">HƯỚNG DẪN</h3>
                                    <ul className="space-y-3 text-sm ">
                                        <li className="hover:text-blue-300 transition-colors cursor-pointer">Hướng dẫn mua hàng</li>
                                        <li className="hover:text-blue-300 transition-colors cursor-pointer">Hướng dẫn đổi trả</li>
                                        <li className="hover:text-blue-300 transition-colors cursor-pointer">Hướng dẫn chuyển khoản</li>
                                        <li className="hover:text-blue-300 transition-colors cursor-pointer">Kiểm tra đơn hàng</li>
                                    </ul>
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                )
}

                export default SignIn
