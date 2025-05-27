import React from "react";

const SignUp: React.FC = () => {
    return (
        <div className="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500">
            {/* Navbar */}
            <div className="container sticky top-0 z-sticky">
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 flex-0">
                    </div>
                </div>
            </div>

            {/* Main Section */}
            <main className="mt-0 transition-all duration-200 ease-in-out">
                <section>
                    <div className="relative flex items-center min-h-screen bg-center bg-cover">
                        <div className="container z-1">
                            <div className="flex flex-wrap -mx-3">
                                <div className="flex flex-col w-full max-w-full px-3 mx-left md:w-7/12 lg:w-5/12 xl:w-4/12">
                                    <div className="relative flex flex-col border-0 shadow-none lg:py4 rounded-2xl bg-transparent">
                                        <div className="p-6 pb-0 mb-0">
                                            <h4 className="font-bold z-20 mt-12 text-white text-5xl">Đăng Ký</h4>
                                            <p className="mb-0">Tạo tài khoản mới của bạn ngay bây giờ</p>
                                        </div>
                                        <div className="flex-auto p-6">
                                            <form>
                                                <div className="mb-4">
                                                    <input type="text" placeholder="Username"
                                                        className="text-sm block w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-700 placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                                                </div>
                                                <div className="mb-4">
                                                    <input type="email" placeholder="Email"
                                                        className="text-sm block w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-700 placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                                                </div>
                                                <div className="mb-4">
                                                    <input type="password" placeholder="Password"
                                                        className="text-sm block w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-700 placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                                                </div>
                                                <div className="mb-4">
                                                    <input type="password" placeholder="Confirm Password"
                                                        className="text-sm block w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-700 placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                                                </div>
                                                <div className="flex items-center pl-12 mb-0.5">
                                                    <input id="agreeTerms" type="checkbox" className="h-5 w-10 cursor-pointer rounded-10 bg-zinc-700/10 border border-gray-200" />
                                                    <label htmlFor="agreeTerms" className="ml-2 text-sm text-slate-700">I agree to the Terms and Conditions</label>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit"
                                                        className="inline-block w-full px-16 py-3.5 mt-6 font-bold text-white bg-green-500 rounded-lg shadow-md hover:-translate-y-px hover:shadow-xs active:opacity-85 text-sm transition-all">
                                                        Đăng Ký
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="border-t border-black/12.5 p-6 text-center pt-0 px-1 sm:px-6">
                                            <p className="text-sm">Đã có tài khoản SUDES SPORT? <a href="/admin/auth/sign_in" className="font-semibold bg-clip-text text-transparent bg-gradient-to-tl from-blue-500 to-violet-500">Đăng Nhập</a></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 hidden w-6/12 h-full pr-0 lg:flex">
                                    <div className="relative flex flex-col justify-center h-full bg-cover px-24 m-4 overflow-hidden bg-[url('https://i.pinimg.com/736x/1c/29/06/1c29064b7243d9ee332fe1a81981d285.jpg')] rounded-xl">
                                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-green-500 to-blue-500 opacity-60"></span>
                                        <h4 className="z-20 mt-12 font-bold text-white text-5xl">SUDES SPORT</h4>
                                        <p className="z-20 text-white">"Thời trang không chỉ là cách bạn mặc, mà là cách bạn khẳng định bản lĩnh. Đừng chỉ chọn quần áo – hãy chọn phong cách sống."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12">
                <div className="container">
                    <div className="flex flex-wrap -mx-3 justify-center">
                        <div className="w-full text-center">
                            <div className="mb-6">
                                {["Company", "About Us", "Team", "Products", "Blog", "Pricing"].map((item, index) => (
                                    <a key={index} href="#" className="mx-4 text-slate-400">{item}</a>
                                ))}
                            </div>
                            <div className="mb-6">
                                {["dribbble", "twitter", "instagram", "pinterest", "github"].map((icon, index) => (
                                    <a key={index} href="#" className="mr-6 text-slate-400">
                                        <i className={`fab fa-${icon} text-lg`}></i>
                                    </a>
                                ))}
                            </div>
                            <p className="text-slate-400">
                                &copy; {new Date().getFullYear()} Argon Dashboard 2 by Creative Tim.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SignUp;
