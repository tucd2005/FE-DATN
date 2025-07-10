import React from "react";

export default function ThuongHieuDongHanh() {
  const brands = [
    "https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo.png",
    "https://tongluc.com/wp-content/uploads/2023/06/PUMA-logo.jpeg",
    "https://censor.vn/wp-content/uploads/2022/03/logo-cac-hang-giay-noi-tieng-1.png",
    "https://tongluc.com/wp-content/uploads/2023/06/Under-Armour.jpeg",
    "https://tatthanh.com.vn/pic/Images/Module/News/images/image(1275).png",
    "https://ttagencyads.com/wp-content/uploads/2021/04/10-logo-thuong-hieu-giay-10.jpg",
    "https://trangnguyensport.com/wp-content/uploads/2017/06/victor-badminton-trang-nguyen-sport.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN82ZqyDLejOkgjK_Ve0yPVeREvxUeDc-jtA&s",
  ];

  return (
    <section data-aos="fade-up" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thương hiệu thể thao hàng đầu</h2>
          <p className="text-gray-600">Đối tác với những thương hiệu thể thao uy tín nhất thế giới</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center opacity-60">
          {brands.map((logo, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={logo}
                alt={`Brand ${index + 1}`}
                className="w-24 h-12 object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
