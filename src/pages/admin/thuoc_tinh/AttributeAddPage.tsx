import { Form, Input, Button, Card } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useCreateAttribute } from '../../../hooks/useAttribute';

const AttributeAddPage = () => {
  const { mutate, isLoading } = useCreateAttribute();
  const navigate = useNavigate();

  const onFinish = (values) => {
    mutate(values, {
      onSuccess: () => {
        navigate('/admin/thuoc-tinh');
      },
    });
  };

  return (
    <Card title="Thêm thuộc tính" className=" mx-auto mt-6">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên thuộc tính"
          name="ten"
          rules={[{ required: true, message: 'Vui lòng nhập tên thuộc tính' }]}
        >
          <Input placeholder="Nhập tên thuộc tính" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Thêm
        </Button>
      </Form>
    </Card>
  );
};

export default AttributeAddPage;
