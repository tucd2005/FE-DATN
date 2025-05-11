import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaShoppingBag,
} from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import { MdSupportAgent } from "react-icons/md";

const FooterClient = () => {
  return (
    <footer className="bg-white border-t border-lime-200 text-gray-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {/* Logo & Description */}
        <div className="col-span-2">
          <img
            src="https://i.imgur.com/lk3a1Vf.png"
            alt="Sudes Sport Logo"
            className="h-10 mb-4"
          />
          <p>
            Sudes Sport - Nhà bán lẻ & phân phối thương hiệu các mặt hàng về thể
            thao như giày chạy bộ, đồ bơi, kính bơi, giày thể thao, đồ tập gym,
            ... với chất lượng hàng đầu tại Việt Nam.
          </p>
          <div className="flex space-x-3 mt-4">
            <a href="#" className="text-blue-700 text-xl"><FaFacebookF /></a>
            <a href="#" className="text-pink-500 text-xl"><FaInstagram /></a>
            <a href="#" className="text-orange-500 text-xl"><SiShopee /></a>
            
            <a href="#" className="text-black text-xl"><FaTiktok /></a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-2 text-base">LIÊN HỆ</h3>
          <p><strong>Địa chỉ:</strong> Số 70 Lữ Gia, Phường 15, Quận 11, TP. Hồ Chí Minh</p>
          <p><strong>Điện thoại:</strong> 1900 6750</p>
          <p><strong>Zalo:</strong> 023 1234 567</p>
          <p><strong>Email:</strong> support@sapo.vn</p>
          <button className="mt-4 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded font-semibold flex items-center gap-2">
            <FaShoppingBag className="text-white" />
            Chuỗi cửa hàng Sudes Sport
          </button>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-bold mb-2 text-base">CHÍNH SÁCH</h3>
          <ul className="space-y-1">
            <li>Chính sách mua hàng</li>
            <li>Chính sách thanh toán</li>
            <li>Chính sách vận chuyển</li>
            <li>Chính sách bảo mật</li>
            <li>Cam kết cửa hàng</li>
            <li>Chính sách thành viên</li>
          </ul>
        </div>

        {/* Guides */}
        <div>
          <h3 className="font-bold mb-2 text-base">HƯỚNG DẪN</h3>
          <ul className="space-y-1">
            <li>Hướng dẫn mua hàng</li>
            <li>Hướng dẫn đổi trả</li>
            <li>Hướng dẫn chuyển khoản</li>
            <li>Hướng dẫn trả góp</li>
            <li>Hướng dẫn hoàn hàng</li>
            <li>Kiểm tra đơn hàng</li>
          </ul>
        </div>

        {/* Payments & Certification */}
        <div>
          <h3 className="font-bold mb-2 text-base">HỖ TRỢ THANH TOÁN</h3>
          <div className="grid grid-cols-3 gap-2">
            <img src="https://i.imgur.com/gN1dRNR.png" alt="momo" className="h-6" />
            <img src="https://i.imgur.com/AFqymFz.png" alt="zalo" className="h-6" />
            <img src="https://i.imgur.com/jtYGy8H.png" alt="vnpay" className="h-6" />
            <img src="https://i.imgur.com/MEn8UHO.png" alt="moca" className="h-6" />
            <img src="https://i.imgur.com/N1Ykqea.png" alt="visa" className="h-6" />
            <img src="https://i.imgur.com/hkRDNlB.png" alt="atm" className="h-6" />
          </div>

          <h3 className="mt-6 font-bold mb-2 text-base">ĐƯỢC CHỨNG NHẬN BỞI</h3>
          <img
            src="https://i.imgur.com/jMIz4X1.png"
            alt="certified"
            className="h-10"
          />
        </div>
      </div>
    </footer>
  );
};

export default FooterClient;
