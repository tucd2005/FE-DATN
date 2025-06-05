import React, { useEffect } from 'react';
import { Form, Input, InputNumber, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';

interface VoucherFormProps {
  initialValues?: {
    name?: string;
    code?: string;
    discountPercent?: number;
    maxDiscount?: number;
    quantity?: number;
    description?: string;
    startDate?: string;
    endDate?: string;
  };
  onFinish?: (values: any) => void;
}

const VoucherForm: React.FC<VoucherFormProps> = ({ initialValues, onFinish }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        startDate: initialValues.startDate ? dayjs(initialValues.startDate) : null,
        endDate: initialValues.endDate ? dayjs(initialValues.endDate) : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-8xl">
        <h2 className="text-2xl font-bold mb-6">Thêm voucher</h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên voucher"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên voucher' }]}
          >
            <Input placeholder="Nhập tên voucher" />
          </Form.Item>

          <Form.Item
            label="Mã voucher"
            name="code"
            rules={[{ required: true, message: 'Vui lòng nhập mã voucher' }]}
          >
            <Input placeholder="Nhập mã voucher" />
          </Form.Item>

          <Form.Item
            label="Phần trăm giảm (%)"
            name="discountPercent"
            rules={[
              { required: true, message: 'Vui lòng nhập phần trăm giảm giá' },
              { type: 'number', min: 0, max: 100, message: 'Giá trị phải từ 0 đến 100' },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} placeholder="Nhập phần trăm giảm" />
          </Form.Item>

          <Form.Item
            label="Giảm tối đa (VNĐ)"
            name="maxDiscount"
            rules={[{ required: true, message: 'Vui lòng nhập số tiền giảm tối đa' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập số tiền giảm tối đa" />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng voucher' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập số lượng voucher" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={4} placeholder="Nhập mô tả (nếu có)" />
          </Form.Item>

          <Form.Item
            label="Thời gian bắt đầu"
            name="startDate"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu' }]}
          >
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Thời gian kết thúc"
            name="endDate"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian kết thúc' }]}
          >
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" style={{ backgroundColor: "#1473FF", color: "white" }} htmlType="submit" block>
              Lưu voucher
            </Button>
          </Form.Item>
        </Form>
      </div>

  );
};

export default VoucherForm;
