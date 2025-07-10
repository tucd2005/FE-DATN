import React from 'react';
import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, DeleteOutlined, EyeOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';
import { useDeleteAttribute, useList } from '../../../hooks/useAttribute';

// Định nghĩa kiểu dữ liệu của 1 attribute
interface Attribute {
  id: number;
  ten: string;
  deleted_at: string | null;
  isLoading:any;

}

const AttributeListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: attributes = [], isLoading } = useList();
  const { mutate: deleteAttribute, isLoading: isDeleting } = useDeleteAttribute();

  const columns: ColumnsType<Attribute> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Tên thuộc tính',
      dataIndex: 'ten',
      key: 'ten',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'deleted_at',
      key: 'status',
      render: (deleted_at: string | null) => (
        <Tag color={deleted_at ? 'red' : 'green'}>
          {deleted_at ? 'Đã xóa' : 'Đang hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          {/* Nút xem giá trị thuộc tính */}
          <Button
            icon={<DatabaseOutlined />}
            size="small"
            onClick={() => navigate(`/admin/gia-tri/thuoc-tinh/${record.id}`)}
          />
          {/* Nút chỉnh sửa */}
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => navigate(`/admin/thuoc-tinh/${record.id}/edit`)}
          />
          {/* Nút xóa */}
          <Popconfirm
            title="Bạn có chắc muốn xóa thuộc tính này?"
            onConfirm={() => deleteAttribute(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
              loading={isDeleting}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Danh sách thuộc tính</h1>
        <div className="space-x-2">
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate('/admin/thuoc-tinh/deleted')}
          >
            Thuộc tính đã xóa
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/admin/thuoc-tinh/add')}
          >
            Thêm thuộc tính
          </Button>
        </div>
      </div>
      <Table
        loading={isLoading}
        dataSource={attributes}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

export default AttributeListPage;
