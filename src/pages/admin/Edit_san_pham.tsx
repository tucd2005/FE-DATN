

import SidebarAdmin from "../../components/admin/layouts/SidebarAdmin"
import HeaderAdmin from "../../components/admin/layouts/HeaderAdmin"
import FormEditSanPham from "../../components/admin/san_pham/FormEdit"
function EditSanPham() {
  
  return (
    <>


    <SidebarAdmin/>
     <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <HeaderAdmin/>
         <div className="min-h-screen  p-6 dark:bg-slate-900">
      <h1 className="mb-4 text-2xl font-bold text-white dark:text-gray-800 ">Chỉnh sửa sản phẩm</h1>
<FormEditSanPham/>
    </div>
           
     </main>
    </>
  )
}

export default EditSanPham
