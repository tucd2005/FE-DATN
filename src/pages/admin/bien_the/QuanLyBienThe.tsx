import React, { useState } from 'react';
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  Select,
  InputNumber,
  Space,
  Popconfirm,
  Tag,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const initialData = [
  {
    id: 1,
    color: 'Đỏ',
    size: 'M',
    price: 200000,
    stock: 10,
  },
  {
    id: 2,
    color: 'Xanh',
    size: 'L',
    price: 210000,
    stock: 5,
  },
  {
    id: 3,
    color: 'Đen',
    size: 'XL',
    price: 220000,
    stock: 3,
  },
];

const QuanLyBienThe = () => {
  const [variants, setVariants] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  const [form] = Form.useForm();
  const [filterColor, setFilterColor] = useState('');

  const showModal = (variant = null) => {
    setEditingVariant(variant);
    setIsModalOpen(true);
    form.setFieldsValue(variant || {
      color: '',
      size: '',
      price: 0,
      stock: 0,
    });
  };

  const handleDelete = (id) => {
    setVariants(variants.filter((item) => item.id !== id));
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingVariant) {
        // Cập nhật
        setVariants(
          variants.map((item) =>
            item.id === editingVariant.id ? { ...item, ...values } : item
          )
        );
      } else {
        // Thêm mới
        const newVariant = {
          id: Date.now(),
          ...values,
        };
        setVariants([...variants, newVariant]);
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingVariant(null);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingVariant(null);
  };

  const filteredVariants = variants.filter((item) =>
    filterColor ? item.color === filterColor : true
  );

  const columns = [
    {
      title: 'Màu sắc',
      dataIndex: 'color',
      key: 'color',
      render: (color) => <Tag color="blue">{color}</Tag>,
    },
    {
      title: 'Kích thước',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Giá (VNĐ)',
      dataIndex: 'price',
      key: 'price',
      render: (price) => price.toLocaleString() + ' ₫',
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            size="small"
            onClick={() => showModal(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn chắc chắn muốn xoá biến thể này?"
            onConfirm={() => handleDelete(record.id)}
          >
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
      <h2>Quản lý biến thể sản phẩm</h2>

      <Space style={{ marginBottom: 16 }}>
        <Select
          placeholder="Lọc theo màu sắc"
          allowClear
          onChange={(value) => setFilterColor(value)}
          style={{ width: 200 }}
        >
          <Option value="Đỏ">Đỏ</Option>
          <Option value="Xanh">Xanh</Option>
          <Option value="Đen">Đen</Option>
        </Select>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Thêm biến thể
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredVariants}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingVariant ? 'Chỉnh sửa biến thể' : 'Thêm biến thể'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Huỷ"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="color" label="Màu sắc" rules={[{ required: true }]}>
            <Select placeholder="Chọn màu">
              <Option value="Đỏ">Đỏ</Option>
              <Option value="Xanh">Xanh</Option>
              <Option value="Đen">Đen</Option>
            </Select>
          </Form.Item>
          <Form.Item name="size" label="Kích thước" rules={[{ required: true }]}>
            <Select placeholder="Chọn size">
              <Option value="S">S</Option>
              <Option value="M">M</Option>
              <Option value="L">L</Option>
              <Option value="XL">XL</Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              formatter={(val) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(val) => val.replace(/\₫|\./g, '')}
            />
          </Form.Item>
          <Form.Item name="stock" label="Tồn kho" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLyBienThe;
