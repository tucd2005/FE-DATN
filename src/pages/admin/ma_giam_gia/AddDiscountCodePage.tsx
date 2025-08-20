import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Select,
  Switch,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useCreateDiscountCode } from "../../../hooks/useDiscountCodes";
import { useProducts } from "../../../hooks/useProduct";

export default function AddDiscountCodePage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateDiscountCode();
  const [apDungCho, setApDungCho] = useState("toan_don");
  const [loai, setLoai] = useState("phan_tram");

  const { data: products = [], isLoading } = useProducts();

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      ngay_bat_dau: values.ngay_bat_dau
        ? dayjs(values.ngay_bat_dau).format("YYYY-MM-DD HH:mm:ss")
        : null,
      ngay_ket_thuc: values.ngay_ket_thuc
        ? dayjs(values.ngay_ket_thuc).format("YYYY-MM-DD HH:mm:ss")
        : null,
    };

    mutate(payload, {
      onSuccess: () => {
        message.success("Tạo mã giảm giá thành công");
        navigate("/admin/ma-giam-gia");
      },
      onError: (error: any) => {
        if (error.response?.data?.errors) {
          const errorData = error.response.data.errors;
          Object.keys(errorData).forEach((key) => {
            message.error(`${key}: ${errorData[key][0]}`);
          });
        } else {
          message.error("Đã có lỗi xảy ra");
        }
      },
    });
  };

  // Chặn nhập > 100 và validate ngay khi gõ
  const handleGiaTriChange = (value: number | null) => {
    if (loai === "phan_tram") {
      if (value !== null && value > 100) {
        form.setFields([
          {
            name: "gia_tri",
            errors: ["Giá trị % không được vượt quá 100"],
          },
        ]);
      } else {
        form.setFields([
          {
            name: "gia_tri",
            errors: [],
          },
        ]);
      }
    }
  };

  return (
    <div
      style={{
        margin: "0 auto",
        padding: 24,
        background: "#fff",
        borderRadius: 8,
      }}
    >
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
        Thêm mã giảm giá mới
      </h1>
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
        <Form.Item
          label="Mã"
          name="ma"
          rules={[{ required: true, message: "Nhập mã" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tên"
          name="ten"
          rules={[{ required: true, message: "Nhập tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="mo_ta">
          <Input.TextArea rows={3} placeholder="Nhập mô tả mã giảm giá" />
        </Form.Item>

        <Form.Item label="Loại" name="loai" rules={[{ required: true }]}>
          <Select
            onChange={(val) => {
              setLoai(val);
              if (val === "phan_tram") {
                const current = form.getFieldValue("gia_tri");
                if (current > 100) {
                  form.setFieldsValue({ gia_tri: 100 });
                }
              } else {
                form.setFields([{ name: "gia_tri", errors: [] }]);
              }
            }}
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
            onChange={(val) => {
              setApDungCho(val);
              if (val === "toan_don") {
                form.setFieldsValue({ san_pham_id: null });
              }
            }}
            options={[
              { value: "toan_don", label: "Toàn đơn" },
              { value: "san_pham", label: "Sản phẩm cụ thể" },
            ]}
          />
        </Form.Item>

        {apDungCho === "san_pham" && (
          <Form.Item
            label="Chọn sản phẩm"
            name="san_pham_id"
            rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
          >
            <Select
              showSearch
              loading={isLoading}
              placeholder="Chọn sản phẩm"
              optionFilterProp="label"
              options={products.map((p: any) => ({
                label: `${p.ten} (ID: ${p.id})`,
                value: p.id,
              }))}
            />
          </Form.Item>
        )}

        <Form.Item
          label="Giá trị"
          name="gia_tri"
          validateStatus={loai === "phan_tram" && form.getFieldValue("gia_tri") > 100 ? "error" : ""}
          help={loai === "phan_tram" && form.getFieldValue("gia_tri") > 100 ? "Giá trị % không được vượt quá 100" : ""}
          rules={[
            { required: true, message: "Nhập giá trị" },
          ]}
        >
          <InputNumber
            min={0}
            max={loai === "phan_tram" ? 100 : undefined}
            style={{ width: "100%" }}
            value={form.getFieldValue("gia_tri")}
            onChange={(value) => {
              if (loai === "phan_tram") {
                if (value !== null && value > 100) {
                  // Set về 100 ngay để chặn nhập
                  form.setFieldsValue({ gia_tri: 100 });
                } else {
                  form.setFieldsValue({ gia_tri: value });
                }
              } else {
                form.setFieldsValue({ gia_tri: value });
              }
            }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) =>
              parseInt((value || "").replace(/[^\d]/g, ""), 10) || 0
            }
          />
        </Form.Item>

        <Form.Item
          label="Giá trị đơn hàng tối thiểu"
          name="gia_tri_don_hang"
          rules={[{ required: true, message: "Nhập giá trị tối thiểu" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) =>
              parseInt((value || "").replace(/[^\d]/g, ""), 10) || 0
            }
          />
        </Form.Item>

        <Form.Item
          label="Giới hạn (mỗi user)"
          name="gioi_han"
          rules={[{ required: true, message: "Nhập giới hạn" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Ngày bắt đầu"
          name="ngay_bat_dau"
          rules={[{ required: true, message: "Chọn ngày bắt đầu" }]}
        >
          <DatePicker
            showTime
            style={{ width: "100%" }}
            disabledDate={(current) => current && current < dayjs().startOf("day")}
          />
        </Form.Item>

        <Form.Item
          label="Ngày kết thúc"
          name="ngay_ket_thuc"
          rules={[{ required: true, message: "Chọn ngày kết thúc" }]}
        >
          <DatePicker
            showTime
            style={{ width: "100%" }}
            disabledDate={(current) => current && current < dayjs().startOf("day")}
          />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="trang_thai"
          valuePropName="checked"
        >
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
