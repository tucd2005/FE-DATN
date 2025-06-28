import React from 'react';
import { Table, Button, Tag, Image, Popconfirm, Space, Card, Typography } from 'antd';
import { DeleteOutlined, UndoOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useTrashedCategories, useRestoreCategoryFromTrash, useForceDeleteCategoryFromTrash } from '../../../hooks/useCategory';

const { Title, Text } = Typography;

const DanhMucDaXoa: React.FC = () => {
    const { data: categories, isLoading } = useTrashedCategories();
    const restoreCategory = useRestoreCategoryFromTrash();
    const forceDeleteCategory = useForceDeleteCategoryFromTrash();

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            render: (id: number) => <Tag color="blue">{id}</Tag>,
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'ten',
            key: 'ten',
            width: 200,
            render: (ten: string) => (
                <Text strong className="text-gray-800">
                    {ten}
                </Text>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'mo_ta',
            key: 'mo_ta',
            width: 250,
            render: (mo_ta: string) => (
                <Text className="text-gray-600">
                    {mo_ta || 'Không có mô tả'}
                </Text>
            ),
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            width: 100,
            align: 'center' as const,
            render: (image: string | null) => {
                if (!image) {
                    return (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Text className="text-gray-400 text-xs">No Image</Text>
                        </div>
                    );
                }
                return (
                    <Image
                        src={`http://localhost:8000/storage/${image}`}
                        width={64}
                        height={64}
                        className="rounded-lg object-cover"
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
                    />
                );
            },
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 150,
            render: (date: string) => (
                <Text className="text-gray-500 text-sm">
                    {new Date(date).toLocaleDateString('vi-VN')}
                </Text>
            ),
        },
        {
            title: 'Ngày xóa',
            dataIndex: 'deleted_at',
            key: 'deleted_at',
            width: 150,
            render: (date: string) => (
                <Text className="text-red-500 text-sm font-medium">
                    {new Date(date).toLocaleDateString('vi-VN')}
                </Text>
            ),
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 200,
            render: (_: any, record: any) => (
                <Space size="small">
                    <Button
                        type="primary"
                        size="small"
                        icon={<UndoOutlined />}
                        onClick={() => restoreCategory.mutate(record.id)}
                        loading={restoreCategory.isPending}
                        className="bg-green-500 hover:bg-green-600 border-green-500"
                    >
                        Khôi phục
                    </Button>
                    <Popconfirm
                        title="Xóa vĩnh viễn"
                        description="Bạn có chắc chắn muốn xóa vĩnh viễn danh mục này? Hành động này không thể hoàn tác."
                        icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => forceDeleteCategory.mutate(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okType="danger"
                    >
                        <Button
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            loading={forceDeleteCategory.isPending}
                        >
                            Xóa vĩnh viễn
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <Title level={2} className="flex items-center">
                    <span className="mr-3">🗑️</span>
                    Danh mục đã xóa
                </Title>
                <Text className="text-gray-600">
                    Quản lý các danh mục đã được xóa mềm. Bạn có thể khôi phục hoặc xóa vĩnh viễn.
                </Text>
            </div>

            {/* Stats Card */}
            <div className="mb-6">
                <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <Text className="text-gray-600">Tổng số danh mục đã xóa:</Text>
                            <div className="text-2xl font-bold text-red-600">
                                {categories?.length || 0}
                            </div>
                        </div>
                        <div className="text-red-400 text-4xl">🗑️</div>
                    </div>
                </Card>
            </div>

            {/* Table */}
            <Card>
                <Table
                    rowKey="id"
                    loading={isLoading}
                    dataSource={categories || []}
                    columns={columns}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} của ${total} danh mục`,
                    }}
                    scroll={{ x: 1200 }}
                    className="custom-table"
                />
            </Card>

            {/* Empty State */}
            {!isLoading && (!categories || categories.length === 0) && (
                <Card className="text-center py-12">
                    <div className="text-6xl mb-4">🗑️</div>
                    <Title level={3} className="text-gray-600 mb-2">
                        Không có danh mục nào đã xóa
                    </Title>
                    <Text className="text-gray-500">
                        Tất cả danh mục đang hoạt động bình thường.
                    </Text>
                </Card>
            )}
        </div>
    );
};

export default DanhMucDaXoa; 