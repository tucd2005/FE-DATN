// src/components/admin/AdminTable.tsx
import { Button, Table, Tag } from 'antd';
import React from 'react';

import { EllipsisOutlined } from '@ant-design/icons';
const data = [
  {
    key: '1',
    name: 'Hà Thị Quỳnh PH47250',
    email: 'quynhthph47250@fpt.edu.vn',
    sdt:"040340304",
    dia_chi:"hà nội",
    status: 'Hoạt động',
    activated: 'Đã kích hoạt',
    updatedAt: '03/04/2025 20:50:42',
  },
];

const AccountUseTable = () => {
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'sdt',
      dataIndex: 'sdt',
      key: 'sdt',
    },
    {
      title: 'dia_chi',
      dataIndex: 'dia_chi',
      key: 'dia_chi',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Hoạt động' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Kích hoạt',
      dataIndex: 'activated',
      key: 'activated',
      render: (activated: string) => (
        <Tag color="green">{activated}</Tag>
      ),
    },
    {
      title: 'Ngày sửa cuối',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Chức năng',
      key: 'action',
      render: (_: any, record: any) =>   <Button icon={<EllipsisOutlined />} />,
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />;
};




export default AccountUseTable;
