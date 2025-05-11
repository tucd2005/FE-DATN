

import SidebarAdmin from "../../components/admin/SidebarAdmin"
import HeaderAdmin from "../../components/admin/HeaderAdmin"
import FormEditSanPham from "../../components/admin/FormEdit"
function EditSanPham() {
  
  return (
    <>


    <SidebarAdmin/>
     <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <HeaderAdmin/>
           <FormEditSanPham/>
     </main>
    </>
  )
}

export default EditSanPham
