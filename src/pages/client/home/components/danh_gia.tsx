import Slider from "react-slick";
import { Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CamNhanKhachHang() {
  const feedbacks = [
    {
      name: "Phương Hà Xinh Gái",
      role: "Tester",
      image: "https://anh.24h.com.vn/upload/3-2013/images/2013-09-05/1378349411-1208936_527696177306287_1635505709_n.jpg",
      text: "Sản phẩm thể thao ở đây thực sự chất lượng, dịch vụ tuyệt vời và giao hàng nhanh chóng. Tôi rất hài lòng và sẽ tiếp tục ủng hộ!",
      rating: 5,
    },
    {
      name: "Xinh Gái Phương Hà",
      role: "Backend Dev",
      image: "https://anh.24h.com.vn/upload/3-2013/images/2013-09-05/1378349411-1208936_527696177306287_1635505709_n.jpg",
      text: "Thiết kế tinh tế, chất liệu bền đẹp và hỗ trợ vận động thoải mái. Đây là lựa chọn hoàn hảo cho những ai đam mê thể thao.",
      rating: 5,
    },
    {
      name: "Hà Gái Phương Xinh",
      role: "Designer",
      image: "https://anh.24h.com.vn/upload/3-2013/images/2013-09-05/1378349411-1208936_527696177306287_1635505709_n.jpg",
      text: "Tôi thích nhất bộ sưu tập Gym Workout, cảm giác mặc lên tự tin và thoải mái. Nhân viên tư vấn rất nhiệt tình nữa!",
      rating: 5,
    },
    {
      name: "Hà Gái Xinh Phương",
      role: "Backend Dev",
      image: "https://anh.24h.com.vn/upload/3-2013/images/2013-09-05/1378349411-1208936_527696177306287_1635505709_n.jpg",
      text: "Tôi thích nhất bộ sưu tập Gym Workout, cảm giác mặc lên tự tin và thoải mái. Nhân viên tư vấn rất nhiệt tình nữa!",
      rating: 5,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section data-aos="fade-up" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 capitalize">Cảm nhận khách hàng</h2>
          <p className="text-gray-600">Khách hàng nói gì về sản phẩm và dịch vụ của chúng tôi</p>
        </div>
        <Slider {...settings}>
          {feedbacks.map((hacute, xnxx) => (
            <div key={xnxx} className="px-2">
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <img
                    src={hacute.image}
                    alt={hacute.name}
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{hacute.name}</h3>
                    <p className="text-gray-500 text-sm">{hacute.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {Array.from({ length: hacute.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic">“{hacute.text}”</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}