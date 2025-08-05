import React from "react";
import {
  Table,
  Image,
  Tag,
  Spin,
  Button,
  Popconfirm,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useBannerList, useDeleteBanner } from "../../../hooks/useBanner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { Title } = Typography;

const BannerListPage: React.FC = () => {
  const navigate = useNavigate();

  const { data: banners, isLoading } = useBannerList();

  const { mutate: deleteBanner, isLoading: isDeleting } = useDeleteBanner();

  const handleDelete = (id: number) => {
    deleteBanner(id, {
      onSuccess: () => toast.success("Xoá banner thành công"),
      onError: () => toast.error("Xoá banner thất bại"),
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 60,
    },
    {
      title: "Tiêu đề",
      dataIndex: "tieu_de",
      width: 200,
      ellipsis: true,
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
      width: 160,
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
            title="Bạn có chắc chắn muốn xoá banner này?"
            okText="Xoá"
            cancelText="Hủy"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              loading={isDeleting}
              disabled={isDeleting}
            >
              Xoá
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );
  }
console.log("Banners:", banners);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Danh sách Banner</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/banners/add")}
        >
          Thêm Banner
        </Button>
      </div>

 <Table
  loading={isLoading}
  columns={columns}
  dataSource={Array.isArray(banners) ? banners : []}
  rowKey="id"
/>
    </div>
  );
};

export default BannerListPage;
