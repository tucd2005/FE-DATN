import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Descriptions, Image, Tag, Button, Table, Popconfirm, message, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useProductDetail } from '../../../hooks/useProduct';
import { variantService } from '../../../services/variantService';
import type { ColumnsType } from 'antd/es/table';
import type { Variant } from '../../../types/product.type';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProductDetail(Number(id));

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  const getImageUrl = (img: string | undefined) => {
    if (!img) return '/placeholder.png';
    return img.startsWith('http')
      ? img
      : `http://127.0.0.1:8000/storage/${img}`;
  };

  const getImage = () => {
    if (Array.isArray(product.hinh_anh)) return getImageUrl(product.hinh_anh[0]);
    if (typeof product.hinh_anh === 'string') {
      try {
        const arr = JSON.parse(product.hinh_anh);
        if (Array.isArray(arr) && arr.length > 0) {
          return getImageUrl(arr[0]);
        }
      } catch {
        return getImageUrl(product.hinh_anh);
      }
    }
    return '/placeholder.png';
  };

  const attributeNames = Array.from(new Set(product.variants.flatMap((v) => v.thuoc_tinh.map(t => t.ten))));

  const dynamicAttributeColumns = attributeNames.map(name => ({
    title: name,
    dataIndex: 'thuoc_tinh',
    render: (attrs: Variant['thuoc_tinh']) => {
      const item = attrs.find(x => x.ten === name);
      return item?.gia_tri || '-';
    },
  })) as ColumnsType<Variant>;

  const variantColumns: ColumnsType<Variant> = [
    { title: 'STT', render: (_: unknown, __: Variant, index: number) => index + 1, width: 50 },
    {
      title: 'Ảnh',
      dataIndex: 'hinh_anh',
      width: 100,
      align: 'center',
      render: (img: string | null) => {
        let src = '/placeholder.png';
        if (img) {
          try {
            const arr = JSON.parse(img);
            if (Array.isArray(arr) && arr.length > 0) {
              src = getImageUrl(arr[0]);
            }
          } catch {
            src = typeof img === 'string' && img.startsWith('http')
            ? img
            : `http://127.0.0.1:8000/storage/${img}`;
          }
        }
        return <Image src={src} width={60} height={60} />;
      },
    },
    ...dynamicAttributeColumns,
    { title: 'Giá', dataIndex: 'gia', render: (gia: number) => gia ? gia.toLocaleString() + '₫' : '-' },
    { title: 'Giá khuyến mãi', dataIndex: 'gia_khuyen_mai', render: (gia: number) => gia ? gia.toLocaleString() + '₫' : '-' },
    {
      title: 'Trạng thái',
      render: (_: any, record: Variant) => (
        <Tag color={record.so_luong > 0 ? 'green' : 'red'}>
          {record.so_luong > 0 ? 'Mở bán' : 'Hết hàng'}
        </Tag>
      ),
    },
    {
      title: 'Chức năng',
      render: (_: any, record: Variant) => (
        <span>
          <Link to={`/admin/bien-the/edit/${record.id}`}>
            <Button icon={<EditOutlined />} size="small" style={{ marginRight: 8 }}>Sửa</Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa mềm biến thể này?"
            onConfirm={async () => {
              try {
                await variantService.delete(record.id);
                message.success('Đã xóa biến thể!');
                window.location.reload();
              } catch {
                message.error('Xóa biến thể thất bại!');
              }
            }}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button icon={<DeleteOutlined />} size="small" danger>Xóa</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Card
      title="Thông tin sản phẩm"
      extra={<Link to="/admin/san-pham"><Button>Quay lại</Button></Link>}
    >
      <Row gutter={24} className="mb-6">
        <Col span={6}><Image width={200} height={450} src={getImage()} /></Col>
        <Col span={18}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Tên">{product.ten}</Descriptions.Item>
            <Descriptions.Item label="Mô tả">{product.mo_ta}</Descriptions.Item>
            <Descriptions.Item label="Danh mục">
              {product.danh_muc?.ten || product.danh_muc_id}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">{product.created_at}</Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">{product.updated_at}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      {product.variants?.length > 0 && (
        <>
          <h3 className="text-base font-semibold mb-2">Thông tin biến thể</h3>
          <div style={{ marginBottom: 16 }}>
            <Link to={`/admin/bien-the/add/${product.id}`}>
              <Button type="primary">Thêm biến thể</Button>
            </Link>
            <Link to={`/admin/bien-the/deleted/${product.id}`}>
              <Button danger style={{ marginLeft: 10 }}>Biến thể đã xóa</Button>
            </Link>
          </div>
          <Table<Variant>
            columns={variantColumns}
            dataSource={product.variants}
            rowKey="id"
            pagination={false}
            bordered
          />
        </>
      )}
    </Card>
  );
};

export default ProductDetailPage;
