import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import HeaderAdmin from "../../components/admin/layouts/HeaderAdmin"
import SidebarAdmin from "../../components/admin/layouts/SidebarAdmin"
import ProductTable from '../../components/admin/san_pham/TableProduct'

function QuanLySanPham() {
  useEffect(() => {
    AOS.init({
      duration: 1000,      // thời gian animation
      once: true           // chỉ chạy 1 lần
    });
  }, []);

  return (
    <>
      <SidebarAdmin />
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <HeaderAdmin />

        <div className="min-h-screen p-6 dark:bg-slate-900">
          {/* 👇 Thêm hiệu ứng AOS cho tiêu đề */}
          <h1 
            className="mb-4 text-2xl font-bold text-white dark:text-gray-800" 
            data-aos="fade-right"
          >
            Quản lý sản phẩm
          </h1>

          {/* 👇 Có thể thêm hiệu ứng cho bảng nếu muốn */}
          <div data-aos="fade-up" data-aos-delay="200">
            <ProductTable />
          </div>
        </div>
      </main>
    </>
  )
}

export default QuanLySanPham
