import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Table,
    Button,
    Space,
    Image,
    Tag,
    Card,
    Typography,
    Popconfirm,
    Modal,
    Form,
    Input,
    InputNumber,
    Upload,
    Select,
    Tabs,
    Badge,
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UndoOutlined,
    ExclamationCircleOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import {
    useVariantsByProduct,
    useDeletedVariantsByProduct,
    useCreateVariant,
    useUpdateVariant,
    useDeleteVariant,
    useRestoreVariant,
    useForceDeleteVariant,
} from '../../../hooks/useVariant';
import { useList as useListAttribute } from '../../../hooks/useAttribute';
import { formatCurrency } from '../../../utils/formatCurrency';
import type { Variant, VariantInput, VariantUpdateInput } from '../../../types/variant.type';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const QuanLyBienThe: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingVariant, setEditingVariant] = useState<Variant | null>(null);
    const [form] = Form.useForm();

    // Hooks
    const { data: variants = [], isLoading } = useVariantsByProduct(Number(productId));
    const { data: deletedVariants = [], isLoading: deletedLoading } = useDeletedVariantsByProduct(Number(productId));
    const { data: attributes = [] } = useListAttribute();

    const createVariant = useCreateVariant(Number(productId));
    const updateVariant = useUpdateVariant(0, Number(productId));
    const deleteVariant = useDeleteVariant(Number(productId));
    const restoreVariant = useRestoreVariant(Number(productId));
    const forceDeleteVariant = useForceDeleteVariant(Number(productId));

    // Columns cho bảng biến thể
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            render: (id: number) => <Tag color="blue">{id}</Tag>,
        },
        {
            title: 'Ảnh',
            dataIndex: 'hinh_anh',
            key: 'hinh_anh',
            width: 120,
            render: (images: string[] | null) => {
                if (!images || images.length === 0) {
                    return (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Text className="text-gray-400 text-xs">No Image</Text>
                        </div>
                    );
                }
                return (
                    <Image
                        src={`http://localhost:8000/storage/${images[0]}`}
                        width={64}
                        height={64}
                        className="rounded-lg object-cover"
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
                    />
                );
            },
        },
        {
            title: 'Thuộc tính',
            key: 'attributes',
            width: 200,
            render: (_: unknown, record: Variant) => (
                <div className="space-y-1">
                    {record.attributeValues.map((attr) => (
                        <Tag key={attr.id} color="green">
                            {attr.attribute?.ten}: {attr.gia_tri}
                        </Tag>
                    ))}
                </div>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'so_luong',
            key: 'so_luong',
            width: 100,
            render: (quantity: number) => (
                <Tag color={quantity > 0 ? 'green' : 'red'}>
                    {quantity > 0 ? `Còn ${quantity}` : 'Hết hàng'}
                </Tag>
            ),
        },
        {
            title: 'Giá gốc',
            dataIndex: 'gia',
            key: 'gia',
            width: 120,
            render: (price: string) => (
                <Text className="font-semibold text-gray-800">
                    {formatCurrency(Number(price))}
                </Text>
            ),
        },
        {
            title: 'Giá khuyến mãi',
            dataIndex: 'gia_khuyen_mai',
            key: 'gia_khuyen_mai',
            width: 120,
            render: (price: string | null) => (
                price ? (
                    <Text className="font-semibold text-red-600">
                        {formatCurrency(Number(price))}
                    </Text>
                ) : (
                    <Text className="text-gray-400">-</Text>
                )
            ),
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 200,
            render: (_: unknown, record: Variant) => (
                <Space size="small">
                    <Button
                        type="primary"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa biến thể"
                        description="Bạn có chắc chắn muốn xóa biến thể này?"
                        onConfirm={() => deleteVariant.mutate(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            loading={deleteVariant.isPending}
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Columns cho bảng biến thể đã xóa
    const deletedColumns = [
        ...columns.slice(0, -1), // Bỏ cột hành động
        {
            title: 'Hành động',
            key: 'actions',
            width: 200,
            render: (_: unknown, record: Variant) => (
                <Space size="small">
                    <Button
                        type="primary"
                        size="small"
                        icon={<UndoOutlined />}
                        onClick={() => restoreVariant.mutate(record.id)}
                        loading={restoreVariant.isPending}
                    >
                        Khôi phục
                    </Button>
                    <Popconfirm
                        title="Xóa vĩnh viễn"
                        description="Bạn có chắc chắn muốn xóa vĩnh viễn biến thể này?"
                        icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => forceDeleteVariant.mutate(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okType="danger"
                    >
                        <Button
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            loading={forceDeleteVariant.isPending}
                        >
                            Xóa vĩnh viễn
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Xử lý thêm/sửa biến thể
    const handleSubmit = async (values: Record<string, unknown>) => {
        try {
            const formData: VariantInput | VariantUpdateInput = {
                so_luong: values.so_luong as number,
                gia: String(values.gia),
                gia_khuyen_mai: values.gia_khuyen_mai ? String(values.gia_khuyen_mai) : undefined,
                attributes: (values.attributes as Array<{ thuoc_tinh_id: number; gia_tri: string }>).map((attr) => ({
                    thuoc_tinh_id: attr.thuoc_tinh_id,
                    gia_tri: attr.gia_tri,
                })),
            };

            if (values.hinh_anh && typeof values.hinh_anh === 'object' && 'fileList' in values.hinh_anh) {
                const fileList = (values.hinh_anh as { fileList: Array<{ originFileObj: File }> }).fileList;
                formData.hinh_anh = fileList.map((file) => file.originFileObj);
            }

            if (editingVariant) {
                await updateVariant.mutateAsync(formData as VariantUpdateInput);
            } else {
                await createVariant.mutateAsync(formData as VariantInput);
            }

            setIsModalVisible(false);
            setEditingVariant(null);
            form.resetFields();
        } catch (error) {
            console.error('Lỗi khi lưu biến thể:', error);
        }
    };

    const handleEdit = (variant: Variant) => {
        setEditingVariant(variant);
        form.setFieldsValue({
            so_luong: variant.so_luong,
            gia: variant.gia,
            gia_khuyen_mai: variant.gia_khuyen_mai,
            attributes: variant.attributeValues.map(attr => ({
                thuoc_tinh_id: attr.thuoc_tinh_id,
                gia_tri: attr.gia_tri,
            })),
        });
        setIsModalVisible(true);
    };

    const handleAdd = () => {
        setEditingVariant(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Title level={2}>Quản lý biến thể sản phẩm</Title>
                    <Text className="text-gray-600">
                        Quản lý các biến thể (size, màu sắc, giá) của sản phẩm
                    </Text>
                </div>
                <div className="flex space-x-2">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                    >
                        Thêm biến thể
                    </Button>
                    <Button onClick={() => navigate(-1)}>
                        Quay lại
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{variants.length}</div>
                        <div className="text-gray-600">Biến thể hoạt động</div>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{deletedVariants.length}</div>
                        <div className="text-gray-600">Biến thể đã xóa</div>
                    </div>
                </Card>
                <Card>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {variants.filter(v => v.so_luong > 0).length}
                        </div>
                        <div className="text-gray-600">Còn hàng</div>
                    </div>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultActiveKey="active">
                <TabPane
                    tab={
                        <span>
                            Biến thể hoạt động
                            <Badge count={variants.length} className="ml-2" />
                        </span>
                    }
                    key="active"
                >
                    <Card>
                        <Table
                            rowKey="id"
                            loading={isLoading}
                            dataSource={variants}
                            columns={columns}
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                    `${range[0]}-${range[1]} của ${total} biến thể`,
                            }}
                            scroll={{ x: 1200 }}
                        />
                    </Card>
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            Biến thể đã xóa
                            <Badge count={deletedVariants.length} className="ml-2" />
                        </span>
                    }
                    key="deleted"
                >
                    <Card>
                        <Table
                            rowKey="id"
                            loading={deletedLoading}
                            dataSource={deletedVariants}
                            columns={deletedColumns}
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                    `${range[0]}-${range[1]} của ${total} biến thể đã xóa`,
                            }}
                            scroll={{ x: 1200 }}
                        />
                    </Card>
                </TabPane>
            </Tabs>

            {/* Modal thêm/sửa biến thể */}
            <Modal
                title={editingVariant ? 'Sửa biến thể' : 'Thêm biến thể mới'}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingVariant(null);
                    form.resetFields();
                }}
                footer={null}
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        attributes: [{ thuoc_tinh_id: undefined, gia_tri: '' }],
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            label="Số lượng"
                            name="so_luong"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                        >
                            <InputNumber min={0} className="w-full" />
                        </Form.Item>

                        <Form.Item
                            label="Giá gốc"
                            name="gia"
                            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
                        >
                            <InputNumber
                                min={0}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={() => 0}
                                className="w-full"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Giá khuyến mãi"
                            name="gia_khuyen_mai"
                        >
                            <InputNumber
                                min={0}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={() => 0}
                                className="w-full"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh biến thể"
                            name="hinh_anh"
                        >
                            <Upload
                                listType="picture-card"
                                maxCount={4}
                                beforeUpload={() => false}
                                accept="image/*"
                            >
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </div>

                    <Form.List name="attributes">
                        {(fields, { add, remove }) => (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <Text strong>Thuộc tính</Text>
                                    <Button type="dashed" onClick={() => add()}>
                                        Thêm thuộc tính
                                    </Button>
                                </div>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} className="flex items-center space-x-2 mb-2">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'thuoc_tinh_id']}
                                            rules={[{ required: true, message: 'Chọn thuộc tính' }]}
                                            className="flex-1"
                                        >
                                            <Select placeholder="Chọn thuộc tính">
                                                {attributes.map((attr: { id: number; ten: string }) => (
                                                    <Select.Option key={attr.id} value={attr.id}>
                                                        {attr.ten}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'gia_tri']}
                                            rules={[{ required: true, message: 'Nhập giá trị' }]}
                                            className="flex-1"
                                        >
                                            <Input placeholder="Giá trị" />
                                        </Form.Item>
                                        {fields.length > 1 && (
                                            <Button
                                                type="text"
                                                danger
                                                onClick={() => remove(name)}
                                            >
                                                Xóa
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Form.List>

                    <div className="flex justify-end space-x-2 mt-6">
                        <Button
                            onClick={() => {
                                setIsModalVisible(false);
                                setEditingVariant(null);
                                form.resetFields();
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={createVariant.isPending || updateVariant.isPending}
                        >
                            {editingVariant ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default QuanLyBienThe; 