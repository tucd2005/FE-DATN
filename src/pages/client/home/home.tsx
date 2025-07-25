// src/pages/client/home/HomeClient.tsx
import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useProducts } from '../../../hooks/useProduct';
import XuHuongTheThao from "./components/xu_huong_the_thao";
import DangKyNhanTin from "./components/dang_ky_nhan_tin";
import CamNhanKhachHang from "./components/danh_gia";
import DanhMuc from "./components/danh_muc";
import Hero from "./components/hero";
import SanPhamNoiBat from "./components/san_pham_noi_bat";
import ThietBiChuyenNghiep from "./components/thiet_bi_chuyen_nghiep";
import ThuongHieuDongHanh from "./components/thuong_hieu_dong_hanh";
import ChatBot from "./components/chat_bot";


export default function HomeClient() {
  const { data: products, isLoading, isError } = useProducts();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (isLoading) {
    return <div className="text-center py-12">Đang tải sản phẩm...</div>;
  }

  if (isError) {
    return <div className="text-center py-12 text-red-500">Không thể tải sản phẩm. Vui lòng thử lại.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <DanhMuc />
      <SanPhamNoiBat products={products} />
      <XuHuongTheThao />
      <ThuongHieuDongHanh />
      <ThietBiChuyenNghiep />
      <DangKyNhanTin />
      <CamNhanKhachHang />
      <ChatBot />
    </div>
  );
}
