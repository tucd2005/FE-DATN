import React, { useState } from "react";
import {
    Modal,
    Form,
    Button,
    Typography,
    Space,
    Card,
    Divider,
    message,
    Alert,
} from "antd";
import { WalletOutlined, CreditCardOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useWalletBalance } from "../../../hooks/useClientWallet";

const { Title, Text } = Typography;

interface WalletPaymentModalProps {
    open: boolean;
    onCancel: () => void;
    onSuccess: (paymentMethod: string) => void;
    orderTotal: number;
    orderId: number;
    orderItems?: Array<{
        id: number;
        name: string;
        quantity: number;
        price: number;
    }>;
}

const WalletPaymentModal: React.FC<WalletPaymentModalProps> = ({
    open,
    onCancel,
    onSuccess,
    orderTotal,
    orderId,
    orderItems = [],
}) => {
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);

    const { data: walletData } = useWalletBalance();
    const balance = walletData?.data?.balance || 0;

    const canPayWithWallet = balance >= orderTotal;

    const handlePayment = async (method: string) => {
        setIsProcessing(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            message.success(`Thanh toán bằng ${method} thành công!`);
            onSuccess(method);
        } catch (error) {
            message.error("Có lỗi xảy ra khi thanh toán");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCancel = () => {
        onCancel();
        setPaymentMethod("");
        setIsProcessing(false);
    };

    return (
        <Modal
            title={
                <Space>
                    <CreditCardOutlined />
                    <span>Chọn phương thức thanh toán</span>
                </Space>
            }
            open={open}
            onCancel={handleCancel}
            footer={null}
            width={600}
        >
            <div style={{ marginBottom: "24px" }}>
                <Card size="small" style={{ background: "#f6f8fa" }}>
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                        <div>
                            <Text strong>Mã đơn hàng:</Text> #{orderId}
                        </div>
                        <div>
                            <Text strong>Tổng tiền:</Text> {orderTotal.toLocaleString()} ₫
                        </div>
                        <div>
                            <Text strong>Số dư ví:</Text> {balance.toLocaleString()} ₫
                        </div>
                    </Space>
                </Card>
            </div>

            {!canPayWithWallet && (
                <Alert
                    message="Số dư không đủ"
                    description={`Số dư ví của bạn (${balance.toLocaleString()} ₫) không đủ để thanh toán đơn hàng này (${orderTotal.toLocaleString()} ₫). Vui lòng nạp thêm tiền hoặc chọn phương thức thanh toán khác.`}
                    type="warning"
                    showIcon
                    style={{ marginBottom: "16px" }}
                />
            )}

            <div style={{ marginBottom: "24px" }}>
                <Title level={5}>Phương thức thanh toán</Title>

                <Space direction="vertical" style={{ width: "100%" }}>
                    {/* Thanh toán bằng ví */}
                    <Card
                        size="small"
                        style={{
                            cursor: canPayWithWallet ? "pointer" : "not-allowed",
                            border: paymentMethod === "wallet" ? "2px solid #52c41a" : "1px solid #d9d9d9",
                            background: paymentMethod === "wallet" ? "#f6ffed" : "white",
                            opacity: canPayWithWallet ? 1 : 0.6,
                        }}
                        onClick={() => canPayWithWallet && setPaymentMethod("wallet")}
                    >
                        <Space>
                            <WalletOutlined style={{ color: "#52c41a", fontSize: "20px" }} />
                            <div>
                                <div style={{ fontWeight: "bold" }}>Thanh toán bằng ví điện tử</div>
                                <div style={{ fontSize: "12px", color: "#666" }}>
                                    Số dư: {balance.toLocaleString()} ₫
                                    {!canPayWithWallet && " (Không đủ)"}
                                </div>
                            </div>
                            {paymentMethod === "wallet" && (
                                <CheckCircleOutlined style={{ color: "#52c41a" }} />
                            )}
                        </Space>
                    </Card>

                    {/* Thanh toán bằng thẻ */}
                    <Card
                        size="small"
                        style={{
                            cursor: "pointer",
                            border: paymentMethod === "card" ? "2px solid #1890ff" : "1px solid #d9d9d9",
                            background: paymentMethod === "card" ? "#f0f8ff" : "white",
                        }}
                        onClick={() => setPaymentMethod("card")}
                    >
                        <Space>
                            <CreditCardOutlined style={{ color: "#1890ff", fontSize: "20px" }} />
                            <div>
                                <div style={{ fontWeight: "bold" }}>Thẻ tín dụng/ghi nợ</div>
                                <div style={{ fontSize: "12px", color: "#666" }}>
                                    Visa, Mastercard, JCB
                                </div>
                            </div>
                            {paymentMethod === "card" && (
                                <CheckCircleOutlined style={{ color: "#1890ff" }} />
                            )}
                        </Space>
                    </Card>

                    {/* Chuyển khoản ngân hàng */}
                    <Card
                        size="small"
                        style={{
                            cursor: "pointer",
                            border: paymentMethod === "bank" ? "2px solid #722ed1" : "1px solid #d9d9d9",
                            background: paymentMethod === "bank" ? "#f9f0ff" : "white",
                        }}
                        onClick={() => setPaymentMethod("bank")}
                    >
                        <Space>
                            <CreditCardOutlined style={{ color: "#722ed1", fontSize: "20px" }} />
                            <div>
                                <div style={{ fontWeight: "bold" }}>Chuyển khoản ngân hàng</div>
                                <div style={{ fontSize: "12px", color: "#666" }}>
                                    Vietcombank, BIDV, Techcombank,...
                                </div>
                            </div>
                            {paymentMethod === "bank" && (
                                <CheckCircleOutlined style={{ color: "#722ed1" }} />
                            )}
                        </Space>
                    </Card>
                </Space>
            </div>

            <Divider />

            <div style={{ textAlign: "right" }}>
                <Space>
                    <Button onClick={handleCancel}>
                        Hủy
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => handlePayment(paymentMethod)}
                        loading={isProcessing}
                        disabled={!paymentMethod}
                    >
                        {paymentMethod === "wallet" && "Thanh toán bằng ví"}
                        {paymentMethod === "card" && "Thanh toán bằng thẻ"}
                        {paymentMethod === "bank" && "Chuyển khoản"}
                        {!paymentMethod && "Chọn phương thức"}
                    </Button>
                </Space>
            </div>

            <div style={{ marginTop: "16px", background: "#f6f8fa", padding: "12px", borderRadius: "6px" }}>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                    <strong>Lưu ý:</strong>
                    <ul style={{ margin: "8px 0 0 20px" }}>
                        <li>Thanh toán bằng ví sẽ được xử lý ngay lập tức</li>
                        <li>Thanh toán bằng thẻ và chuyển khoản có thể mất 1-2 phút</li>
                        <li>Đơn hàng sẽ được xử lý sau khi thanh toán thành công</li>
                    </ul>
                </Text>
            </div>
        </Modal>
    );
};

export default WalletPaymentModal; 