import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Card,
  Descriptions,
  Image,
  Tag,
  Button,
  Table,
  Dropdown,
  Menu,
  Row,
  Col,
} from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { formatCurrency } from '../../../utils/formatCurrency'
import { useProductDetail } from '../../../hooks/useproduct'

const ProductDetailPage: React.FC = () => {
  const { id } = useParams()
  const { data: product, isLoading } = useProductDetail(Number(id))

  if (isLoading) return <p>Loading...</p>
  if (!product) return <p>Không tìm thấy sản phẩm</p>

  const getImage = () => {
    if (Array.isArray(product.hinh_anh)) return product.hinh_anh[0]
    if (typeof product.hinh_anh === 'string') {
      return product.hinh_anh.startsWith('http')
        ? product.hinh_anh
        : `http://127.0.0.1:8000/storage/${product.hinh_anh}`
    }
    return '/placeholder.png'
  }

  const variantColumns = [
    {
      title: 'STT',
      render: (_: any, __: any, index: number) => index + 1,
      width: 50,
    },
    {
      title: 'Ảnh',
      dataIndex: 'hinh_anh',
      width: 100,
      align: 'center' as const,
      render: (img: string | null) => {
        let src = '/placeholder.png'
        if (img) {
          src = img.startsWith('http')
            ? img
            : `http://127.0.0.1:8000/storage/${img}`
        }
        return <Image src={src} width={60} height={60} />
      },
    },
    {
      title: 'Kích cỡ',
      dataIndex: 'thuoc_tinh',
      render: (attrs: any[]) => {
        const item = attrs.find((x) =>
          x.ten.toLowerCase().includes('kích')
        )
        return item?.gia_tri || '-'
      },
    },
    {
      title: 'Màu sắc',
      dataIndex: 'thuoc_tinh',
      render: (attrs: any[]) => {
        const item = attrs.find((x) =>
          x.ten.toLowerCase().includes('màu')
        )
        return item?.gia_tri || '-'
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'so_luong',
    },
    {
      title: 'Trạng thái',
      render: (_: any, record: any) => (
        <Tag color={record.so_luong > 0 ? 'green' : 'red'}>
          {record.so_luong > 0 ? 'Mở bán' : 'Hết hàng'}
        </Tag>
      ),
    },
    {
      title: 'Chức năng',
      render: () => (
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item key="1">Đóng bán</Menu.Item>
              <Menu.Item key="2">Sửa</Menu.Item>
            </Menu>
          }
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ]

  return (
    <Card
      title="Thông tin sản phẩm"
      extra={
        <Link to="/admin/san-pham">
          <Button>Quay lại</Button>
        </Link>
      }
    >
      {/* Layout ảnh trái - thông tin phải */}
      <Row gutter={24} className="mb-6">
        <Col span={6}>
          <Image width={200} height={450} src={getImage()} />
        </Col>
        <Col span={18}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Tên">{product.ten}</Descriptions.Item>
            <Descriptions.Item label="Số lượng">
              <Tag color={product.so_luong > 0 ? 'green' : 'red'}>
                {product.so_luong > 0
                  ? `Còn ${product.so_luong}`
                  : 'Hết hàng'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả">{product.mo_ta}</Descriptions.Item>
            <Descriptions.Item label="Danh mục ID">
              {product.danh_muc_id}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {product.created_at}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
              {product.updated_at}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      {/* Bảng biến thể */}
      {product.variants?.length > 0 && (
        <>
          <h3 className="text-base font-semibold mb-2">Thông tin biến thể</h3>
          <Table
            columns={variantColumns}
            dataSource={product.variants}
            rowKey="id"
            pagination={false}
            bordered
          />
        </>
      )}
    </Card>
  )
}

export default ProductDetailPage
