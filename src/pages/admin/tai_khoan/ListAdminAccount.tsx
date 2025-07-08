import {  Tag, Table } from 'antd';
import React from 'react';
import { useAccountList } from '../../../hooks/useAccount';


const ListAccountAdminPage = () => {
  const { data: accounts = [], isLoading } = useAccountList();


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
    
  ];

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold">Danh sách tài khoản quản trị</h2>
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
