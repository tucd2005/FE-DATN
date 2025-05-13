import React from 'react'

import HeaderAdmin from "../../components/admin/HeaderAdmin"
import SidebarAdmin from "../../components/admin/SidebarAdmin"
import TableCategory from '../../components/admin/TableCategory'
function QuanLyDanhMuc() {
  return (
    <>
  <SidebarAdmin/>
     <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
     <HeaderAdmin/>
          <div className="min-h-screen  p-6 dark:bg-slate-900">
      <h1 className="mb-4 text-2xl font-bold text-white dark:text-gray-800 ">Quản lý Danh mục </h1>
      <TableCategory />
    </div>
             
     </main>
  
    </>
  )
}

export default QuanLyDanhMuc
