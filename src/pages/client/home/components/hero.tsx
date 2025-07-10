import React from "react";
import Slider from "react-slick";

export default function Hero() {
  const slides = [
    {
      title1: "Thể thao",
      title2: "Chuyên nghiệp",
      title3: "Phong cách",
      subtitle: "Khám phá bộ sưu tập đồ thể thao cao cấp với công nghệ tiên tiến, chất liệu thoáng khí và thiết kế năng động.",
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=750&q=80",
      badge: "40% GIẢM GIÁ"
    },
    {
      title1: "Khỏe mạnh",
      title2: "Bền bỉ",
      title3: "Năng động",
      subtitle: "Sẵn sàng bứt phá mọi giới hạn cùng thiết kế thể thao hiện đại.",
      img: "https://images.unsplash.com/photo-1594737625785-cf0de8bfa36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=750&q=80",
      badge: "NEW"
    },
    {
      title1: "Thời trang",
      title2: "Đẳng cấp",
      title3: "Hiện đại",
      subtitle: "Phong cách thể thao kết hợp cùng xu hướng thời trang mới nhất.",
      img: "https://images.unsplash.com/photo-1600180758890-6ecb207b55ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=750&q=80",
      badge: "HOT"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,          // thời gian chuyển slide (0.8 giây)
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // 4 giây chuyển slide
    arrows: false
  };

  return (
    <section data-aos="fade-up" className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 max-w-lg">
                  <span data-aos="fade-right" data-aos-delay="100" className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium rounded-full">
                    Bộ sưu tập thể thao 2024
                  </span>
                  <h1 className="text-5xl font-bold text-gray-900 mb-4">
                    <span data-aos="fade-right" data-aos-delay="200">{slide.title1}</span><br />
                    <span data-aos="fade-right" data-aos-delay="300" className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">{slide.title2}</span><br />
                    <span data-aos="fade-right" data-aos-delay="400">{slide.title3}</span>
                  </h1>
                  <p data-aos="fade-right" data-aos-delay="500" className="text-gray-600 text-lg mb-8">
                    {slide.subtitle}
                  </p>
                  <div className="flex space-x-4">
                    <button data-aos="zoom-in" data-aos-delay="600" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors">Mua sắm ngay</button>
                    <button data-aos="zoom-in" data-aos-delay="700" className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-md font-medium transition-colors">Xem bộ sưu tập</button>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="relative">
                    <img data-aos="zoom-in-up" data-aos-delay="400" src={slide.img} alt={slide.title1} className="rounded-lg shadow-lg w-[750px] h-[550px] object-cover -translate-x-6" />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">{slide.badge}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
