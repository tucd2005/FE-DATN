import React, { useState } from 'react';
import SidebarAdmin from '../../../components/admin/layouts/SidebarAdmin';
import HeaderAdmin from '../../../components/admin/layouts/HeaderAdmin';
import ProductInfo from '../../../components/admin/san_pham/ProductInfo';
import VariantTable from '../../../components/admin/san_pham/VariantTable';

const ProductDetailPage = () => {
  const [product] = useState({
    name: 'Quần kaki Nam Cotton Slim fit AKK02107',
    shortDesc: 'Mã rút gọn: AKK02107 Form Dáng: Slim Fit...',
    description: 'Thiết kế lịch sự, tôn dáng...',
    price: 400000,
    category: 'Quần',
    status: 'Mở bán',
    updatedAt: '25/03/2025 15:08:45',
    variants: [
      {
        id: 1,
        image: 'https://example.com/img1.jpg',
        size: '29',
        color: 'Be',
        colorCode: '#f5deb3',
        quantity: 36,
        status: 'Mở bán',
      },
      {
        id: 2,
        image: 'https://example.com/img2.jpg',
        size: '30',
        color: 'Đen',
        colorCode: '#000000',
        quantity: 31,
        status: 'Mở bán',
      },
    ],
  });

  const handleEdit = (id: number) => {
    console.log('Sửa biến thể', id);
  };

  const handleStop = (id: number) => {
    console.log('Dừng bán biến thể', id);
  };

  return (
    <>
      <SidebarAdmin />
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <HeaderAdmin />
        <div className="min-h-screen p-6 dark:bg-slate-900">
          <h1 className="mb-4 text-2xl font-bold text-white dark:text-gray-800">
            Chi tiết sản phẩm
          </h1>
          <div className="space-y-6">
            <ProductInfo product={product} />
            <VariantTable
              variants={product.variants}
              onEdit={handleEdit}
              onStop={handleStop}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetailPage;
