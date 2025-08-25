import React, { useState } from 'react'
import { Button, Table, Popconfirm, Space, Image, Tag, Tooltip, Spin, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useDeleteProduct, useProductsAdmin } from '../../../hooks/useProduct'

const { Search } = Input

const ProductList: React.FC = () => {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<{ keyword?: string }>({})

  const deleteProduct = useDeleteProduct()
  const { data, isLoading, isFetching } = useProductsAdmin(page, filters)

  const products = data?.data || []
  const pagination = data?.meta

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60, align: 'center' as const },
    { title: 'Tên sản phẩm', dataIndex: 'ten', width: 200, className: 'font-semibold text-gray-800' },
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
      dataIndex: 'ten_danh_muc',
      width: 150,
      render: (name: string) => (
        <Tag color="blue">{name || 'Chưa phân loại'}</Tag>
      ),
    },
    {
      title: 'Thao tác',
      fixed: 'right' as const,
      width: 200,
      render: (_: any, record: any) => (
        <Space size="small">
          <Link to={`/admin/san-pham/sua-san-pham/${record.id}`}>
            <Button size="small" type="default" style={{ color: '#1890ff', borderColor: '#1890ff' }}>
              Sửa
            </Button>
          </Link>
          <Link to={`/admin/san-pham/chi-tiet/${record.id}`}>
            <Button size="small" type="default" style={{ color: '#faad14', borderColor: '#faad14' }}>
              Xem
            </Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => deleteProduct.mutate(record.id)}
          >
            <Button size="small" style={{ color: '#f5222d', borderColor: '#f5222d' }}>
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  // 🔎 Reset filters
  const resetFilters = () => {
    setFilters({})
    setPage(1)
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h3 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h3>
        <div className="flex flex-wrap gap-2">
          <Link to="them-san-pham">
            <Button type="primary" className="font-semibold">Thêm sản phẩm</Button>
          </Link>
          <Link to="/admin/san-pham/thung-rac">
            <Button type="default" danger className="font-semibold">Thùng rác</Button>
          </Link>
        </div>
      </div>

      {/* 🔎 Thanh tìm kiếm */}
      <div className="mb-4 flex gap-2">
        <Search
          placeholder="Tìm theo tên sản phẩm..."
          allowClear
          onChange={(e) => {
            setFilters({ keyword: e.target.value })
            setPage(1)
          }}
          style={{ width: 300 }}
        />
        
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Spin size="large" tip={<span className="text-gray-700 font-semibold text-lg">Đang tải sản phẩm...</span>} />
        </div>
      ) : (
        <Spin spinning={isFetching} tip="Đang cập nhật sản phẩm...">
          <div className="transition-opacity duration-500 opacity-100">
            <Table
              dataSource={products}
              rowKey="id"
              pagination={{
                current: pagination?.current_page,
                pageSize: pagination?.per_page,
                total: pagination?.total,
                onChange: (p) => setPage(p),
              }}
              scroll={{ x: '1000px' }}
              columns={columns}
            />
          </div>
        </Spin>
      )}
    </div>
  )
}

export default ProductList
