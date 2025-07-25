
import { Button, Input, Form, Card, Typography } from "antd";
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Title level={1} className="text-4xl font-bold mb-4">
            Liên hệ với chúng tôi
          </Title>
          <Paragraph className="text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các kênh dưới đây.
          </Paragraph>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card
            title="Gửi tin nhắn"
            headStyle={{ padding: "16px", fontSize: "1.5rem", fontWeight: "bold" }}
            bodyStyle={{ padding: "24px" }}
          >
            <Form layout="vertical" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Form.Item label="Họ" name="firstName">
                  <Input placeholder="Nhập họ" />
                </Form.Item>
                <Form.Item label="Tên" name="lastName">
                  <Input placeholder="Nhập tên" />
                </Form.Item>
              </div>

              <Form.Item label="Email" name="email">
                <Input type="email" placeholder="example@email.com" />
              </Form.Item>

              <Form.Item label="Số điện thoại" name="phone">
                <Input placeholder="0123456789" />
              </Form.Item>

              <Form.Item label="Chủ đề" name="subject">
                <Input placeholder="Chủ đề tin nhắn" />
              </Form.Item>

              <Form.Item label="Tin nhắn" name="message">
                <TextArea placeholder="Nội dung tin nhắn..." rows={5} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" size="large" block>
                  Gửi tin nhắn
                </Button>
              </Form.Item>
            </Form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card bodyStyle={{ padding: "24px" }}>
              <div className="flex items-start space-x-4">
                <EnvironmentOutlined className="h-6 w-6 text-primary mt-1" />
                <div>
                  <Title level={4} className="font-semibold mb-2">
                    Địa chỉ
                  </Title>
                  <Paragraph className="text-muted-foreground">
                    123 Nguyễn Văn Linh
                    <br />
                    Phường 1, Quận 7
                    <br />
                    TP. Hồ Chí Minh, Việt Nam
                  </Paragraph>
                </div>
              </div>
            </Card>

            <Card bodyStyle={{ padding: "24px" }}>
              <div className="flex items-start space-x-4">
                <PhoneOutlined className="h-6 w-6 text-primary mt-1" />
                <div>
                  <Title level={4} className="font-semibold mb-2">
                    Điện thoại
                  </Title>
                  <Paragraph className="text-muted-foreground">
                    Hotline: 1900 1234
                    <br />
                    Di động: 0123 456 789
                  </Paragraph>
                </div>
              </div>
            </Card>

            <Card bodyStyle={{ padding: "24px" }}>
              <div className="flex items-start space-x-4">
                <MailOutlined className="h-6 w-6 text-primary mt-1" />
                <div>
                  <Title level={4} className="font-semibold mb-2">
                    Email
                  </Title>
                  <Paragraph className="text-muted-foreground">
                    Hỗ trợ: support@fashionstore.vn
                    <br />
                    Kinh doanh: sales@fashionstore.vn
                  </Paragraph>
                </div>
              </div>
            </Card>

            <Card bodyStyle={{ padding: "24px" }}>
              <div className="flex items-start space-x-4">
                <ClockCircleOutlined className="h-6 w-6 text-primary mt-1" />
                <div>
                  <Title level={4} className="font-semibold mb-2">
                    Giờ làm việc
                  </Title>
                  <Paragraph className="text-muted-foreground">
                    Thứ 2 - Thứ 6: 8:00 - 18:00
                    <br />
                    Thứ 7 - Chủ nhật: 9:00 - 17:00
                  </Paragraph>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
             <Card
            title="Bản đồ"
            headStyle={{ padding: "16px", fontSize: "1.5rem", fontWeight: "bold" }}
            bodyStyle={{ padding: "24px" }}
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