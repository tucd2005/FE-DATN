import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Space, Table, Tag } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const initialData: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const QuanLySanPham: React.FC = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newProduct: DataType = {
        key: Date.now().toString(),
        name: values.name,
        age: values.age,
        address: values.address,
        tags: values.tags ? values.tags.split(',').map((tag: string) => tag.trim()) : [],
      };
      setData((prev) => [...prev, newProduct]);
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  return (
    <div>
      {/* Nút Thêm sản phẩm */}
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={showModal}>
          Thêm sản phẩm
        </Button>
      </div>

      {/* Modal Thêm sản phẩm */}
      <Modal
        title="Thêm sản phẩm mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tuổi"
            name="age"
            rules={[{ required: true, message: 'Vui lòng nhập tuổi!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Tags (phân cách bằng dấu phẩy)" name="tags">
            <Input placeholder="ví dụ: cool, smart" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Bảng hiển thị sản phẩm */}
      <Table<DataType>
        dataSource={data}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          },
          {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
              <>
                {tags.map((tag) => {
                  let color = tag.length > 5 ? 'geekblue' : 'green';
                  if (tag === 'loser') color = 'volcano';
                  return (
                    <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })}
              </>
            ),
          },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
};

export default QuanLySanPham;



