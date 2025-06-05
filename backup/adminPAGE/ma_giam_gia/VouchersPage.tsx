import React from 'react';

import { useNavigate } from 'react-router-dom';

import HeaderAdmin from '../../../components/admin/layouts/HeaderAdmin';
import SidebarAdmin from '../../../components/admin/layouts/SidebarAdmin';
import VoucherTable from '../../../components/admin/ma_giam_gia/VoucherTable';
import type { Voucher } from '../../../src/types/voucher/voucher';

const mockData: Voucher[] = [
  {
    id: 1,
    name: 'Giảm 40%',
    code: 'VOUCHER40',
    discountPercent: 40,
    maxDiscount: 20000,
    quantity: 50,
    description: 'Giảm giá 40% cho đơn hàng từ 100K',
    startDate: '2025-03-31T00:00:00',
    endDate: '2025-04-01T00:00:00',
    createdAt: '2025-03-31T19:27:05',
    updatedAt: '2025-04-03T21:01:07',
  },
];

const VouchersPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <SidebarAdmin />
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <HeaderAdmin />
        <div className="min-h-screen p-6 dark:bg-slate-900">
          <h1
            className="mb-4 text-2xl font-bold text-white dark:text-gray-800"

          >DANH SÁCH MÃ GIẢM GIÁ</h1>

          <VoucherTable
            data={mockData}
            onEdit={(voucher) => navigate(`/admin/vouchers/edit/${voucher.id}`)}
          />
        </div>
      </main>
    </>
  );
};

export default VouchersPage;
