import { useEffect, useState } from "react";
import Slider from "react-slick";
import instanceAxios from "../../../../utils/axios";

type TBanner = {
  id: number;
  tieu_de: string;
  hinh_anh: string;
  trang_thai: string;
}

export default function Hero() {
  const [banners, setBanners] = useState<TBanner[]>([]);

  useEffect(() => {
    const getBanners = async () => {
      try {
        const { data } = await instanceAxios.get('/banner');
        console.log("Fetched banners:", data);
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    }
    getBanners();
  }, []);


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
        {banners?.map((slide, index) => (
          <div key={index}>
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 max-w-lg">
                  <span data-aos="fade-right" data-aos-delay="100" className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium rounded-full">
                    Bộ sưu tập thể thao 2024
                  </span>
                  <h1 className="text-5xl font-bold text-gray-900 mb-4">
                    <span data-aos="fade-right" data-aos-delay="200">{slide.tieu_de}</span><br />
                  </h1>
                  <div className="flex space-x-4">
                    <button data-aos="zoom-in" data-aos-delay="600" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors">Mua sắm ngay</button>
                    <button data-aos="zoom-in" data-aos-delay="700" className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-md font-medium transition-colors">Xem bộ sưu tập</button>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="relative">
                    <img data-aos="zoom-in-up" data-aos-delay="400" src={slide.hinh_anh} alt={slide.tieu_de} className="rounded-lg shadow-lg w-[750px] h-[550px] object-cover -translate-x-6" />
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
