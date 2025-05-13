import React from 'react'

import HeaderAdmin from "../../components/admin/HeaderAdmin"
import SidebarAdmin from "../../components/admin/SidebarAdmin"

import FormAddDanhMuc from '../../components/admin/FormAddDanhMuc'
function AddDanhMuc() {
  return (
    <>
  <SidebarAdmin/>
     <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
     <HeaderAdmin/>
          <div className="min-h-screen  p-6 dark:bg-slate-900">
      <h1 className="mb-4 text-2xl font-bold text-white dark:text-gray-800 ">Thêm danh mục </h1>
      <FormAddDanhMuc />
    </div>
             
     </main>
  
    </>
  )
}

export default AddDanhMuc
