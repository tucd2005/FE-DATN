import React from "react";
import { Form, Input, InputNumber, Button, DatePicker, Select, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useCreateDiscountCode } from "../../../hooks/useDiscountCodes";

export default function AddDiscountCodePage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateDiscountCode();

  const onFinish = (values: any) => {
    mutate(
      {
        ...values,
        san_pham_id: values.san_pham_id || null,
        ngay_bat_dau: dayjs(values.ngay_bat_dau).format("YYYY-MM-DD HH:mm:ss"),
        ngay_ket_thuc: dayjs(values.ngay_ket_thuc).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        onSuccess: () => {
          navigate("/admin/ma-giam-gia"); // điều hướng về trang danh sách
        },
      }
    );
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24, background: "#fff", borderRadius: 8 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Thêm mã giảm giá mới</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          trang_thai: true,
          ap_dung_cho: "toan_don",
          loai: "phan_tram",
        }}
      >
        <Form.Item label="Mã" name="ma" rules={[{ required: true, message: "Nhập mã" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Tên" name="ten" rules={[{ required: true, message: "Nhập tên" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Loại" name="loai" rules={[{ required: true }]}>
          <Select options={[
            { value: "phan_tram", label: "Phần trăm" },
            { value: "tien_mat", label: "Tiền mặt" }
          ]} />
        </Form.Item>
        <Form.Item label="Áp dụng cho" name="ap_dung_cho" rules={[{ required: true }]}>
          <Select options={[
            { value: "toan_don", label: "Toàn đơn" },
            { value: "san_pham", label: "Sản phẩm cụ thể" }
          ]} />
        </Form.Item>
        <Form.Item label="ID Sản phẩm (nếu có)" name="san_pham_id">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Giá trị" name="gia_tri" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Giá trị đơn hàng tối thiểu" name="gia_tri_don_hang" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Số lượng" name="so_luong" rules={[{ required: true }]}>
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Giới hạn (mỗi user)" name="gioi_han" rules={[{ required: true }]}>
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu" name="ngay_bat_dau" rules={[{ required: true }]}>
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Ngày kết thúc" name="ngay_ket_thuc" rules={[{ required: true }]}>
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Trạng thái" name="trang_thai" valuePropName="checked">
          <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
