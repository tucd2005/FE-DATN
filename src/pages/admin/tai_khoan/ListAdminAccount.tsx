import { Button, Popconfirm, Tag, Table } from 'antd';
import React from 'react';
import { useAccountList, useBlockUser, useUnblockUser } from '../../../hooks/useAccount';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';

const ListAccountAdminPage = () => {
  const { data: accounts = [], isLoading } = useAccountList();
  const navigate = useNavigate();
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
        <Tag color={status === 'active' ? 'green' : status === 'blocked' ? 'red' : 'gray'}>
          {status === 'active' ? 'Active' : status === 'blocked' ? 'Blocked' : 'Inactive'}
        </Tag>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <>
          {record.trang_thai !== 'blocked' ? (
            <Popconfirm
              title="Xác nhận khóa tài khoản này?"
              okText="Khóa"
              cancelText="Hủy"
              onConfirm={() =>
                blockUser({
                  id: record.id,
                  data: { ly_do_block: 'Khóa bởi admin', block_den_ngay: null }
                })
              }
            >
              <Button
                icon={<LockOutlined />}
                loading={isBlocking}
              >
                Khóa
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Xác nhận mở khóa tài khoản này?"
              okText="Mở khóa"
              cancelText="Hủy"
              onConfirm={() => unblockUser(record.id)}
            >
              <Button
                type="primary"
                icon={<UnlockOutlined />}
                loading={isUnblocking}
              >
                Mở khóa
              </Button>
            </Popconfirm>
          )}
        </>
      )
    }
  ];

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold">Danh sách tài khoản quản trị</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/admin/accounts/add')}
        >
          Thêm tài khoản
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={accounts}
        rowKey="id"
        loading={isLoading}
      />
    </div>
  );
};

export default ListAccountAdminPage;
