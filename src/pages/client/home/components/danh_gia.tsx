import React from "react";
import { Star } from "lucide-react"; // import icon sao

export default function CamNhanKhachHang() {
  const feedbacks = [
    {
      name: "Nguyễn Văn A",
      role: "Vận động viên marathon",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Sản phẩm thể thao ở đây thực sự chất lượng, dịch vụ tuyệt vời và giao hàng nhanh chóng. Tôi rất hài lòng và sẽ tiếp tục ủng hộ!",
      rating: 5,
    },
    {
      name: "Trần Thị B",
      role: "Huấn luyện viên yoga",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Thiết kế tinh tế, chất liệu bền đẹp và hỗ trợ vận động thoải mái. Đây là lựa chọn hoàn hảo cho những ai đam mê thể thao.",
      rating: 5,
    },
    {
      name: "Phạm Văn C",
      role: "Gymer chuyên nghiệp",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      text: "Tôi thích nhất bộ sưu tập Gym Workout, cảm giác mặc lên tự tin và thoải mái. Nhân viên tư vấn rất nhiệt tình nữa!",
      rating: 5,
    },
  ];

  return (
    <section data-aos="fade-up" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Cảm nhận khách hàng</h2>
          <p className="text-gray-600">Khách hàng nói gì về sản phẩm và dịch vụ của chúng tôi</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feedbacks.map((fb, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={fb.image}
                  alt={fb.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{fb.name}</h3>
                  <p className="text-gray-500 text-sm">{fb.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {Array.from({ length: fb.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic">“{fb.text}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
