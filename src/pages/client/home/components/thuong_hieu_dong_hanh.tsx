import React from "react";

export default function ThuongHieuDongHanh() {
  return (
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
  );
}
