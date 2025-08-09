import Slider from "react-slick";
import { Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useReviews } from "../../../../hooks/useReview";

export default function CamNhanKhachHang({ productId }: { productId: number }) {
  const { data, isLoading, isError } = useReviews(productId);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  if (isLoading) return <p className="text-center">Đang tải...</p>;
  if (isError) return <p className="text-center text-red-500">Không thể tải đánh giá</p>;
  if (!data || data.length === 0) return null;

  return (
    <section data-aos="fade-up" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 capitalize">Cảm nhận khách hàng</h2>
          <p className="text-gray-600">Khách hàng nói gì về sản phẩm và dịch vụ của chúng tôi</p>
        </div>
        <Slider {...settings}>
          {data.map((review: any, idx: number) => (
            <div key={idx} className="px-2">
              <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <img
                    src={review.user?.avatar || "/default-avatar.png"}
                    alt={review.user?.name || "Khách hàng"}
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.user?.name || "Ẩn danh"}</h3>
                    <p className="text-gray-500 text-sm">{review.role || "Khách hàng"}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {Array.from({ length: review.so_sao || 0 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic">“{review.noi_dung}”</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
