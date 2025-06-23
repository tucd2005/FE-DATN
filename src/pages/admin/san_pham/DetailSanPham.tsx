import React from 'react'
import { useParams, Link } from 'react-router-dom'

import { Card, Descriptions, Image, Tag, Button } from 'antd'
import { formatCurrency } from '../../../utils/formatCurrency'
import { useProductDetail } from '../../../hooks/useproduct'

const ProductDetailPage: React.FC = () => {
const { id } = useParams()
const { data: product, isLoading } = useProductDetail(Number(id))

if (isLoading) return <p>Loading...</p>
if (!product) return <p>Không tìm thấy sản phẩm</p>

const getImage = () => {
if (Array.isArray(product.hinh_anh)) return product.hinh_anh[0]
if (typeof product.hinh_anh === 'string') return product.hinh_anh
return '/placeholder.png'
}

return (
<Card title="Chi tiết sản phẩm" extra={<Link to="/admin/san-pham"><Button>Quay lại</Button></Link>}>
<Descriptions bordered column={1}>
<Descriptions.Item label="Tên">{product.ten}</Descriptions.Item>
<Descriptions.Item label="Ảnh">
<Image width={100} src={getImage()} />
</Descriptions.Item>
<Descriptions.Item label="Giá">
<span className="text-green-600">{formatCurrency(product.gia)}</span>
</Descriptions.Item>
<Descriptions.Item label="Giá khuyến mãi">
{product.gia_khuyen_mai !== '0' ? (
<Tag color="volcano">{formatCurrency(product.gia_khuyen_mai)}</Tag>
) : (
<Tag>Không KM</Tag>
)}
</Descriptions.Item>
<Descriptions.Item label="Số lượng">
<Tag color={product.so_luong > 0 ? 'green' : 'red'}>
  {product.so_luong > 0 ? `Còn ${product.so_luong}` : 'Hết hàng'}
</Tag>
</Descriptions.Item>
<Descriptions.Item label="Mô tả">{product.mo_ta}</Descriptions.Item>
<Descriptions.Item label="Danh mục ID">{product.danh_muc_id}</Descriptions.Item>
<Descriptions.Item label="Ngày tạo">{product.created_at}</Descriptions.Item>
<Descriptions.Item label="Ngày cập nhật">{product.updated_at}</Descriptions.Item>
</Descriptions>
</Card>
)
}

export default ProductDetailPage