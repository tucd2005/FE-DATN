
import { Button, Popconfirm, Tag } from 'antd';

import React from 'react'
import { Table } from 'antd'
import { useAccountList } from '../../../hooks/useAccount';


import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';


const ListAccountAdminPage = () => {
  const { data: accounts = [], isLoading } = useAccountList()
  const navigate = useNavigate()
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
          {status === 'active' ? 'active' : 'inactive'}
        </Tag>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Popconfirm
          title="Xác nhận xoá?"
        
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      )
    }
  ]

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold">Danh sách tài khoản quản trị</h2>
        <Button type="primary"  onClick={() => navigate('/admin/accounts/add')}>
          Thêm tài khoản
        </Button>
      </div>
      <Table columns={columns} dataSource={accounts} rowKey="id" />
    </div>
  )

}

export default ListAccountAdminPage

