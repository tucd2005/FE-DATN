import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Descriptions, Image, Tag, Button, Table, Dropdown, Menu, Row, Col } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useProductDetail } from '../../../hooks/useProduct';
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
    { title: 'STT', render: (_: any, __: any, index: number) => index + 1, width: 50 },
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
            src = img.startsWith('http') ? img : `http://127.0.0.1:8000/storage/${img}`;
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
      render: () => (
        <Dropdown
          trigger={['click']}
          overlay={<Menu><Menu.Item key="1">Đóng bán</Menu.Item><Menu.Item key="2">Sửa</Menu.Item></Menu>}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
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
