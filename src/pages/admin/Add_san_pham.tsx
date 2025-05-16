

import SidebarAdmin from "../../components/admin/layouts/SidebarAdmin"
import HeaderAdmin from "../../components/admin/layouts/HeaderAdmin"
import FormAddSanPham from "../../components/admin/san_pham/FormAdd"
function AddSanPham() {
  
  return (
    <>
    <SidebarAdmin/>
     <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <HeaderAdmin/>
         <div className="min-h-screen  p-6 dark:bg-slate-900">
      <h1 className="mb-4 text-2xl font-bold text-white dark:text-gray-800 ">Thêm sản phẩm</h1>
<FormAddSanPham/>
    </div>
           
     </main>
    </>
  )
}

export default AddSanPham
