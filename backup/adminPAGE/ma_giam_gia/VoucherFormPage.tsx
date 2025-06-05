// pages/admin/vouchers/VoucherFormPage.tsx
import React from 'react';
import VoucherForm from '../../../components/admin/ma_giam_gia/VoucherForm';
import HeaderAdmin from '../../../components/admin/layouts/HeaderAdmin';
import SidebarAdmin from '../../../components/admin/layouts/SidebarAdmin';

const VoucherFormPage = () => {
  return (
    <>
    <SidebarAdmin />
    <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
      <HeaderAdmin />
      <div className="min-h-screen p-6 dark:bg-slate-900">
      <h1 
          className="mb-4 text-2xl font-bold text-white dark:text-gray-800" 
      
        >DANH SÁCH MÃ GIẢM GIÁ</h1>
     
        <VoucherForm/>
        
      </div>
    </main>
  </>
  );
};

export default VoucherFormPage;
