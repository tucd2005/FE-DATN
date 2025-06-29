import React from 'react';
import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { useDeleteAttribute, useList } from '../../../hooks/useAttribute';

const AttributeListPage = () => {
  const navigate = useNavigate();
  const { data: attributes, isLoading } = useList();
  const { mutate: deleteAttribute, isLoading: isDeleting } = useDeleteAttribute();

  const columns = [
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
      render: (deleted_at) => (
        <Tag color={deleted_at ? 'red' : 'green'}>
          {deleted_at ? 'Đã xóa' : 'Đang hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          {/* Nút chỉnh sửa nếu cần */}
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => navigate(`/admin/thuoc-tinh/${record.id}/edit`)}
          />
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
