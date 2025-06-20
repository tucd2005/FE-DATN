// src/components/admin/AdminForm.tsx
import { Form, Input, Button, message } from 'antd';
import React from 'react';

interface Props {
  onSubmit: (data: any) => void;
  loading?: boolean;
}

const AdminForm: React.FC<Props> = ({ onSubmit, loading = false }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className=" mx-auto bg-white p-6 rounded shadow"
    >
      <Form.Item
        label="Họ tên"
        name="fullName"
        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
      >
        <Input placeholder="Nhập họ tên" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Vui lòng nhập email' },
          { type: 'email', message: 'Email không hợp lệ' },
        ]}
      >
        <Input placeholder="Nhập email" />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
        hasFeedback
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>

      <Form.Item
        label="Nhập lại mật khẩu"
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Vui lòng nhập lại mật khẩu' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu không khớp'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Nhập lại mật khẩu" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Tạo tài khoản
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminForm;
