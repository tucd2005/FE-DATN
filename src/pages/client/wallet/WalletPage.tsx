import React, { useState } from "react";
import {
    Card,
    Row,
    Col,
    Statistic,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Table,
    Tag,
    Typography,
    Space,
    message,
} from "antd";
import {
    WalletOutlined,
    HistoryOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { useWalletBalance, useWithdraw, useWalletTransactionHistory } from "../../../hooks/useClientWallet";

const { Title, Text } = Typography;
const { Option } = Select;

const WalletPage: React.FC = () => {
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [form] = Form.useForm();

    const { data: walletData, isLoading } = useWalletBalance();
    const { mutate: withdraw, isPending: isWithdrawing } = useWithdraw();
    const { data: transactionData, isLoading: isLoadingTransactions } = useWalletTransactionHistory();

    const balance = walletData?.data?.balance || 0;
    const transactions = transactionData?.data || [];

    const handleWithdraw = async () => {
        try {
            const values = await form.validateFields();
            withdraw(values);
            setIsWithdrawModalOpen(false);
            form.resetFields();
        } catch {
            // Form validation failed
        }
    };

    // Sử dụng dữ liệu từ API
    const transactionHistory = transactions;

    const columns = [
        {
            title: "Loại giao dịch",
            dataIndex: "type",
            key: "type",
            render: (type: string) => (
                <Tag color={type === "deposit" ? "green" : "blue"}>
                    {type === "deposit" ? "Nạp tiền" : "Rút tiền"}
                </Tag>
            ),
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "amount",
            render: (amount: number) => (
                <Text strong style={{ color: amount > 0 ? "#52c41a" : "#1890ff" }}>
                    {amount.toLocaleString()} ₫
                </Text>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                const color =
                    status === "success"
                        ? "green"
                        : status === "pending"
                            ? "orange"
                            : "red";
                const text =
                    status === "success"
                        ? "Thành công"
                        : status === "pending"
                            ? "Đang xử lý"
                            : "Thất bại";
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Thời gian",
            dataIndex: "created_at",
            key: "created_at",
            render: (date: string) => new Date(date).toLocaleString("vi-VN"),
        },
    ];

    return (
        <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
            <Title level={2} style={{ marginBottom: "24px", textAlign: "center" }}>
                <WalletOutlined style={{ marginRight: "8px" }} />
                Ví điện tử của tôi
            </Title>

            {/* Thông tin số dư */}
            <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
                <Col xs={24} md={12}>
                    <Card
                        style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                        }}
                    >
                        <Statistic
                            title={
                                <Text style={{ color: "white", fontSize: "18px" }}>
                                    Số dư hiện tại
                                </Text>
                            }
                            value={balance}
                            precision={0}
                            valueStyle={{ color: "white", fontSize: "32px" }}
                            suffix="₫"
                            prefix={<WalletOutlined style={{ color: "white" }} />}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card>
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            <Button
                                type="primary"
                                size="large"
                                icon={<PlusOutlined />}
                                style={{ width: "100%", height: "50px" }}
                                onClick={() => message.info("Tính năng nạp tiền đã được tạm thời vô hiệu hóa")}
                                disabled
                            >
                                Nạp tiền
                            </Button>
                            <Button
                                size="large"
                                style={{ width: "100%", height: "50px" }}
                                onClick={() => setIsWithdrawModalOpen(true)}
                                disabled={balance < 50000}
                            >
                                Rút tiền
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>

            {/* Lịch sử giao dịch */}
            <Card
                title={
                    <Space>
                        <HistoryOutlined />
                        <span>Lịch sử giao dịch</span>
                    </Space>
                }
            >
                <Table
                    dataSource={transactionHistory}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                    loading={isLoading || isLoadingTransactions}
                />
            </Card>

            {/* Modal rút tiền */}
            <Modal
                title="Rút tiền về tài khoản ngân hàng"
                open={isWithdrawModalOpen}
                onOk={handleWithdraw}
                onCancel={() => {
                    setIsWithdrawModalOpen(false);
                    form.resetFields();
                }}
                confirmLoading={isWithdrawing}
                okText="Xác nhận rút tiền"
                cancelText="Hủy"
                width={600}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Số tiền rút"
                        name="amount"
                        rules={[
                            { required: true, message: "Vui lòng nhập số tiền" },
                            { type: "number", min: 50000, message: "Số tiền tối thiểu là 50,000₫" },
                            {
                                validator: (_, value) => {
                                    if (value > balance) {
                                        return Promise.reject("Số dư không đủ");
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input
                            type="number"
                            placeholder="Nhập số tiền muốn rút"
                            addonAfter="₫"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ngân hàng"
                        name="bank_name"
                        rules={[{ required: true, message: "Vui lòng chọn ngân hàng" }]}
                    >
                        <Select placeholder="Chọn ngân hàng">
                            <Option value="Vietcombank">Vietcombank</Option>
                            <Option value="BIDV">BIDV</Option>
                            <Option value="Agribank">Agribank</Option>
                            <Option value="Techcombank">Techcombank</Option>
                            <Option value="MB Bank">MB Bank</Option>
                            <Option value="ACB">ACB</Option>
                            <Option value="VPBank">VPBank</Option>
                            <Option value="TPBank">TPBank</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Số tài khoản"
                        name="bank_account"
                        rules={[
                            { required: true, message: "Vui lòng nhập số tài khoản" },
                            { pattern: /^\d+$/, message: "Số tài khoản chỉ được chứa số" },
                        ]}
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

                    <div style={{ background: "#f6f8fa", padding: "12px", borderRadius: "6px" }}>
                        <Text type="secondary">
                            <strong>Lưu ý:</strong>
                            <ul style={{ margin: "8px 0 0 20px" }}>
                                <li>Số tiền rút tối thiểu: 50,000₫</li>
                                <li>Thời gian xử lý: 1-3 ngày làm việc</li>
                                <li>Phí rút tiền: Miễn phí</li>
                                <li>Vui lòng kiểm tra kỹ thông tin tài khoản trước khi xác nhận</li>
                            </ul>
                        </Text>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default WalletPage; 