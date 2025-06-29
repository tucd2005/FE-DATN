import React, { useEffect } from "react";
import { Form, Input, Button, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { useParams, useNavigate } from "react-router-dom";
import { useAttributeDetail, useUpdateAttribute } from "../../../hooks/useAttribute";

const AttributeEditPage = () => {
  const [form] = useForm();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mutate: updateAttribute, isPending } = useUpdateAttribute();
  const { data, isLoading } = useAttributeDetail(id!);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ten: data.ten,
      });
    }
  }, [data, form]);

  const onFinish = (values: any) => {
    updateAttribute({
      id: id!,
      data: values,
    });
  };

  if (isLoading) return <Spin />;

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Tên thuộc tính"
        name="ten"
        rules={[{ required: true, message: "Vui lòng nhập tên thuộc tính" }]}
      >
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isPending}>
        Cập nhật
      </Button>
    </Form>
  );
};

export default AttributeEditPage;
