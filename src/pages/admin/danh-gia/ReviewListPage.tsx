import React, { useState } from "react";
import { Table, Tag, Button, Space, Rate, Image } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useReviewList, useHideReview } from "../../../hooks/useReview";
import type { ColumnsType } from "antd/es/table";

interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  image?: string | null;
}

interface Review {
  id: number;
  user: User;
  product?: Product;
  variant?: any;
  content: string;
  rating: number;
  is_hidden: boolean;
  image?: string | null;
  created_at: string;
  updated_at: string;
}

const ReviewListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useReviewList(currentPage); // <-- custom hook nhận trang
  const toggleHideMutation = useHideReview();
  const navigate = useNavigate();

  const handleToggleHide = (id: number) => {
    toggleHideMutation.mutate(id);
  };

  const columns: ColumnsType<Review> = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Người dùng",
      dataIndex: "user",
      render: (user: User) => user?.name || "-",
    },  {
  title: "Ảnh sản phẩm",
  dataIndex: "product",
  render: (product: Product) => {
    const imageUrl = product?.image
      ? product.image.startsWith("http")
        ? product.image
        : `http://127.0.0.1:8000/storage/${product.image}`
      : "https://placehold.co/80x80?text=No+Image";
    return (
      <Image
        src={imageUrl}
        alt="Ảnh sản phẩm"
        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
      />
    );
  },
},
    {
      title: "Sản phẩm",
      render: (record: Review) =>
        record.variant?.product_name || record.product?.name || "-",
    },
  
    {
      title: "Nội dung",
      dataIndex: "content",
      render: (text) => <div style={{ maxWidth: 300 }}>{text}</div>,
    },
    
 {
  title: "Số sao",
  dataIndex: "so_sao",
  render: (so_sao: number) => <Rate disabled value={so_sao} />, // ✅ dùng Rate đúng cách
},
    {
      title: "Trạng thái",
      dataIndex: "is_hidden",
      render: (is_hidden: boolean) =>
        is_hidden ? (
          <Tag color="red">Đã ẩn</Tag>
        ) : (
          <Tag color="green">Hiển thị</Tag>
        ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Review) => (
        <Space>
          <Button
            size="small"
            onClick={() => navigate(`/admin/danh-gia/${record.id}`)}
          >
            Xem chi tiết
          </Button>
          <Button
            size="small"
            type={record.is_hidden ? "primary" : "default"}
            danger={!record.is_hidden}
            loading={toggleHideMutation.isPending}
            onClick={() => handleToggleHide(record.id)}
          >
            {record.is_hidden ? "Hiện" : "Ẩn"}
          </Button>
        </Space>
      ),
    },
  ];
console.log("Review data:", data);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Quản lý đánh giá</h1>
      <Table
        loading={isLoading}
        dataSource={data?.data || []}
        columns={columns}
        rowKey="id"
        pagination={{
          current: data?.pagination?.current_page || 1,
          total: data?.pagination?.total_items || 0,
          pageSize: data?.pagination?.per_page || 10,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
};

export default ReviewListPage;
