// src/pages/admin/banner/BannerListPage.tsx

import React from "react";
import { Table, Image, Tag, Spin, Button, Popconfirm } from "antd";
import { useBannerList, useDeleteBanner } from "../../../hooks/useBanner";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const BannerListPage: React.FC = () => {
  const { data: banners, isLoading } = useBannerList();
  const navigate = useNavigate();

  const { mutate: deleteBanner, isLoading: isDeleting } = useDeleteBanner();

  const handleDelete = async (id: number) => {
    deleteBanner(id, {
      onSuccess: () => toast.success("Xoá banner thành công"),
      onError: () => toast.error("Xoá thất bại"),
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "tieu_de",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinh_anh",
      render: (value: string) => (
        <Image
          width={120}
          src={`http://localhost:8000/storage/${value}`}
          alt="banner"
          fallback="/no-image.png"
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      render: (status: string) =>
        status === "hien" ? (
          <Tag color="green">Hiện</Tag>
        ) : (
          <Tag color="red">Ẩn</Tag>
        ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      render: (date: string) =>
        new Date(date).toLocaleString("vi-VN", {
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
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/banners/edit/${record.id}`)}
          >
            Sửa
          </Button>
    
          <Popconfirm
            title="Xác nhận xoá?"
            okText="Xoá"
            cancelText="Hủy"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />}>
              Xoá
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (isLoading) return <Spin size="large" />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Danh sách Banner</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/banners/add")}
        >
          Thêm Banner
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={banners}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default BannerListPage;
