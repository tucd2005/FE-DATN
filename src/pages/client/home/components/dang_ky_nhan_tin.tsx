import React from "react";
import { Link } from "react-router-dom";

export default function DangKyNhanTin() {
  return (
    <section data-aos="fade-up" className="py-16 bg-gradient-to-r from-blue-500 to-green-500">
      <div className="container mx-auto px-4 text-center">
        <span className="inline-block mb-4 px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-full">
          Ưu đãi thể thao
        </span>
        <h2 className="text-4xl font-bold text-white mb-4">Đăng ký nhận tin & Giảm 30%</h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Đăng ký để nhận thông tin về sản phẩm thể thao mới, tips tập luyện và các ưu đãi độc quyền
        </p>

        {/* Nút đăng ký canh giữa + link sang /register */}
        <div className="flex justify-center mb-8">
          <Link
            to="/register"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-transform transform hover:scale-105"
          >
            Đăng ký ngay
          </Link>
        </div>

        <p className="text-white/70 text-sm">
          Bằng cách đăng ký, bạn đồng ý với{" "}
          <a href="#" className="underline hover:no-underline">
            điều khoản dịch vụ
          </a>{" "}
          của chúng tôi
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-white">
          {[
            { label: "100K+", text: "Vận động viên" },
            { label: "1000+", text: "Sản phẩm" },
            { label: "98%", text: "Hài lòng" },
            { label: "24/7", text: "Hỗ trợ" },
          ].map((item, i) => (
            <div key={i}>
              <div className="text-3xl font-bold">{item.label}</div>
              <div className="text-white/80">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
