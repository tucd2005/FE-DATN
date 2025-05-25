// app/(admin)/sizes/SizeListPage.tsx
import React, { useState } from "react";
import SizeTable from "../../../components/admin/size/table_size";

import SidebarAdmin from "../../../components/admin/layouts/SidebarAdmin";
import HeaderAdmin from "../../../components/admin/layouts/HeaderAdmin";


const SizeListPage = () => {
  const [sizes] = useState([
    { id: 1, name: "M", createdAt: "04/04/2025", updatedAt: "04/04/2025" },
    { id: 2, name: "L", createdAt: "04/04/2025", updatedAt: "04/04/2025" },
    { id: 3, name: "XL", createdAt: "04/04/2025", updatedAt: "04/04/2025" },
    { id: 4, name: "29", createdAt: "04/04/2025", updatedAt: "04/04/2025" },
    { id: 5, name: "30", createdAt: "04/04/2025", updatedAt: "04/04/2025" },
    { id: 6, name: "31", createdAt: "04/04/2025", updatedAt: "04/04/2025" },
  ]);

  return (
    <>
      <SidebarAdmin />
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <HeaderAdmin />

        <div className="min-h-screen p-6 dark:bg-slate-900">
            
          {/* 👇 Thêm hiệu ứng AOS cho tiêu đề */}
          <h1 
            className="mb-4 text-2xl font-bold text-white dark:text-gray-800" 
        
          >
            Quản lý size
          </h1>

          {/* 👇 Có thể thêm hiệu ứng cho bảng nếu muốn */}
          <SizeTable sizes={sizes} />
         
        </div>
      </main>
    </>
  );
};

export default SizeListPage;
