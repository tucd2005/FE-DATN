import React, { useState } from 'react';
import { Table, Button, Tag, Modal, Form, Input, message } from 'antd';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { useAccountListuser, useBlockUser, useUnblockUser } from '../../../hooks/useAccount';

const ListAccountUsePage = () => {
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data, isLoading } = useAccountListuser(page, perPage);
  const { mutate: blockUser, isPending: isBlocking } = useBlockUser();
  const { mutate: unblockUser, isPending: isUnblocking } = useUnblockUser();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [form] = Form.useForm();

  const handleOpenBlockModal = (user: any) => {
    setSelectedUser(user);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleBlockSubmit = () => {
    form.validateFields().then(values => {
      blockUser(
        {
          id: selectedUser.id,
          data: {
            ly_do_block: values.ly_do_block,
            block_den_ngay: null
          }
        },
        {
          onSuccess: () => {
            message.success("Khóa tài khoản thành công");
            setIsModalVisible(false);
            setSelectedUser(null);
          },
          onError: () => {
            message.error("Có lỗi xảy ra khi khóa tài khoản");
          }
        }
      );
    });
  };

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
          {status === 'active'
            ? 'Đang hoạt động'
            : status === 'blocked'
            ? 'Đã khóa'
            : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) =>
        record.trang_thai !== 'blocked' ? (
          <Button
            icon={<LockOutlined />}
            loading={isBlocking}
            onClick={() => handleOpenBlockModal(record)}
          >
            Khóa
          </Button>
        ) : (
          <Button
            type="primary"
            icon={<UnlockOutlined />}
            loading={isUnblocking}
            onClick={() => unblockUser(record.id)}
          >
            Mở khóa
          </Button>
        ),
    },
  ];
console.log(data);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Danh sách tài khoản người dùng</h2>
      <Table
        columns={columns}
        dataSource={data?.users || []}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: data?.pagination?.current_page || page,
          pageSize: data?.pagination?.per_page || perPage,
          total: data?.pagination?.total || 0,
          onChange: (p) => setPage(p),
        }}
      />

      {/* Modal nhập lý do block */}
      <Modal
        title={`Khóa tài khoản: ${selectedUser?.name || ''}`}
        open={isModalVisible}
        onOk={handleBlockSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText="Xác nhận khóa"
        cancelText="Hủy"
        confirmLoading={isBlocking}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="ly_do_block"
            label="Lý do khóa"
            rules={[{ required: true, message: 'Vui lòng nhập lý do khóa' }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập lý do khóa tài khoản..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListAccountUsePage;
