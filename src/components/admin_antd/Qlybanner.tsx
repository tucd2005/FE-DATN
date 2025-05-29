import React from 'react';
import { Table, Button, Popconfirm, message } from 'antd';

const Qlybanner: React.FC = () => {
  const dataSource = [
    {
      id: 1,
      name: 'Giày Nike Air',
      price: 1200000,
      category: 'Thể thao',
    },
    {
      id: 2,
      name: 'Áo Hoodie',
      price: 550000,
      category: 'Thời trang',
    },
  ];

  const handleDelete = (id: number) => {
    message.success(`Đã xóa sản phẩm ID: ${id}`);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quản lý sản phẩm</h2>

      <Table
        dataSource={dataSource}
        rowKey="id"
        columns={[
          {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `${price.toLocaleString()} đ`,
          },
          {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
          },
          {
            title: 'Hành động',
            key: 'actions',
            render: (_: any, record: any) => (
              <>
                <Button type="link">Sửa</Button>
                <Popconfirm
                  title="Bạn có chắc muốn xóa?"
                  onConfirm={() => handleDelete(record.id)}
                >
                  <Button type="link" danger>Xóa</Button>
                </Popconfirm>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Qlybanner;
