import React, { useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Switch,
  message,
  Card,
  Divider,
} from "antd";
import dayjs from "dayjs";
import { useDiscountCodeDetail, useUpdateDiscountCode } from "../../../hooks/useDiscountCodes";
import { useParams } from "react-router-dom";
import { useProducts } from "../../../hooks/useProduct";

export default function EditDiscountCodePage() {
  const [form] = Form.useForm();
  const id = useParams().id;
  const { data, isLoading } = useDiscountCodeDetail(id);
  const { mutate, isPending } = useUpdateDiscountCode();
  const { data: products = [], isLoading: loadingProducts } = useProducts();

  // Dùng Form.useWatch để theo dõi thay đổi của field "ap_dung_cho"
  const apDungCho = Form.useWatch("ap_dung_cho", form);

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
      san_pham_id: values.ap_dung_cho === "san_pham" ? values.san_pham_id : null,
      ngay_bat_dau: dayjs(values.ngay_bat_dau).format("YYYY-MM-DD HH:mm:ss"),
      ngay_ket_thuc: dayjs(values.ngay_ket_thuc).format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  if (isLoading || loadingProducts) return <Spin tip="Đang tải dữ liệu..." />;

  return (
    <Card title="Chỉnh sửa mã giảm giá" bordered={false}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Mã" name="ma" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên" name="ten" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Loại" name="loai" rules={[{ required: true }]}>
          <Select
            options={[
              { value: "phan_tram", label: "Phần trăm" },
              { value: "tien", label: "Tiền mặt" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Áp dụng cho"
          name="ap_dung_cho"
          rules={[{ required: true }]}
        >
          <Select
            onChange={() => {
              form.setFieldsValue({ san_pham_id: null }); // reset sản phẩm khi đổi kiểu áp dụng
            }}
            options={[
              { value: "toan_don", label: "Toàn đơn hàng" },
              { value: "san_pham", label: "Sản phẩm cụ thể" },
            ]}
          />
        </Form.Item>

        {/* Dropdown sản phẩm cụ thể nếu được chọn */}
        {apDungCho === "san_pham" && (
          <Form.Item
            label="Sản phẩm áp dụng"
            name="san_pham_id"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Chọn sản phẩm"
              optionFilterProp="label"
              options={products.map((p: any) => ({
                label: `${p.ten} (ID: ${p.id})`,
                value: p.id,
              }))}
            />
          </Form.Item>
        )}

        {/* Các field khác */}
        <Form.Item label="Giá trị" name="gia_tri" rules={[{ required: true }]}>
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) =>
              parseInt((value || "").replace(/[^\d]/g, ""), 10)
            }
          />
        </Form.Item>

        <Form.Item
          label="Giá trị đơn hàng tối thiểu"
          name="gia_tri_don_hang"
          rules={[{ required: true }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")  
            }
            parser={(value) =>
              parseInt((value || "").replace(/[^\d]/g, ""), 10)
            }
          />
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

        <Divider />

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
