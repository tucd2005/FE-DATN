
import { Table, Button, Tag, Space, Modal, Form, Input } from "antd";
import { useState } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const QuanLyMauSac = () => {
  const [colors, setColors] = useState([
    { id: 1, name: "Đỏ", code: "#FF0000", status: "active" },
    { id: 2, name: "Xanh Lá", code: "#00FF00", status: "inactive" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingColor, setEditingColor] = useState(null);

  const showModal = (color) => {
    setEditingColor(color);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingColor(null);
  };

  const handleSubmit = (values) => {
    if (editingColor) {
      // update
      setColors((prev) =>
        prev.map((color) =>
          color.id === editingColor.id ? { ...color, ...values } : color
        )
      );
    } else {
      // add
      const newColor = {
        id: Date.now(),
        ...values,
        status: "active",
      };
      setColors([...colors, newColor]);
    }
    setIsModalOpen(false);
    setEditingColor(null);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc muốn xóa màu sắc này?",
      onOk: () => {
        setColors(colors.filter((color) => color.id !== id));
      },
    });
  };

  const columns = [
    {
      title: "Tên màu",
      dataIndex: "name",
    },
    {
      title: "Mã màu",
      dataIndex: "code",
      render: (code) => (
        <span>
          <Tag color={code}>{code}</Tag>
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) =>
        status === "active" ? (
          <Tag color="green">Hiển thị</Tag>
        ) : (
          <Tag color="red">Ẩn</Tag>
        ),
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            type="primary"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Danh mục màu sắc</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className="mb-4"
        onClick={() => showModal(null)}
      >
        Thêm màu mới
      </Button>
      <Table columns={columns} dataSource={colors} rowKey="id" />

      <Modal
        title={editingColor ? "Chỉnh sửa màu" : "Thêm màu mới"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editingColor || { name: "", code: "#000000" }}
        >
          <Form.Item
            name="name"
            label="Tên màu"
            rules={[{ required: true, message: "Vui lòng nhập tên màu" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="Mã màu (Hex)"
            rules={[{ required: true, message: "Vui lòng nhập mã màu" }]}
          >
            <Input type="color" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingColor ? "Cập nhật" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLyMauSac;
