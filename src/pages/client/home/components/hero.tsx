import React from "react";

export default function Hero() {
  return (
    <section data-aos="fade-up" className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-lg">
            <span data-aos="fade-right" data-aos-delay="100" className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium rounded-full">
              Bộ sưu tập thể thao 2024
            </span>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              <span data-aos="fade-right" data-aos-delay="200">Thể thao</span><br />
              <span data-aos="fade-right" data-aos-delay="300" className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Chuyên nghiệp</span><br />
              <span data-aos="fade-right" data-aos-delay="400">Phong cách</span>
            </h1>
            <p data-aos="fade-right" data-aos-delay="500" className="text-gray-600 text-lg mb-8">
              Khám phá bộ sưu tập đồ thể thao cao cấp với công nghệ tiên tiến, chất liệu thoáng khí và thiết kế năng động.
            </p>
            <div className="flex space-x-4">
              <button data-aos="zoom-in" data-aos-delay="600" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors">Mua sắm ngay</button>
              <button data-aos="zoom-in" data-aos-delay="700" className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-md font-medium transition-colors">Xem bộ sưu tập</button>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="relative">
              <img data-aos="zoom-in-up" data-aos-delay="400" src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=500&amp;h=500&amp;q=80" alt="Woman exercising" className="rounded-lg shadow-lg w-[750px] h-[550px] object-cover -translate-x-6" />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">40% GIẢM GIÁ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
