import React from 'react'
import { Button, Table, Popconfirm, Space, Image, Tag, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { useDeleteProduct, useProducts } from '../../../hooks/useproduct'
import { useListCategory } from '../../../hooks/useCategory'
import type { Category } from '../../../types/categorys/category'

const formatCurrency = (value?: string | number) => {
  if (!value) return '0₫'
  const num = typeof value === 'string' ? Number(value.replace(/,/g, '')) : value
  return num.toLocaleString('vi-VN') + '₫'
}

const ProductList: React.FC = () => {
  const deleteProduct = useDeleteProduct()
  const { data: products, isLoading } = useProducts()
  const { data: categories = [] } = useListCategory()

  const getCategoryName = (id: number): string => {
    const found = categories.find((cat: Category) => cat.id === id)
    return found?.ten || 'Chưa phân loại'
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
      align: 'center' as const,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'ten',
      width: 200,
      className: 'font-semibold text-gray-800',
    },
    {
      title: 'Ảnh',
      dataIndex: 'hinh_anh',
      width: 100,
      align: 'center' as const,
      render: (img: string[] | string | null) => {
        let src = '/placeholder.png'
        if (Array.isArray(img) && img.length > 0) src = img[0]
        else if (typeof img === 'string' && img !== '') src = img
        return <Image src={src} width={60} height={60} />
      },
    },
    {
      title: 'Giá',
      dataIndex: 'gia',
      width: 110,
      align: 'right' as const,
      render: (value: string | number) => (
        <span className="text-green-600 font-semibold">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      title: 'KM',
      dataIndex: 'gia_khuyen_mai',
      width: 110,
      align: 'right' as const,
      render: (value: string | number) =>
        value && value !== '0' ? (
          <Tag color="volcano">{formatCurrency(value)}</Tag>
        ) : (
          <Tag color="default">Không KM</Tag>
        ),
    },
    {
      title: 'SL',
      dataIndex: 'so_luong',
      width: 90,
      align: 'center' as const,
      render: (value: number) => (
        <Tag color={value > 0 ? 'green' : 'red'}>
          {value > 0 ? `Còn ${value}` : 'Hết hàng'}
        </Tag>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'mo_ta',
      width: 200,
      render: (value: string) => (
        <Tooltip title={value}>
          <div className="line-clamp-2 text-gray-600">{value}</div>
        </Tooltip>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'danh_muc_id',
      width: 130,
      render: (id: number) => (
        <Tag color="blue">{getCategoryName(id)}</Tag>
      ),
    },
    {
      title: 'Thao tác',
      fixed: 'right' as const,
      width: 200,
      render: (_: any, record: any) => (
        <Space size="small">
          <Link to={`/admin/san-pham/edit/${record.id}`}>
            <Button size="small" type="default" style={{ color: '#1890ff', borderColor: '#1890ff' }}>
              Sửa
            </Button>
          </Link>
          <Link to={`/admin/san-pham/chi-tiet/${record.id}`}>
            <Button size="small" type="default" style={{
              color: '#faad14',
              borderColor: '#faad14',
            }} >
              Xem
            </Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => deleteProduct.mutate(record.id)}
          >
            <Button
              size="small"
              style={{
                color: '#f5222d',
                borderColor: '#f5222d'
              }}
            >
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h3 className="text-2xl font-bold text-gray-800">
          Quản lý sản phẩm
        </h3>

        <div className="flex flex-wrap gap-2">
          <Link to="them-san-pham">
            <Button type="primary" className="font-semibold">
              Thêm sản phẩm
            </Button>
          </Link>
          <Link to="/admin/san-pham/thung-rac">
            <Button type="default" danger className="font-semibold">
              Thùng rác
            </Button>
          </Link>
        </div>
      </div>

      <Table
        loading={isLoading}
        dataSource={products ?? []}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: '1000px' }}
        columns={columns}
      />
    </div>
  )
}

export default ProductList