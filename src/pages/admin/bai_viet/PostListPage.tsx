// pages/admin/posts/PostListPage.tsx
import React, { useState } from "react";
import { Table, Card, Tag, Button, Space, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { usePosts, useDeletePost } from "../../../hooks/usePost";
import { useNavigate } from "react-router-dom";

const PostListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePosts(page);
  const { mutate: deletePost,  } = useDeletePost();
const navigate= useNavigate();
  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "tieu_de",
      key: "tieu_de",
      render: (text: string) => (
        <strong style={{ color: "#1677ff", cursor: "pointer" }}>{text}</strong>
      ),
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "mo_ta_ngan",
      key: "mo_ta_ngan",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      render: (status: string) => (
        <Tag color={status === "hien" ? "green" : "red"}>
          {status === "hien" ? "Hiển thị" : "Ẩn"}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: string) =>
        new Date(text).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" ghost onClick={() => navigate(`/admin/bai_viet/chi_tiet/${record.id}`)}>
            chi tiết 
          </Button>
      
          <Button type="primary" onClick={() => navigate(`/admin/bai_viet/edit/${record.id}`)}>
           sửa 
          </Button>
      
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa bài viết này?"
            onConfirm={() => deletePost(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="primary" danger ghost >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      )
      
    },
  ];

  return (
    <Card
      title="Danh sách bài viết"
      bordered={false}
      extra={
        <Button type="primary" onClick={() => navigate("/admin/bai_viet/add")}>
          Thêm bài viết
        </Button>
      }
    >
      <Table
        loading={isLoading}
        dataSource={data?.data}
        rowKey="id"
        columns={columns}
        pagination={{
          current: data?.current_page,
          total: data?.total,
          pageSize: data?.per_page,
          showSizeChanger: false,
          onChange: (p) => setPage(p),
        }}
      />
    </Card>
  );
};

export default PostListPage;
