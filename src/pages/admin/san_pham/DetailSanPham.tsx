import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Descriptions, Image, Tag, Button, Table, Popconfirm, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useProductDetail } from '../../../hooks/useProduct';
import { variantService } from '../../../services/variantService';
import type { ColumnsType } from 'antd/es/table';
import type { Variant } from '../../../types/product.type';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProductDetail(Number(id));
  const queryClient = useQueryClient();
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
      render: (imgs: string[] | string | null) => {
        let src = '/placeholder.png';
    
        try {
          if (Array.isArray(imgs) && imgs.length > 0) {
            // Nếu hinh_anh là array
            src = `http://127.0.0.1:8000/storage/${imgs[0]}`;
          } else if (typeof imgs === 'string') {
            // Trường hợp chuỗi chứa JSON array
            if (imgs.startsWith('[')) {
              const parsed = JSON.parse(imgs);
              if (Array.isArray(parsed) && parsed.length > 0) {
                src = `http://127.0.0.1:8000/storage/${parsed[0]}`;
              }
            } else {
              // Chuỗi bình thường
              src = imgs.startsWith('http')
                ? imgs
                : `http://127.0.0.1:8000/storage/${imgs}`;
            }
          }
        } catch (e) {
          console.error('Lỗi parse hinh_anh:', imgs, e);
        }
    
        return <Image src={src} width={60} height={60} />;
      },
    }
    
,    
    ...dynamicAttributeColumns,
    {
      title: 'Giá',
      dataIndex: 'gia',
      render: (gia: number) =>
        gia ? Number(gia).toLocaleString('vi-VN') + '₫' : '-',
    },
    {
      title: 'Giá khuyến mãi',
      dataIndex: 'gia_khuyen_mai',
      render: (gia: number) =>
        gia ? Number(gia).toLocaleString('vi-VN') + '₫' : '-',
    },
    { title: 'Số lượng', dataIndex: 'so_luong', render: (sl: number) => sl?.toLocaleString() ?? '-' },

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
                toast.success("Đã xóa biến thể!");
                queryClient.invalidateQueries({
                  queryKey: ['product', Number(id)],
                });
              } catch {
                toast.error("Xóa biến thể thất bại!");
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
  console.log(product);
  return (
    <Card
      title="Thông tin sản phẩm"
      extra={<Link to="/admin/san-pham"><Button>Quay lại</Button></Link>}
    >
      <Row gutter={24} className="mb-6">
        <Col span={6}>
          <Image
            src={getImage()}
            width="100%"   // ăn theo cột
            height="auto" // giữ tỉ lệ
          />
        </Col>
        <Col span={17}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Tên">{product.ten}</Descriptions.Item>
            <Descriptions.Item label="Mô tả">{product.mo_ta}</Descriptions.Item>
            <Descriptions.Item label="Danh mục">
              {product.ten_danh_muc || `ID: ${product.danh_muc_id}`}
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
