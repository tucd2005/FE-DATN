import React from "react";
import { Form, Input, DatePicker, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateStaff } from "../../../hooks/useAccount";
import dayjs from "dayjs";

export default function AddStaffPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate: createStaff, isPending } = useCreateStaff();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const payload = {
        ...values,
        ngay_sinh: values.ngay_sinh ? dayjs(values.ngay_sinh).format("YYYY-MM-DD") : undefined,
      };
      createStaff(payload, {
        onSuccess: () => {
          navigate("/admin/account_staff"); // quay lại trang danh sách staff
        }
      });
    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Card title="Thêm nhân viên mới">
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Họ tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Email không hợp lệ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="so_dien_thoai"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="ngay_sinh" label="Ngày sinh">
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit} loading={isPending}>
              Thêm mới
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => navigate(-1)} // quay lại
            >
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
