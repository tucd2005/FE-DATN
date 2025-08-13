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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center py-12">
      <main className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <Title level={1} className="text-5xl font-extrabold text-gray-900 tracking-tight">
            Liên Hệ Với Chúng Tôi
          </Title>
          <Paragraph className="text-xl text-gray-500 mt-4 max-w-2xl mx-auto">
            Hãy gửi tin nhắn hoặc liên hệ qua các kênh bên dưới, chúng tôi sẽ phản hồi trong thời gian sớm nhất.
          </Paragraph>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          <Card
            className="lg:col-span-2 backdrop-blur-lg bg-white/80 shadow-xl rounded-3xl border border-gray-100/50 transition-transform hover:scale-[1.02]"
            title={<span className="text-2xl font-bold text-gray-900">Gửi Tin Nhắn</span>}
            styles={{
              header: { padding: "20px 32px", borderBottom: "none" },
              body: { padding: "32px" }
            }}
          >
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              autoComplete="off"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  label={<span className="text-base font-medium text-gray-700">Họ</span>}
                  name="firstName"
                  rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                >
                  <Input
                    className="rounded-xl h-12 bg-gray-50 border-gray-200 focus:border-indigo-500 transition-colors"
                    placeholder="Nhập họ"
                  />
                </Form.Item>
                <Form.Item
                  label={<span className="text-base font-medium text-gray-700">Tên</span>}
                  name="lastName"
                  rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                >
                  <Input
                    className="rounded-xl h-12 bg-gray-50 border-gray-200 focus:border-indigo-500 transition-colors"
                    placeholder="Nhập tên"
                  />
                </Form.Item>
              </div>

              <Form.Item
                label={<span className="text-base font-medium text-gray-700">Email</span>}
                name="email"
                rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]}
              >
                <Input
                  className="rounded-xl h-12 bg-gray-50 border-gray-200 focus:border-indigo-500 transition-colors"
                  placeholder="example@email.com"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-base font-medium text-gray-700">Số điện thoại</span>}
                name="phone"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại' },
                  { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải gồm 10 chữ số' }
                ]}
              >
                <Input
                  className="rounded-xl h-12 bg-gray-50 border-gray-200 focus:border-indigo-500 transition-colors"
                  placeholder="+84"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-base font-medium text-gray-700">Chủ đề</span>}
                name="subject"
                rules={[{ required: true, message: 'Vui lòng nhập chủ đề' }]}
              >
                <Input
                  className="rounded-xl h-12 bg-gray-50 border-gray-200 focus:border-indigo-500 transition-colors"
                  placeholder="Chủ đề tin nhắn"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-base font-medium text-gray-700">Loại liên hệ</span>}
                name="type"
                rules={[{ required: true, message: 'Vui lòng chọn loại liên hệ' }]}
              >
                <Select
                  className="rounded-xl h-12"
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
                label={<span className="text-base font-medium text-gray-700">Tin nhắn</span>}
                name="message"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
              >
                <TextArea
                  className="rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 transition-colors"
                  rows={6}
                  placeholder="Nội dung tin nhắn..."
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={loading || sendContact.isPending}
                  className="h-12 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-green-600 text-white hover:scale-105 transition-all"
                >
                  Gửi Tin Nhắn
                </Button>


              </Form.Item>
            </Form>
          </Card>


          <div className="space-y-6">
            {[
              {
                icon: <EnvironmentOutlined className="h-10 w-10 text-indigo-600" />,
                title: "Địa chỉ",
                content: (
                  <>
                    Số 1 Trịnh Văn Bô<br />
                    Nam Từ Liêm<br />
                    TP. Hà Nội, Việt Nam
                  </>
                ),
              },
              {
                icon: <PhoneOutlined className="h-10 w-10 text-indigo-600" />,
                title: "Điện thoại",
                content: (
                  <>
                    Hotline: 1900 1234<br />
                    Di động: 0123 456 789
                  </>
                ),
              },
              {
                icon: <MailOutlined className="h-10 w-10 text-indigo-600" />,
                title: "Email",
                content: (
                  <>
                    Hỗ trợ: support@sportigo.vn<br />
                    Kinh doanh: sales@sportigo.vn
                  </>
                ),
              },
              {
                icon: <ClockCircleOutlined className="h-10 w-10 text-indigo-600" />,
                title: "Giờ làm việc",
                content: (
                  <>
                    Thứ 2 - Thứ 6: 8:00 - 18:00<br />
                    Thứ 7 - Chủ nhật: 9:00 - 17:00
                  </>
                ),
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="backdrop-blur-lg bg-white/80 shadow-md rounded-2xl border border-gray-100/50 transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-start space-x-4 p-6">
                  {item.icon}
                  <div>
                    <Title level={4} className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </Title>
                    <Paragraph className="text-base text-gray-600">
                      {item.content}
                    </Paragraph>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>


        <div className="mt-16">
          <Card
            className="backdrop-blur-lg bg-white/80 shadow-xl rounded-3xl border border-gray-100/50"
            title={<span className="text-2xl font-bold text-gray-900">Bản đồ</span>}
            styles={{
              header: { padding: "20px 32px", borderBottom: "none" },
              body: { padding: "24px" }
            }}
          >
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md">
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 450 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=21.0381298,105.7472618&z=16&output=embed"
                className="absolute inset-0"
              />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}