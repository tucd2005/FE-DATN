import React, { useState } from "react";
import {
    Card,
    Row,
    Col,
    Button,
    Typography,
    Space,
    Statistic,
    Divider,
    Modal,
    Form,
    Input,
    Select,
    InputNumber,
    message,
    Spin,
} from "antd";
import {
    WalletOutlined,
    PlusOutlined,
    MinusOutlined,
    HistoryOutlined,
} from "@ant-design/icons";
import { useWalletBalance, useWithdraw } from "../../../hooks/useClientWallet";
import { formatCurrency } from "../../../utils/formatCurrency";

const { Title, Text } = Typography;
const { Option } = Select;

const WalletPage: React.FC = () => {
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [withdrawForm] = Form.useForm();

    const { data: walletData, isLoading } = useWalletBalance();
    const { mutate: withdraw, isPending: isWithdrawing } = useWithdraw();

    const handleWithdraw = async () => {
        try {
            const values = await withdrawForm.validateFields();
            withdraw(values);
            setIsWithdrawModalOpen(false);
            withdrawForm.resetFields();
        } catch (error) {
            // Form validation failed
        }
    };

    const balance = walletData?.balance || 0;

    return (
        <div style={{ padding: "24px" }}>
            <Title level={2} style={{ marginBottom: "24px" }}>
                <WalletOutlined style={{ marginRight: "8px" }} />
                Ví điện tử
            </Title>

            <Row gutter={[24, 24]}>
                {/* Thông tin số dư */}
                <Col xs={24} lg={12}>
                    <Card>
                        <Statistic
                            title="Số dư hiện tại"
                            value={balance}
                            precision={0}
                            valueStyle={{ color: "#3f8600", fontSize: "32px" }}
                            prefix="₫"
                            suffix={
                                <Text type="secondary" style={{ fontSize: "14px" }}>
                                    VND
                                </Text>
                            }
                        />
                        <div style={{ marginTop: "16px" }}>
                            <Text type="secondary">
                                Số dư có thể sử dụng để thanh toán đơn hàng hoặc rút về tài khoản ngân hàng
                            </Text>
                        </div>
                    </Card>
                </Col>

                {/* Các chức năng chính */}
                <Col xs={24} lg={12}>
                    <Card title="Thao tác">
                        <Space direction="vertical" style={{ width: "100%" }} size="middle">
                            <Button
                                type="primary"
                                size="large"
                                icon={<MinusOutlined />}
                                onClick={() => setIsWithdrawModalOpen(true)}
                                style={{ width: "100%", height: "48px" }}
                                disabled={balance < 50000}
                            >
                                Rút tiền từ ví
                            </Button>

                            <Button
                                size="large"
                                icon={<HistoryOutlined />}
                                style={{ width: "100%", height: "48px" }}
                                onClick={() => window.location.href = "/vi-dien-tu/lich-su"}
                            >
                                Lịch sử giao dịch
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Divider />

            {/* Thông tin bổ sung */}
            <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                    <Card title="Hướng dẫn rút tiền" size="small">
                        <ul>
                            <li>Số tiền rút tối thiểu: 50,000₫</li>
                            <li>Nhập thông tin tài khoản ngân hàng</li>
                            <li>Chờ admin duyệt (1-3 ngày làm việc)</li>
                            <li>Tiền sẽ được chuyển về tài khoản</li>
                        </ul>
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card title="Lưu ý" size="small">
                        <ul>
                            <li>Ví chỉ dành cho khách hàng đã đăng ký</li>
                            <li>Mọi giao dịch đều được ghi nhận</li>
                            <li>Liên hệ hỗ trợ nếu có vấn đề</li>
                        </ul>
                    </Card>
                </Col>
            </Row>



            {/* Modal rút tiền */}
            <Modal
                title="Rút tiền từ ví"
                open={isWithdrawModalOpen}
                onOk={handleWithdraw}
                onCancel={() => {
                    setIsWithdrawModalOpen(false);
                    withdrawForm.resetFields();
                }}
                confirmLoading={isWithdrawing}
                okText="Gửi yêu cầu"
                cancelText="Hủy"
            >
                <Form form={withdrawForm} layout="vertical">
                    <Form.Item
                        label="Số tiền rút"
                        name="amount"
                        rules={[
                            { required: true, message: "Vui lòng nhập số tiền" },
                            { type: "number", min: 50000, message: "Số tiền tối thiểu là 50,000₫" },
                            {
                                validator: (_, value) => {
                                    if (value && value > balance) {
                                        return Promise.reject(new Error("Số dư không đủ"));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            placeholder="Nhập số tiền"
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                            min={50000}
                            max={balance}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Tên ngân hàng"
                        name="bank_name"
                        rules={[{ required: true, message: "Vui lòng nhập tên ngân hàng" }]}
                    >
                        <Input placeholder="VD: Vietcombank, BIDV, Techcombank..." />
                    </Form.Item>

                    <Form.Item
                        label="Số tài khoản"
                        name="bank_account"
                        rules={[{ required: true, message: "Vui lòng nhập số tài khoản" }]}
                    >
                        <Input placeholder="Nhập số tài khoản ngân hàng" />
                    </Form.Item>

                    <Form.Item
                        label="Tên chủ tài khoản"
                        name="acc_name"
                        rules={[{ required: true, message: "Vui lòng nhập tên chủ tài khoản" }]}
                    >
                        <Input placeholder="Nhập tên chủ tài khoản" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default WalletPage; 