import React from 'react'
import { Table, Card, Spin, Alert, Tag } from 'antd'
import { useList } from '../../../hooks/useAttribute'



const AttributeList: React.FC = () => {
  const { data, isLoading, isError } = useList()

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
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'deleted_at',
      key: 'deleted_at',
      render: (deleted_at: string | null) =>
        deleted_at ? <Tag color="red">Đã xoá</Tag> : <Tag color="green">Hoạt động</Tag>,
    },
  ]

  if (isLoading) return <Spin tip="Đang tải thuộc tính..." />

  if (isError) return <Alert type="error" message="Lỗi khi tải thuộc tính" />

  return (
    <Card title="Danh sách thuộc tính" bordered={false}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  )
}

export default AttributeList
