import React from 'react'

import HeaderAdmin from "../../components/admin/layouts/HeaderAdmin"
import SidebarAdmin from "../../components/admin/layouts/SidebarAdmin"
import ProductTable from '../../components/admin/san_pham/TableProduct'
import FormEditDanhMuc from '../../components/admin/danh_muc/FormEditDanhMuc'
function EditDanhMuc() {
  return (
    <>
  <SidebarAdmin/>
     <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
     <HeaderAdmin/>
          <div className="min-h-screen  p-6 dark:bg-slate-900">
      <h1 className="mb-4 text-2xl font-bold text-white dark:text-gray-800 ">Chỉnh Sửa  Danh mục </h1>
      <FormEditDanhMuc />
    </div>
             
     </main>
  
    </>
  )
}

export default EditDanhMuc
