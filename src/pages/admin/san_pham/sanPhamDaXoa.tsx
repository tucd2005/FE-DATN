import React from 'react'
import { Table, Button, Tag, Image,  } from 'antd'
import { useTrashedProducts, useRestoreProduct,  } from '../../../hooks/useProduct'
import { useListCategory as useCategoryList } from '../../../hooks/useCategory'
import type { Category } from '../../../types/categorys/category'

const TrashProductList = () => {
  const { data, isLoading } = useTrashedProducts()
  const products = Array.isArray(data) ? data : [] // ✅ fix lỗi some is not a function

  const { data: categories = [] } = useCategoryList()
  const restoreProduct = useRestoreProduct()

  const getCategoryName = (id: number): string => {
    const cat = categories.find((c: Category) => c.id === id)
    return cat?.ten || 'Không rõ'
  }
  console.log('🚮 Sản phẩm đã xoá:', products)

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">🗑️ Sản phẩm đã xoá</h2>

      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={products}
        pagination={{ pageSize: 10 }}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 60 },
          { title: 'Tên', dataIndex: 'ten', width: 200 },
          {
            title: 'Ảnh',
            dataIndex: 'hinh_anh',
            width: 100,
            align: 'center' as const,
            render: (img: string | null) => {
              let src = '/placeholder.png'
              if (img) {
                src = img.startsWith('http') ? img : `http://127.0.0.1:8000/storage/${img}`
              }
              return <Image src={src} width={60} height={60} />
            },
          },

          {
            title: 'SL',
            dataIndex: 'so_luong',
            render: (sl: number) => (
              <Tag color={sl > 0 ? 'green' : 'red'}>{sl > 0 ? `Còn ${sl}` : 'Hết hàng'}</Tag>
            ),
          },
          {
            title: 'Danh mục',
            dataIndex: 'danh_muc_id',
            render: (id: number) => (
              <Tag color="blue">{getCategoryName(id)}</Tag>
            ),
          },
          {
            title: 'Thời gian xóa',
            dataIndex: 'deleted_at',
            render: (date: string) => new Date(date).toLocaleString('vi-VN'),
          },
          {
            title: 'Khôi phục',
            render: (_: any, record: any) => (
              <Button
                type="primary"
                onClick={() => restoreProduct.mutate(record.id)}
                loading={restoreProduct.isPending}
              >
                Khôi phục
              </Button>
            ),
          },
         

        ]}
      />
    </div>
  )
}

export default TrashProductList

