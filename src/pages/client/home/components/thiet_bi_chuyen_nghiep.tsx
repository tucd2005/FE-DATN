import React from "react";

export default function ThietBiChuyenNghiep() {
  const collections = [
    {
      title: "Running Performance",
      subtitle: "Trang phục chạy bộ chuyên nghiệp",
      tags: ["Áo thun Dri-FIT", "Quần short", "Giày chạy", "Đồng hồ thể thao"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    },
    {
      title: "Gym Workout",
      subtitle: "Bộ đồ tập gym hiệu quả",
      tags: ["Tank top", "Quần legging", "Giày training", "Găng tay"],
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    },
    {
      title: "Outdoor Adventure",
      subtitle: "Trang phục thể thao ngoài trời",
      tags: ["Áo khoác", "Quần dài", "Giày hiking", "Ba lô"],
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    },
  ];

  return (
    <section data-aos="fade-up" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block mb-4 px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-full">Sport Collection 2024</span>
          <h2 className="text-3xl font-bold text-white mb-4">Phối đồ thể thao chuyên nghiệp</h2>
          <p className="text-gray-300">Khám phá cách phối đồ thể thao hoàn hảo cho từng hoạt động với những gợi ý từ chuyên gia</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((item, idx) => (
            <div key={idx} className="relative h-96 rounded-2xl overflow-hidden group cursor-pointer">
              <img data-aos="fade-up" src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute top-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/90 text-sm mb-4">{item.subtitle}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/20 text-white border border-white/30 hover:bg-white/30 text-xs rounded-full transition-colors">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <button className="w-full bg-white text-gray-900 hover:bg-gray-100 py-3 rounded-md font-medium transition-colors">Xem bộ sưu tập</button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-md font-medium transition-colors">Xem toàn bộ bộ sưu tập</button>
        </div>
      </div>
    </section>
  );
}
