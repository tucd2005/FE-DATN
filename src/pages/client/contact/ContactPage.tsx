import { Button, Input, Form, Card, Typography, Select, message } from "antd";
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useSendContact, useContactTypes } from "../../../hooks/useContact";
import { useState } from 'react';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function ContactPage() {
  const [form] = Form.useForm();
  const sendContact = useSendContact();
  const { data: types, isLoading: typesLoading } = useContactTypes();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const fullName = `${values.firstName || ''} ${values.lastName || ''}`.trim();
      await sendContact.mutateAsync({
        name: fullName,
        email: values.email,
        phone: values.phone,
        subject: values.subject,
        message: values.message,
        type: values.type,
      });
      message.success('Gửi liên hệ thành công!');
      form.resetFields();
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      if (errors) {
        Object.values(errors).forEach((msgArr: any) => message.error(msgArr[0]));
      } else {
        message.error('Đã có lỗi xảy ra. Vui lòng thử lại!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Title level={1} className="text-4xl font-bold mb-4">Liên hệ với chúng tôi</Title>
          <Paragraph className="text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các kênh dưới đây.
          </Paragraph>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card
            title="Gửi tin nhắn"
            styles={{
              header: { padding: "16px", fontSize: "1.5rem", fontWeight: "bold" },
              body: { padding: "24px" }
            }}
          >
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              autoComplete="off"
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  label="Họ"
                  name="firstName"
                  rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                >
                  <Input placeholder="Nhập họ" />
                </Form.Item>
                <Form.Item
                  label="Tên"
                  name="lastName"
                  rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                >
                  <Input placeholder="Nhập tên" />
                </Form.Item>
              </div>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]}
              >
                <Input placeholder="example@email.com" />
              </Form.Item>

              <Form.Item label="Số điện thoại" name="phone">
                <Input placeholder="0123456789" />
              </Form.Item>

              <Form.Item
                label="Chủ đề"
                name="subject"
                rules={[{ required: true, message: 'Vui lòng nhập chủ đề' }]}
              >
                <Input placeholder="Chủ đề tin nhắn" />
              </Form.Item>

              <Form.Item
                label="Loại liên hệ"
                name="type"
                rules={[{ required: true, message: 'Vui lòng chọn loại liên hệ' }]}
              >
                <Select
                  placeholder="Chọn loại liên hệ"
                  loading={typesLoading}
                  allowClear
                >
                  {types &&
                    Object.entries(types).map(([key, label]) => (
                      <Option key={key} value={key}>{label}</Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Tin nhắn"
                name="message"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
              >
                <TextArea rows={5} placeholder="Nội dung tin nhắn..." />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={loading || sendContact.isPending}
                >
                  Gửi tin nhắn
                </Button>
              </Form.Item>
            </Form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <div className="flex items-start space-x-4">
                <EnvironmentOutlined className="h-6 w-6 text-primary mt-1" />
                <div>
                  <Title level={4}>Địa chỉ</Title>
                  <Paragraph className="text-muted-foreground">
                    123 Nguyễn Văn Linh<br />
                    Phường 1, Quận 7<br />
                    TP. Hồ Chí Minh, Việt Nam
                  </Paragraph>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <PhoneOutlined className="h-6 w-6 text-primary mt-1" />
                <div>
                  <Title level={4}>Điện thoại</Title>
                  <Paragraph className="text-muted-foreground">
                    Hotline: 1900 1234<br />
                    Di động: 0123 456 789
                  </Paragraph>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <MailOutlined className="h-6 w-6 text-primary mt-1" />
                <div>
                  <Title level={4}>Email</Title>
                  <Paragraph className="text-muted-foreground">
                    Hỗ trợ: support@fashionstore.vn<br />
                    Kinh doanh: sales@fashionstore.vn
                  </Paragraph>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <ClockCircleOutlined className="h-6 w-6 text-primary mt-1" />
                <div>
                  <Title level={4}>Giờ làm việc</Title>
                  <Paragraph className="text-muted-foreground">
                    Thứ 2 - Thứ 6: 8:00 - 18:00<br />
                    Thứ 7 - Chủ nhật: 9:00 - 17:00
                  </Paragraph>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-12">
          <Card
            title="Bản đồ"
            styles={{
              header: { padding: "16px", fontSize: "1.5rem", fontWeight: "bold" },
              body: { padding: "24px" }
            }}
          >
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 350 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=21.0381298,105.7472618&z=16&output=embed"
              />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
