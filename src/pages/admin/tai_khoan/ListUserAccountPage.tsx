import React, { useState } from 'react';
import { Table, Button, Popconfirm, Tag } from 'antd';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { useAccountListuser, useBlockUser, useUnblockUser } from '../../../hooks/useAccount';

const ListAccountUsePage = () => {
const [page, setPage] = useState(1);
const perPage = 10;

const { data, isLoading } = useAccountListuser(page, perPage);
  const { mutate: blockUser, isPending: isBlocking } = useBlockUser();
  const { mutate: unblockUser, isPending: isUnblocking } = useUnblockUser();

  const columns = [
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'SĐT', dataIndex: 'so_dien_thoai', key: 'so_dien_thoai' },
    { title: 'Vai trò', dataIndex: 'ten_vai_tro', key: 'ten_vai_tro' },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      key: 'trang_thai',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Đang hoạt động' : status === 'blocked' ? 'Đã khóa' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) =>
        record.trang_thai !== 'blocked' ? (
          <Popconfirm
            title="Xác nhận khóa tài khoản này?"
            okText="Khóa"
            cancelText="Hủy"
            onConfirm={() => blockUser({ id: record.id, data: { ly_do_block: 'Khóa bởi admin', block_den_ngay: null } })}
          >
            <Button icon={<LockOutlined />} loading={isBlocking}>Khóa</Button>
          </Popconfirm>
        ) : (
          <Popconfirm
            title="Xác nhận mở khóa tài khoản này?"
            okText="Mở khóa"
            cancelText="Hủy"
            onConfirm={() => unblockUser(record.id)}
          >
            <Button type="primary" icon={<UnlockOutlined />} loading={isUnblocking}>Mở khóa</Button>
          </Popconfirm>
        )
    }
  ];

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Danh sách tài khoản người dùng</h2>
      <Table
  columns={columns}
  dataSource={data?.data || []}
  rowKey="id"
  loading={isLoading}
  pagination={{
    current: data?.current_page || page,
    pageSize: perPage,
    total: data?.total || 0,
    onChange: (p) => setPage(p)
  }}
/>
    </div>
  );
};

export default ListAccountUsePage;
