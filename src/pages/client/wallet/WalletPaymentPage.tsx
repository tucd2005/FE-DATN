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
    Alert,
    Modal,
    Form,
    InputNumber,
    message,
} from "antd";
import {
    WalletOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useWalletBalance } from "../../../hooks/useClientWallet";
import { formatCurrency } from "../../../utils/formatCurrency";

const { Title, Text, Paragraph } = Typography;

interface WalletPaymentPageProps {
    orderId?: number;
    totalAmount?: number;
    onPaymentSuccess?: (transactionId: number) => void;
    onPaymentCancel?: () => void;
}

const WalletPaymentPage: React.FC<WalletPaymentPageProps> = ({
    orderId,
    totalAmount = 0,
    onPaymentSuccess,
    onPaymentCancel,
}) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [form] = Form.useForm();

    const { data: walletData, isLoading } = useWalletBalance();
    const balance = walletData?.balance || 0;

    const canPay = balance >= totalAmount;

    const handlePayment = async () => {
        if (!canPay) {
            message.error("Số dư không đủ để thanh toán");
            return;
        }

        setIsConfirmModalOpen(true);
    };

    const handleConfirmPayment = async () => {
        try {
            setIsProcessing(true);

            // Mock API call - sau này sẽ thay bằng API thực
            await new Promise(resolve => setTimeout(resolve, 2000));

            message.success("Thanh toán thành công!");
            setIsConfirmModalOpen(false);

            if (onPaymentSuccess) {
                onPaymentSuccess(Math.floor(Math.random() * 10000)); // Mock transaction ID
            }
        } catch (error) {
            message.error("Có lỗi xảy ra khi thanh toán");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
            <Title level={2} style={{ marginBottom: "24px", textAlign: "center" }}>
                <WalletOutlined style={{ marginRight: "8px" }} />
                Thanh toán bằng ví điện tử
            </Title>

            <Row gutter={[24, 24]}>
                {/* Thông tin đơn hàng */}
                <Col xs={24} md={12}>
                    <Card title="Thông tin đơn hàng" style={{ height: "100%" }}>
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            <div>
                                <Text strong>Mã đơn hàng:</Text>
                                <br />
                                <Text code>#{orderId || "N/A"}</Text>
                            </div>

                            <div>
                                <Text strong>Tổng tiền cần thanh toán:</Text>
                                <br />
                                <Text style={{ fontSize: "24px", color: "#1890ff" }}>
                                    {formatCurrency(totalAmount)}
                                </Text>
                            </div>
                        </Space>
                    </Card>
                </Col>

                {/* Thông tin ví */}
                <Col xs={24} md={12}>
                    <Card title="Thông tin ví" style={{ height: "100%" }}>
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            <Statistic
                                title="Số dư hiện tại"
                                value={balance}
                                precision={0}
                                valueStyle={{ color: "#3f8600", fontSize: "24px" }}
                                prefix="₫"
                            />

                            <div>
                                <Text strong>Số tiền còn lại sau thanh toán:</Text>
                                <br />
                                <Text style={{ fontSize: "18px", color: "#52c41a" }}>
                                    {formatCurrency(balance - totalAmount)}
                                </Text>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Divider />

            {/* Cảnh báo và thông báo */}
            {!canPay && (
                <Alert
                    message="Số dư không đủ"
                    description={`Bạn cần nạp thêm ${formatCurrency(totalAmount - balance)} để thanh toán đơn hàng này.`}
                    type="warning"
                    showIcon
                    icon={<ExclamationCircleOutlined />}
                    style={{ marginBottom: "24px" }}
                />
            )}

            {canPay && (
                <Alert
                    message="Số dư đủ để thanh toán"
                    description="Bạn có thể thanh toán đơn hàng này bằng số dư trong ví."
                    type="success"
                    showIcon
                    icon={<CheckCircleOutlined />}
                    style={{ marginBottom: "24px" }}
                />
            )}

            {/* Hướng dẫn */}
            <Card title="Hướng dẫn thanh toán" size="small">
                <ul>
                    <li>Kiểm tra thông tin đơn hàng và số tiền cần thanh toán</li>
                    <li>Xác nhận số dư ví đủ để thanh toán</li>
                    <li>Nhấn "Thanh toán ngay" để hoàn tất giao dịch</li>
                    <li>Tiền sẽ được trừ trực tiếp từ ví của bạn</li>
                    <li>Đơn hàng sẽ được cập nhật trạng thái "Đã thanh toán"</li>
                </ul>
            </Card>

            <Divider />

            {/* Nút thanh toán */}
            <Row justify="center">
                <Space size="large">
                    <Button
                        size="large"
                        onClick={onPaymentCancel}
                    >
                        Hủy
                    </Button>

                    <Button
                        type="primary"
                        size="large"
                        icon={<WalletOutlined />}
                        onClick={handlePayment}
                        disabled={!canPay || isLoading}
                        loading={isLoading}
                    >
                        Thanh toán ngay
                    </Button>
                </Space>
            </Row>

            {/* Modal xác nhận thanh toán */}
            <Modal
                title="Xác nhận thanh toán"
                open={isConfirmModalOpen}
                onOk={handleConfirmPayment}
                onCancel={() => setIsConfirmModalOpen(false)}
                confirmLoading={isProcessing}
                okText="Xác nhận thanh toán"
                cancelText="Hủy"
            >
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <CheckCircleOutlined style={{ fontSize: "48px", color: "#52c41a", marginBottom: "16px" }} />
                    <Title level={4}>Xác nhận thanh toán</Title>
                    <Paragraph>
                        Bạn có chắc chắn muốn thanh toán đơn hàng #{orderId} với số tiền{" "}
                        <Text strong style={{ color: "#1890ff" }}>
                            {formatCurrency(totalAmount)}
                        </Text>{" "}
                        từ ví điện tử?
                    </Paragraph>
                    <Paragraph type="secondary">
                        Số dư còn lại sau thanh toán: {formatCurrency(balance - totalAmount)}
                    </Paragraph>
                </div>
            </Modal>
        </div>
    );
};

export default WalletPaymentPage; 