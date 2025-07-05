import React from "react";
import { Table, Tag, Button, Image } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useHideReview, useReviewList } from "../../../hooks/useReview";

const ReviewListPage: React.FC = () => {
  const { data, isLoading } = useReviewList();
  const toggleHideMutation = useHideReview();
  const navigate = useNavigate();

  const handleToggleHide = (id: number) => {
    toggleHideMutation.mutate(id);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Người dùng",
      dataIndex: "user",
      render: (user: { id: number; name: string }) => user?.name || "-",
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      render: (product: { id: number; name: string; image?: string }) => {
        console.log("product:", product); // Debug xem product có dữ liệu không
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src={product?.image || "https://placehold.co/40x40"}
              alt={product?.name || "-"}
              width={40}
              style={{ objectFit: "cover", marginRight: 8 }}
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
      dataIndex: "action",
      render: (_: any, record: any) => (
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
            danger={record.is_hidden === 0}
            type={record.is_hidden === 1 ? "primary" : "default"}
            loading={toggleHideMutation.isPending}
            onClick={() => handleToggleHide(record.id)}
          >
            {record.is_hidden === 1 ? "Hiện" : "Ẩn"}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
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
