import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Button, Image, Spin, Alert, Tag } from "antd";
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useOneCategory } from "../../../hooks/useCategory";

const DetailDanhMuc: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: category, isLoading, error } = useOneCategory(id!);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin size="large" />
            </div>
        );
    }

    if (error || !category) {
        return (
            <div className="p-6">
                <Alert
                    message="Lỗi"
                    description="Không thể tải thông tin danh mục. Vui lòng thử lại."
                    type="error"
                    showIcon
                    action={
                        <Button size="small" onClick={() => navigate("/admin/danh-muc")}>
                            Quay lại
                        </Button>
                    }
                />
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate("/admin/danh-muc")}
                        className="flex items-center"
                    >
                        Quay lại
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-800">Chi tiết danh mục</h1>
                </div>
                <div className="flex space-x-2">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => navigate(`/admin/danh-muc-edit/${category.id}`)}
                    >
                        Chỉnh sửa
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => navigate("/admin/danh-muc")}
                    >
                        Xóa
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Image Section */}
                <div className="lg:col-span-1">
                    <Card title="Ảnh danh mục" className="h-fit">
                        {category.image ? (
                            <div className="text-center">
                                <Image
                                    width="100%"
                                    height={200}
                                    src={`http://localhost:8000/storage/${category.image}`}
                                    alt={category.ten}
                                    className="rounded-lg object-cover"
                                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
                                />
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <div className="text-4xl mb-2">📷</div>
                                <p>Không có ảnh</p>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Details Section */}
                <div className="lg:col-span-2">
                    <Card title="Thông tin chi tiết">
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="ID" span={1}>
                                <Tag color="blue">{category.id}</Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label="Tên danh mục" span={1}>
                                <span className="font-semibold text-lg">{category.ten}</span>
                            </Descriptions.Item>

                            <Descriptions.Item label="Mô tả" span={1}>
                                {category.mo_ta ? (
                                    <p className="text-gray-700 leading-relaxed">{category.mo_ta}</p>
                                ) : (
                                    <span className="text-gray-500 italic">Không có mô tả</span>
                                )}
                            </Descriptions.Item>

                            <Descriptions.Item label="Trạng thái" span={1}>
                                {category.deletedAt ? (
                                    <Tag color="red">Đã xóa</Tag>
                                ) : (
                                    <Tag color="green">Hoạt động</Tag>
                                )}
                            </Descriptions.Item>

                            <Descriptions.Item label="Ngày tạo" span={1}>
                                <span className="text-gray-600">
                                    {new Date(category.created_at).toLocaleString('vi-VN')}
                                </span>
                            </Descriptions.Item>

                            <Descriptions.Item label="Ngày cập nhật" span={1}>
                                <span className="text-gray-600">
                                    {new Date(category.updated_at).toLocaleString('vi-VN')}
                                </span>
                            </Descriptions.Item>

                            {category.deletedAt && (
                                <Descriptions.Item label="Ngày xóa" span={1}>
                                    <span className="text-red-600">
                                        {new Date(category.deletedAt).toLocaleString('vi-VN')}
                                    </span>
                                </Descriptions.Item>
                            )}
                        </Descriptions>
                    </Card>

                    {/* Additional Info */}
                    <Card title="Thông tin bổ sung" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-700 mb-2">Số sản phẩm</h4>
                                <p className="text-2xl font-bold text-blue-600">0</p>
                                <p className="text-sm text-gray-500">sản phẩm trong danh mục</p>
                            </div> */}

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-700 mb-2">Trạng thái</h4>
                                <p className="text-2xl font-bold text-green-600">Hoạt động</p>
                                <p className="text-sm text-gray-500">danh mục đang được sử dụng</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DetailDanhMuc;
