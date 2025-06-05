
import SidebarAdmin from "../../../components/admin/layouts/SidebarAdmin"
import HeaderAdmin from "../../../components/admin/layouts/HeaderAdmin"
import FormAddSize from "../../../components/admin/size/form_add"
function SizeAddPage() {
  
  return (
    <>
    <SidebarAdmin/>
     <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <HeaderAdmin/>
         <div className="min-h-screen  p-6 dark:bg-slate-900">
      <h1 className="mb-4 text-2xl font-bold text-white dark:text-gray-800 ">Thêm  mới kích cỡ</h1>
<FormAddSize/>
    </div>  
           
     </main>
    </>
  )
}

export default SizeAddPage

