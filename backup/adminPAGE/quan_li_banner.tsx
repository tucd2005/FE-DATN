import React from 'react'
import SidebarAdmin from '../../components/admin/layouts/SidebarAdmin'
import HeaderAdmin from '../../components/admin/layouts/HeaderAdmin'
import Banner from '../../components/admin/banner/Banner'

const QuanLiBanner = () => {
  return (
    <div><>
    <SidebarAdmin/>
       <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
       <HeaderAdmin/>
            <div className="min-h-screen  p-6 dark:bg-slate-900">
        <h1 className="mb-4 text-2xl font-bold text-white dark:text-gray-800 ">Quản lý sản phẩm</h1>
        <Banner />
      </div>
               
       </main>
    
      </></div>
  )
}

export default QuanLiBanner