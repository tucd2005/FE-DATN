import React from "react";
import {
  Table,
  Button,
  Tag,
  Popconfirm,
  Space,
  Card,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  UndoOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  useDeletedAttributeList,
  useRestoreAttributeFromTrash,
  useForceDeleteAttributeFromTrash,
} from "../../../hooks/useAttribute";

const { Title, Text } = Typography;

const AttributeDeletedListPage: React.FC = () => {
  const { data: attributes, isLoading } = useDeletedAttributeList();
  const restoreAttribute = useRestoreAttributeFromTrash();
  const forceDeleteAttribute = useForceDeleteAttributeFromTrash();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (id: number) => <Tag color="blue">{id}</Tag>,
    },
    {
      title: "Tên thuộc tính",
      dataIndex: "ten",
      key: "ten",
      render: (ten: string) => (
        <Text strong className="text-gray-800">
          {ten}
        </Text>
      ),
    },
    {
      title: "Ngày xóa",
      dataIndex: "deleted_at",
      key: "deleted_at",
      width: 180,
      render: (date: string) => (
        <Text className="text-red-500 text-sm font-medium">
          {new Date(date).toLocaleDateString("vi-VN")}
        </Text>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      width: 220,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<UndoOutlined />}
            onClick={() => restoreAttribute.mutate(record.id)}
            loading={restoreAttribute.isPending}
        
          >
            Khôi phục
          </Button>
          
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <Title level={2} className="flex items-center">
          <span className="mr-3">🗑️</span> Thuộc tính đã xóa
        </Title>  
        <Text className="text-gray-600">
          Quản lý các thuộc tính đã được xóa mềm. Bạn có thể khôi phục hoặc xóa vĩnh viễn.
        </Text>
      </div>

      {/* Stats Card */}
      <div className="mb-6">
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <div className="flex items-center">
            <div>
              <Text className="text-gray-600">Tổng số thuộc tính đã xóa:</Text>
              <div className="text-2xl font-bold text-red-600">
                {attributes?.length || 0}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <Table
          rowKey="id"
          loading={isLoading}
          dataSource={attributes || []}
          columns={columns}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} thuộc tính`,
          }}
          scroll={{ x: 800 }}
          className="custom-table"
        />
      </Card>

      {/* Empty State */}
      {!isLoading && (!attributes || attributes.length === 0) && (
        <Card className="text-center py-12 mt-6">
          <div className="text-6xl mb-4">🗑️</div>
          <Title level={3} className="text-gray-600 mb-2">
            Không có thuộc tính nào đã xóa
          </Title>
          <Text className="text-gray-500">
            Tất cả các thuộc tính đang hoạt động bình thường.
          </Text>
        </Card>
      )}
    </div>
  );
};

export default AttributeDeletedListPage;
