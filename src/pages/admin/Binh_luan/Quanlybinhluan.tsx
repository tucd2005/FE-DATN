import React from 'react';
import { Table, Button, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export interface Comment {
  key: number;
  product: string;
  user: string;
  date: string;
  content: string;
  status: boolean;
}

interface Props {
  data: Comment[];
  onToggleStatus: (key: number, checked: boolean) => void;
}

const CommentTable: React.FC<Props> = ({ data, onToggleStatus }) => {
  const columns: ColumnsType<Comment> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: 60,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Người dùng',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Ngày bình luận',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
    },
      {
        title: 'Trạng thái',
        key: 'status',
        render: (_, record) => (
          <div className="flex items-center space-x-2">
            <span>{record.status ? 'Hiện' : 'Ẩn'}</span>
            <Switch
              checked={record.status}
              onChange={(checked) => onToggleStatus(record.key, checked)}
            />
          </div>
        ),
      },
    {
      title: 'Hành động',
      key: 'action',
      render: () => (
        <Button type="primary" style={{ backgroundColor: '#1890ff', color: '#ffffff' }}>
        chi tiết
      </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />;
};

export default CommentTable;