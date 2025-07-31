import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Table, Button, Popconfirm, message, Card, Tag } from "antd";
import { variantService } from "../../../services/variantService";

const Deletelistpage = () => {
  const { productId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDeletedVariants = async () => {
    setLoading(true);
    try {
      const res = await variantService.getDeletedByProductId(Number(productId));
      setData(res || []);
    } catch {
      message.error("Không thể tải danh sách biến thể đã xóa.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDeletedVariants();
  }, [productId]);

  const handleRestore = async (id: number) => {
    try {
      await variantService.restore(id);
      message.success("Khôi phục thành công!");
      fetchDeletedVariants();
    } catch {
      message.error("Khôi phục thất bại!");
    }
  };



  // Xác định các thuộc tính động (Kích cỡ, Màu sắc, Chất liệu, ...)
  const attributeNames = Array.from(
    new Set(
      data.flatMap((v: any) => (v.thuoc_tinh || []).map((t: any) => t.ten))
    )
  );

  const getImageUrl = (img: string | undefined) => {
    if (!img) return '/placeholder.png';
    return img.startsWith('http')
      ? img
      : `http://127.0.0.1:8000/storage/${img}`;
  };

  const columns = [
    { title: 'STT', render: (_: unknown, __: any, index: number) => index + 1, width: 50 },
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
        return <img src={src} alt="variant" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 6 }} />;
      },
    },
    ...attributeNames.map(name => ({
      title: name,
      dataIndex: 'thuoc_tinh',
      render: (attrs: any[]) => {
        const item = attrs?.find(x => x.ten === name);
        return item?.gia_tri || '-';
      },
    })),
    { title: 'Giá', dataIndex: 'gia', render: (gia: string) => gia ? Number(gia).toLocaleString() + '₫' : '-' },
    { title: 'Giá khuyến mãi', dataIndex: 'gia_khuyen_mai', render: (gia: string) => gia ? Number(gia).toLocaleString() + '₫' : '-' },
    {
      title: 'Trạng thái',
      render: () => (
        <Tag color="red">Đã xóa mềm</Tag>
      ),
    },
    {
      title: 'Chức năng',
      render: (_: unknown, record: any) => (
        <>
          <Popconfirm
            title="Khôi phục biến thể này?"
            onConfirm={() => handleRestore(record.id)}
            okText="Khôi phục"
            cancelText="Hủy"
          >
            <Button type="primary" size="small" style={{ marginRight: 8 }}>
              Khôi phục
            </Button>
          </Popconfirm>
         
        </>
      ),
    },
  ];

  return (
    <Card
      title="Danh sách biến thể đã xóa mềm"
      extra={<Link to={`/admin/san-pham/chi-tiet/${productId}`}><Button>Quay lại sản phẩm</Button></Link>}
    >
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        bordered
      />
    </Card>
  );
};

export default Deletelistpage;
