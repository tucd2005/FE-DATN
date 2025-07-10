import React from "react";
import { Shirt, ShoppingBag, Backpack, Tag, Award, Glasses } from "lucide-react";

export default function DanhMuc() {
  const categories = [
    { icon: Shirt, name: "Áo thể thao", count: "450 sản phẩm", color: "bg-blue-100 text-blue-600" },
    { icon: ShoppingBag, name: "Giày thể thao", count: "320 sản phẩm", color: "bg-green-100 text-green-600" },
    { icon: Backpack, name: "Balo & túi", count: "150 sản phẩm", color: "bg-yellow-100 text-yellow-600" },
    { icon: Glasses, name: "Kính thể thao", count: "120 sản phẩm", color: "bg-red-100 text-red-600" },
    { icon: Tag, name: "Phụ kiện", count: "180 sản phẩm", color: "bg-purple-100 text-purple-600" },
    { icon: Award, name: "Thời trang top", count: "90 sản phẩm", color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <section data-aos="fade-up" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Danh mục thể thao</h2>
          <p className="text-gray-600">Khám phá các danh mục đồ thể thao đa dạng cho mọi hoạt động và phong cách</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
              <div className="p-6 text-center">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
