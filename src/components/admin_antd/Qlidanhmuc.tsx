import { Form, Input, InputNumber, Modal, Table, Button } from 'antd';
import React, { useState } from 'react';

const Qlidanhmuc = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái mở modal

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // xử lý thêm ở đây (ví dụ submit form)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-end p-3">
        <Button
          // className="bg-blue-600 text-white"
          type="primary"
          onClick={showModal} // 👉 Bắt sự kiện mở modal
        >
          Thêm sản phẩm
        </Button>
      </div>

      <Modal
        title="Thêm sản phẩm mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form layout="vertical">
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

      <Table
        columns={[
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: 'Tên', dataIndex: 'ten', key: 'ten' },
          { title: 'Mô tả', dataIndex: 'mo_ta', key: 'mo_ta' },
          { title: 'Slug', dataIndex: 'slug', key: 'slug' },
          { title: 'Ngày tạo', dataIndex: 'ngay_tao', key: 'ngay_tao' },
          { title: 'Ngày cập nhật', dataIndex: 'ngay_cap_nhat', key: 'ngay_cap_nhat' },
          { title: 'Trạng thái', dataIndex: 'trang_thai', key: 'trang_thai' },
        ]}
      />
    </>
  );
};

export default Qlidanhmuc;
