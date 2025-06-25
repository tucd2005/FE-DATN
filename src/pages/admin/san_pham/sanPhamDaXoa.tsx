import React from 'react'
import { Table, Button, Tag, Image, Popconfirm } from 'antd'
import { useTrashedProducts, useRestoreProduct, useForceDeleteProduct } from '../../../hooks/useproduct'
import { useListCategory as useCategoryList } from '../../../hooks/useCategory'
import { formatCurrency } from '../../../utils/formatCurrency'
import type { Category } from '../../../types/categorys/category'

const TrashProductList = () => {
  const { data, isLoading } = useTrashedProducts()
  const products = Array.isArray(data) ? data : [] // ✅ fix lỗi some is not a function
  const forceDeleteProduct = useForceDeleteProduct()

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
            render: (img: string[] | string | null) => {
              let src = '/placeholder.png'
              if (Array.isArray(img) && img.length > 0) src = img[0]
              else if (typeof img === 'string' && img !== '') src = img
              return <Image src={src} width={60} />
            },
          },
          {
            title: 'Giá',
            dataIndex: 'gia',
            width: 110,
            align: 'right',
            render: (value: string) => (
              <span className="text-green-600 font-semibold">
                {formatCurrency(value)}
              </span>
            ),
          },
          {
            title: 'KM',
            dataIndex: 'gia_khuyen_mai',
            width: 110,
            align: 'right',
            render: (value: string) =>
              value && value !== '0' ? (
                <Tag color="volcano">{formatCurrency(value)}</Tag>
              ) : (
                <Tag color="default">Không KM</Tag>
              ),
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
          {
            title: 'Xoá thật',
            render: (_: any, record: any) => (
              <Popconfirm
                title="Bạn chắc chắn muốn xoá vĩnh viễn sản phẩm này?"
                okText="Xoá thật"
                cancelText="Huỷ"
                onConfirm={() => forceDeleteProduct.mutate(record.id)}
              >
                <Button danger>Xoá</Button>
              </Popconfirm>
            ),
          }

        ]}
      />
    </div>
  )
}

export default TrashProductList
