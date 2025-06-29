import React from "react";

export default function XuHuongTheThao() {
  const trends = [
    {
      title: "Running Tech",
      subtitle: "Công nghệ chạy bộ tiên tiến nhất",
      growth: "+65%",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
      title: "Athleisure Style",
      subtitle: "Phong cách thể thao hàng ngày",
      growth: "+48%",
      image: "https://images.unsplash.com/photo-1506629905607-d9c297d3f5f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
      title: "Sustainable Sports",
      subtitle: "Thể thao bền vững thân thiện môi trường",
      growth: "+72%",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    },
  ];

  return (
    <section data-aos="fade-up" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium rounded-full">
            Xu hướng thể thao
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thể thao đang hot</h2>
          <p className="text-gray-600">Cập nhật những xu hướng thể thao mới nhất và được ưa chuộng nhất hiện nay</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trends.map((trend, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
              <img data-aos="fade-up" src={trend.image} alt={trend.title} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <span className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 text-xs font-medium rounded">{trend.growth}</span>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">{trend.title}</h3>
                <p className="text-sm opacity-90">{trend.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-md font-medium">Khám phá xu hướng</button>
        </div>
      </div>
    </section>
  );
}
