import React from "react";
import { Table, Tag, Button, Image } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useHideReview, useReviewList } from "../../../hooks/useReview";
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
  product: Product;
  content: string;
  rating: number;
  is_hidden: number;
  created_at: string;
  updated_at: string;
}

const ReviewListPage: React.FC = () => {
  const { data, isLoading } = useReviewList();
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
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      render: (product: Product) => {
        // Tự động bỏ qua URL giả
        const imageUrl =
          product?.image && product.image.startsWith("http") && !product.image.includes("via.placeholder.com")
            ? product.image
            : "https://placehold.co/40x40";

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src={imageUrl}
              alt={product?.name || "-"}
              width={40}
              height={40}
              style={{ objectFit: "cover", marginRight: 8, borderRadius: 4 }}
              preview={false}
              fallback="https://placehold.co/40x40"
            />
            <span>{product?.name || "-"}</span>
          </div>
        );
      },
    },
    {
      title: "Nội dung",
      dataIndex: "content",
    },
    {
      title: "Số sao",
      dataIndex: "rating",
      render: (rating: number) => <Tag color="gold">{rating} ⭐</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "is_hidden",
      render: (is_hidden: number) =>
        is_hidden ? <Tag color="red">Đã ẩn</Tag> : <Tag color="green">Hiển thị</Tag>,
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
        <>
          <Button
            size="small"
            onClick={() => navigate(`/admin/danh-gia/${record.id}`)}
            style={{ marginRight: 8 }}
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
        </>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Quản lý đánh giá</h1>
      <Table
        loading={isLoading}
        dataSource={data?.data || []}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

export default ReviewListPage;
