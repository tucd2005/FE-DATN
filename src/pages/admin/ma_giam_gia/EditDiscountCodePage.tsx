import React, { use, useEffect } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Select, Spin, Switch, message } from "antd";
import dayjs from "dayjs";
import { useDiscountCodeDetail, useUpdateDiscountCode } from "../../../hooks/useDiscountCodes";
import { useParams } from "react-router-dom";


export default function EditDiscountCodePage() {
  const [form] = Form.useForm();
const id= useParams().id; // Lấy id từ URL
  const { data, isLoading } = useDiscountCodeDetail(id);
  const { mutate, isPending } = useUpdateDiscountCode();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        ngay_bat_dau: dayjs(data.ngay_bat_dau),
        ngay_ket_thuc: dayjs(data.ngay_ket_thuc),
      });
    }
  }, [data, form]);

  const onFinish = (values: any) => {
    mutate({
      id,
      ...values,
      san_pham_id: values.san_pham_id || null,
      ngay_bat_dau: dayjs(values.ngay_bat_dau).format("YYYY-MM-DD HH:mm:ss"),
      ngay_ket_thuc: dayjs(values.ngay_ket_thuc).format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  if (isLoading) return <Spin tip="Đang tải dữ liệu..." />;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item label="Mã" name="ma" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Tên" name="ten" rules={[{ required: true }]}>
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
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
}
