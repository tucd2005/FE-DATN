import React from "react";
import { Table, Tag, Button } from "antd";
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
      title: "Nội dung",
      dataIndex: "content",
    },
    {
      title: "Số sao",
      dataIndex: "rating",
      render: (rating: number) => <Tag color="gold">{rating} ⭐</Tag>,
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
            danger
            loading={toggleHideMutation.isPending}
            onClick={() => handleToggleHide(record.id)}
          >
            Ẩn/Hiện
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
