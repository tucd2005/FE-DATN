import React from 'react'
import TablesProduct from "../../components/admin/TableProduct"
import HeaderAdmin from "../../components/admin/HeaderAdmin"
import SidebarAdmin from "../../components/admin/SidebarAdmin"




function QuanLiSanPham() {
  
  return (
    <>
  <SidebarAdmin/>
     <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
     <HeaderAdmin/>
       
            <TablesProduct/>  
     </main>
    </>
  )
}

export default QuanLiSanPham
