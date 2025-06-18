"use client"

import { Home, Search, ArrowLeft, Frown } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-blue-100 -z-10 blur-sm">404</div>
        </div>

        {/* Sad Icon */}
        <div className="mb-6">
          <Frown className="w-16 h-16 mx-auto text-gray-400 animate-bounce" />
        </div>

        {/* Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Oops! Trang không tồn tại</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            Trang bạn đang tìm kiếm có thể đã được di chuyển, xóa hoặc không bao giờ tồn tại.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href="/"
            className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Về trang chủ
          </a>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center border-2 border-gray-300 hover:border-blue-500 px-8 py-3 rounded-full transition-all duration-300 hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại
          </button>
        </div>

        {/* Suggestion */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-700">Thử tìm kiếm thứ khác?</h3>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <a
              href="/about"
              className="inline-block bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            >
              Về chúng tôi
            </a>
            <a
              href="/contact"
              className="inline-block bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            >
              Liên hệ
            </a>
            <a
              href="/blog"
              className="inline-block bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            >
              Blog
            </a>
            <a
              href="/help"
              className="inline-block bg-orange-100 hover:bg-orange-200 text-orange-800 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            >
              Trợ giúp
            </a>
          </div>
        </div>

        {/* Bóng trang trí */}
        <div className="relative">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-10 right-10 w-6 h-6 bg-yellow-300 rounded-full opacity-40 animate-bounce delay-500"></div>
          <div className="absolute bottom-10 left-10 w-4 h-4 bg-pink-300 rounded-full opacity-40 animate-bounce delay-700"></div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-8">
          Nếu bạn nghĩ đây là lỗi, vui lòng{" "}
          <a
            href="/contact"
            className="text-blue-600 hover:text-blue-800 underline font-medium"
          >
            liên hệ với chúng tôi
          </a>
        </p>
      </div>
    </div>
  )
}
