import React from 'react'

import HeaderAdmin from "../../../components/admin/layouts/HeaderAdmin"
import SidebarAdmin from "../../../components/admin/layouts/SidebarAdmin"

import { message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { useOne, useUpdate } from '../../../hooks/useCategory'
import EditCategoryForm from '../../../components/admin/danh_muc/FormEditDanhMuc'
function EditDanhMuc() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: category, isLoading } = useOne({ resource: "categories", id });
  const { mutate: updateCategory } = useUpdate({ resource: "categories" });

  const handleFinish = (values: any) => {
    updateCategory(
      { id, values },
      {
        onSuccess: () => {
          
          navigate("/admin/categorys"); // chuyển về trang danh sách
        },
        onError: () => {
          message.error("Cập nhật thất bại");
        },
      }
    );
  };

  const handleCancel = () => {
    navigate("/admin/categories");
  };

  if (isLoading) return <p>Đang tải dữ liệu...</p>;

  return (
    <>
  <SidebarAdmin/>
     <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
     <HeaderAdmin/>
          <div className="min-h-screen  p-6 dark:bg-slate-900">
      <h1 className="mb-4 text-2xl font-bold text-white dark:text-gray-800 ">Chỉnh Sửa  Danh mục </h1>
      <EditCategoryForm
          initialValues={category}
          onFinish={handleFinish}
          onCancel={handleCancel}
        />
    </div>
             
     </main>
  
    </>
  )
}

export default EditDanhMuc


