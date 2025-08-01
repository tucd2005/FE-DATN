import React, { useState } from "react";
import {
    Card,
    Row,
    Col,
    Form,
    Input,
    Button,
    Typography,
    Space,
    Radio,
    Divider,
    message,
    Steps,
    Result,
} from "antd";
import {
    WalletOutlined,
    CreditCardOutlined,
    BankOutlined,
    QrcodeOutlined,
} from "@ant-design/icons";
import { useWalletBalance } from "../../../hooks/useClientWallet";

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const DepositPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("zalo");
    const [form] = Form.useForm();

    const { data: walletData, isLoading } = useWalletBalance();
    const balance = walletData?.data?.balance || 0;

    const paymentMethods = [
        {
            key: "zalo",
            title: "ZaloPay",
            icon: <QrcodeOutlined />,
            description: "Thanh toán nhanh chóng qua ZaloPay",
            color: "#0068ff",
        },
        {
            key: "bank",
            title: "Chuyển khoản ngân hàng",
            icon: <BankOutlined />,
            description: "Chuyển khoản trực tiếp đến tài khoản ngân hàng",
            color: "#52c41a",
        },
        {
            key: "card",
            title: "Thẻ tín dụng/ghi nợ",
            icon: <CreditCardOutlined />,
            description: "Thanh toán qua thẻ Visa, Mastercard",
            color: "#722ed1",
        },
    ];

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log("Deposit values:", values);

            // Mock API call
            message.success("Yêu cầu nạp tiền đã được gửi thành công!");
            setCurrentStep(2);
        } catch (error) {
            console.error("Form validation failed:", error);
        }
    };

    const renderPaymentForm = () => {
        switch (paymentMethod) {
            case "zalo":
                return (
                    <div style={{ textAlign: "center", padding: "40px 0" }}>
                        <div
                            style={{
                                width: "200px",
                                height: "200px",
                                background: "#f0f0f0",
                                margin: "0 auto 20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "8px",
                            }}
                        >
                            <QrcodeOutlined style={{ fontSize: "80px", color: "#0068ff" }} />
                        </div>
                        <Text type="secondary">
                            Quét mã QR để thanh toán qua ZaloPay
                        </Text>
                        <br />
                        <Text type="secondary">
                            Hoặc nhập mã: <strong>ZALO123456</strong>
                        </Text>
                    </div>
                );

            case "bank":
                return (
                    <div style={{ padding: "20px 0" }}>
                        <Card style={{ background: "#f6f8fa" }}>
                            <Title level={4}>Thông tin tài khoản ngân hàng</Title>
                            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                <div>
                                    <Text strong>Ngân hàng:</Text> Vietcombank
                                </div>
                                <div>
                                    <Text strong>Số tài khoản:</Text> 1234567890
                                </div>
                                <div>
                                    <Text strong>Chủ tài khoản:</Text> CÔNG TY TNHH SHOP QUẦN ÁO THỂ THAO
                                </div>
                                <div>
                                    <Text strong>Nội dung chuyển khoản:</Text> NAPTIEN_[SỐ ĐIỆN THOẠI]
                                </div>
                            </Space>
                        </Card>
                        <Divider />
                        <Form.Item
                            label="Số tiền chuyển khoản"
                            name="bank_amount"
                            rules={[
                                { required: true, message: "Vui lòng nhập số tiền" },
                                { type: "number", min: 10000, message: "Số tiền tối thiểu là 10,000₫" },
                            ]}
                        >
                            <Input
                                type="number"
                                placeholder="Nhập số tiền đã chuyển khoản"
                                addonAfter="₫"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mã giao dịch"
                            name="transaction_id"
                            rules={[{ required: true, message: "Vui lòng nhập mã giao dịch" }]}
                        >
                            <Input placeholder="Nhập mã giao dịch từ ngân hàng" />
                        </Form.Item>
                    </div>
                );

            case "card":
                return (
                    <div style={{ padding: "20px 0" }}>
                        <Form.Item
                            label="Số thẻ"
                            name="card_number"
                            rules={[
                                { required: true, message: "Vui lòng nhập số thẻ" },
                                { pattern: /^\d{16}$/, message: "Số thẻ phải có 16 chữ số" },
                            ]}
                        >
                            <Input placeholder="1234 5678 9012 3456" maxLength={16} />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Ngày hết hạn"
                                    name="expiry_date"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập ngày hết hạn" },
                                        { pattern: /^\d{2}\/\d{2}$/, message: "Định dạng: MM/YY" },
                                    ]}
                                >
                                    <Input placeholder="MM/YY" maxLength={5} />
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="CVV"
                                    name="cvv"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập CVV" },
                                        { pattern: /^\d{3,4}$/, message: "CVV phải có 3-4 chữ số" },
                                    ]}
                                >
                                    <Input placeholder="123" maxLength={4} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            label="Tên chủ thẻ"
                            name="card_holder"
                            rules={[{ required: true, message: "Vui lòng nhập tên chủ thẻ" }]}
                        >
                            <Input placeholder="NGUYEN VAN A" />
                        </Form.Item>
                    </div>
                );

            default:
                return null;
        }
    };

    const steps = [
        {
            title: "Chọn phương thức",
            content: (
                <div style={{ padding: "20px 0" }}>
                    <Radio.Group
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{ width: "100%" }}
                    >
                        <Space direction="vertical" style={{ width: "100%" }}>
                            {paymentMethods.map((method) => (
                                <Radio.Button
                                    key={method.key}
                                    value={method.key}
                                    style={{
                                        width: "100%",
                                        height: "80px",
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "16px",
                                        border: `2px solid ${paymentMethod === method.key ? method.color : "#d9d9d9"
                                            }`,
                                    }}
                                >
                                    <Space size="large">
                                        <div style={{ color: method.color, fontSize: "24px" }}>
                                            {method.icon}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                                                {method.title}
                                            </div>
                                            <div style={{ color: "#666", fontSize: "14px" }}>
                                                {method.description}
                                            </div>
                                        </div>
                                    </Space>
                                </Radio.Button>
                            ))}
                        </Space>
                    </Radio.Group>
                </div>
            ),
        },
        {
            title: "Nhập thông tin",
            content: (
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Số tiền nạp"
                        name="amount"
                        rules={[
                            { required: true, message: "Vui lòng nhập số tiền" },
                            { type: "number", min: 10000, message: "Số tiền tối thiểu là 10,000₫" },
                        ]}
                    >
                        <Input
                            type="number"
                            placeholder="Nhập số tiền muốn nạp"
                            addonAfter="₫"
                        />
                    </Form.Item>
                    {renderPaymentForm()}
                </Form>
            ),
        },
        {
            title: "Hoàn thành",
            content: (
                <Result
                    status="success"
                    title="Yêu cầu nạp tiền đã được gửi thành công!"
                    subTitle="Chúng tôi sẽ xử lý yêu cầu của bạn trong thời gian sớm nhất."
                    extra={[
                        <Button
                            type="primary"
                            key="wallet"
                            onClick={() => window.location.href = "/wallet"}
                        >
                            Về trang ví
                        </Button>,
                        <Button key="history" onClick={() => window.location.href = "/wallet/history"}>
                            Xem lịch sử
                        </Button>,
                    ]}
                />
            ),
        },
    ];

    return (
        <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
            <Title level={2} style={{ marginBottom: "24px", textAlign: "center" }}>
                <WalletOutlined style={{ marginRight: "8px" }} />
                Nạp tiền vào ví
            </Title>

            {/* Hiển thị số dư hiện tại */}
            <Card style={{ marginBottom: "24px", textAlign: "center" }}>
                <Text style={{ fontSize: "16px" }}>Số dư hiện tại: </Text>
                <Text strong style={{ fontSize: "20px", color: "#1890ff" }}>
                    {balance.toLocaleString()} ₫
                </Text>
            </Card>

            {/* Steps */}
            <Card>
                <Steps current={currentStep} style={{ marginBottom: "24px" }}>
                    {steps.map((step) => (
                        <Step key={step.title} title={step.title} />
                    ))}
                </Steps>

                <div style={{ minHeight: "300px" }}>{steps[currentStep].content}</div>

                <div style={{ marginTop: "24px", textAlign: "right" }}>
                    {currentStep > 0 && (
                        <Button
                            style={{ marginRight: 8 }}
                            onClick={() => setCurrentStep(currentStep - 1)}
                        >
                            Quay lại
                        </Button>
                    )}
                    {currentStep < steps.length - 1 && (
                        <Button
                            type="primary"
                            onClick={() => {
                                if (currentStep === 0) {
                                    setCurrentStep(currentStep + 1);
                                } else {
                                    handleSubmit();
                                }
                            }}
                        >
                            {currentStep === 0 ? "Tiếp tục" : "Xác nhận nạp tiền"}
                        </Button>
                    )}
                </div>
            </Card>

            {/* Thông tin lưu ý */}
            <Card style={{ marginTop: "24px" }}>
                <Title level={4}>Lưu ý quan trọng</Title>
                <ul>
                    <li>Số tiền nạp tối thiểu: 10,000₫</li>
                    <li>Thời gian xử lý: Ngay lập tức (ZaloPay) / 1-2 giờ (Chuyển khoản)</li>
                    <li>Phí nạp tiền: Miễn phí</li>
                    <li>Vui lòng kiểm tra kỹ thông tin trước khi xác nhận</li>
                    <li>Liên hệ hỗ trợ nếu gặp vấn đề: 1900-xxxx</li>
                </ul>
            </Card>
        </div>
    );
};

export default DepositPage; 