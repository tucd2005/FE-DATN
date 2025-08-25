import React from "react";
import { Link } from "react-router-dom";

interface Props {
  products: any[];
}

// Hàm chuẩn hóa ảnh sản phẩm
const getImageUrl = (raw: any): string => {
  if (!raw) return "/placeholder.png";

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed[0].startsWith("http")
        ? parsed[0]
        : `http://127.0.0.1:8000/storage/${parsed[0]}`;
    }
    if (typeof parsed === "string") {
      return parsed.startsWith("http")
        ? parsed
        : `http://127.0.0.1:8000/storage/${parsed}`;
    }
  } catch {
    if (typeof raw === "string") {
      return raw.startsWith("http")
        ? raw
        : `http://127.0.0.1:8000/storage/${raw}`;
    }
  }

  return "/placeholder.png";
};

export default function SanPhamNoiBat({ products }: Props) {
  return (
    <section data-aos="fade-up" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Tiêu đề */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sản phẩm nổi bật
          </h2>
          <p className="text-gray-600">
            Những sản phẩm thể thao được yêu thích nhất với công nghệ tiên tiến
            và chất lượng cao
          </p>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, index) => {
            const variant = product.variants?.[0];
            const originalPrice = variant?.gia ? Number(variant.gia) : 0;
            const discountPrice = variant?.gia_khuyen_mai
              ? Number(variant.gia_khuyen_mai)
              : 0;

            const price = discountPrice > 0 ? discountPrice : originalPrice;
            const discount =
              discountPrice > 0
                ? `-${Math.round(
                    ((originalPrice - discountPrice) / originalPrice) * 100
                  )}%`
                : null;

            // 👉 Chỉ lấy ảnh từ product.hinh_anh
            const src = getImageUrl(product.hinh_anh);

            return (
              <div
                key={index}
                className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Hình ảnh sản phẩm */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="aspect-square bg-gray-100 overflow-hidden rounded-lg">
                    <img
                      src={src}
                      alt={product.ten}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-medium rounded">
                    Hot
                  </span>
                  {discount && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                      {discount}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Link
                      to={`/san-pham/${product.id}`}
                      className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <button className="bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-md shadow-lg text-sm font-medium">
                        Xem chi tiết
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.ten}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-blue-600">
                        {price.toLocaleString()}đ
                      </span>
                      {discountPrice > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          {originalPrice.toLocaleString()}đ
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nút xem tất cả */}
        <div className="text-center mt-12">
          <Link to="/san-pham">
            <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-md font-medium">
              Xem tất cả sản phẩm
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
