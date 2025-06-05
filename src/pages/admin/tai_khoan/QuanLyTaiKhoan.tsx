import React, { useState } from 'react';
import { Table, Button, Input, Select, Space, Popconfirm, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const dataFake = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'a@gmail.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'b@yahoo.com',
    role: 'user',
    status: 'inactive',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'c@gmail.com',
    role: 'staff',
    status: 'active',
  },
];

const QuanLyTaiKhoan = () => {
  const [data, setData] = useState(dataFake);
  const [keyword, setKeyword] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleSearch = (value) => {
    setKeyword(value.toLowerCase());
  };

  const handleRoleFilter = (value) => {
    setFilterRole(value);
  };

  const filteredData = data.filter(
    (item) =>
      (item.name.toLowerCase().includes(keyword) ||
        item.email.toLowerCase().includes(keyword)) &&
      (filterRole ? item.role === filterRole : true)
  );

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'red' : role === 'staff' ? 'blue' : 'green'}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'volcano'}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} type="primary" size="small">
            Sửa
          </Button>
          <Popconfirm title="Xoá tài khoản này?" onConfirm={() => handleDelete(record.id)}>
            <Button icon={<DeleteOutlined />} danger size="small">
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý tài khoản</h2>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Tìm theo tên hoặc email"
          onSearch={handleSearch}
          allowClear
          enterButton
        />
        <Select
          placeholder="Lọc theo vai trò"
          onChange={handleRoleFilter}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="admin">Admin</Option>
          <Option value="staff">Nhân viên</Option>
          <Option value="user">Người dùng</Option>
        </Select>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default QuanLyTaiKhoan;
