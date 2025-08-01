import React, { useState } from "react";
import {
    Modal,
    Form,
    InputNumber,
    Button,
    Typography,
    Space,
    message,
    Card,
    Divider,
} from "antd";
import { WalletOutlined, RollbackOutlined } from "@ant-design/icons";
import { useRefund, useWalletBalance } from "../../../hooks/useClientWallet";

const { Title, Text } = Typography;

interface RefundModalProps {
    open: boolean;
    onCancel: () => void;
    orderId: number;
    orderTotal: number;
    orderItems?: Array<{
        id: number;
        name: string;
        quantity: number;
        price: number;
    }>;
}

const RefundModal: React.FC<RefundModalProps> = ({
    open,
    onCancel,
    orderId,
    orderTotal,
    orderItems = [],
}) => {
    const [form] = Form.useForm();
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [refundAmount, setRefundAmount] = useState(0);

    const { data: walletData } = useWalletBalance();
    const { mutate: refund, isPending: isRefunding } = useRefund();

    const balance = walletData?.data?.balance || 0;

    const handleItemSelect = (itemId: number, price: number) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
            setRefundAmount(prev => prev - price);
        } else {
            setSelectedItems([...selectedItems, itemId]);
            setRefundAmount(prev => prev + price);
        }
    };

    const handleRefund = async () => {
        try {
            const values = await form.validateFields();

            if (refundAmount <= 0) {
                message.error("Vui lòng chọn ít nhất một sản phẩm để hoàn tiền");
                return;
            }

            refund({
                order_id: orderId,
                amount: refundAmount,
            });

            onCancel();
            form.resetFields();
            setSelectedItems([]);
            setRefundAmount(0);
        } catch (error) {
            console.error("Form validation failed:", error);
        }
    };

    const handleCancel = () => {
        onCancel();
        form.resetFields();
        setSelectedItems([]);
        setRefundAmount(0);
    };

    return (
        <Modal
            title={
                <Space>
                    <RollbackOutlined />
                    <span>Hoàn tiền đơn hàng #{orderId}</span>
                </Space>
            }
            open={open}
            onCancel={handleCancel}
            footer={null}
            width={800}
        >
            <div style={{ marginBottom: "24px" }}>
                <Card size="small" style={{ background: "#f6f8fa" }}>
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                        <div>
                            <Text strong>Tổng giá trị đơn hàng:</Text> {orderTotal.toLocaleString()} ₫
                        </div>
                        <div>
                            <Text strong>Số dư ví hiện tại:</Text> {balance.toLocaleString()} ₫
                        </div>
                    </Space>
                </Card>
            </div>

            <Form form={form} layout="vertical">
                <Form.Item
                    label="Chọn sản phẩm cần hoàn tiền"
                    required
                >
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                        {orderItems.map((item) => (
                            <Card
                                key={item.id}
                                size="small"
                                style={{
                                    marginBottom: "8px",
                                    cursor: "pointer",
                                    border: selectedItems.includes(item.id)
                                        ? "2px solid #1890ff"
                                        : "1px solid #d9d9d9",
                                    background: selectedItems.includes(item.id)
                                        ? "#f0f8ff"
                                        : "white",
                                }}
                                onClick={() => handleItemSelect(item.id, item.price * item.quantity)}
                            >
                                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                                    <div>
                                        <Text strong>{item.name}</Text>
                                    </div>
                                    <div>
                                        <Text>Số lượng: {item.quantity}</Text>
                                    </div>
                                    <div>
                                        <Text>Giá: {item.price.toLocaleString()} ₫</Text>
                                    </div>
                                    <div>
                                        <Text strong style={{ color: "#1890ff" }}>
                                            Tổng: {(item.price * item.quantity).toLocaleString()} ₫
                                        </Text>
                                    </div>
                                </Space>
                            </Card>
                        ))}
                    </div>
                </Form.Item>

                <Divider />

                <Form.Item
                    label="Số tiền hoàn"
                    name="refund_amount"
                    rules={[
                        { required: true, message: "Vui lòng nhập số tiền hoàn" },
                        { type: "number", min: 1000, message: "Số tiền tối thiểu là 1,000₫" },
                        {
                            validator: (_, value) => {
                                if (value > orderTotal) {
                                    return Promise.reject("Số tiền hoàn không được vượt quá giá trị đơn hàng");
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        placeholder="Nhập số tiền muốn hoàn"
                        addonAfter="₫"
                        value={refundAmount}
                        onChange={(value) => setRefundAmount(value || 0)}
                        min={0}
                        max={orderTotal}
                    />
                </Form.Item>

                <div style={{ background: "#fff7e6", padding: "12px", borderRadius: "6px", marginBottom: "16px" }}>
                    <Text type="warning">
                        <strong>Lưu ý:</strong>
                        <ul style={{ margin: "8px 0 0 20px" }}>
                            <li>Số tiền hoàn sẽ được chuyển vào ví điện tử của bạn</li>
                            <li>Thời gian xử lý: 1-3 ngày làm việc</li>
                            <li>Bạn có thể sử dụng số tiền này để thanh toán các đơn hàng tiếp theo</li>
                            <li>Vui lòng kiểm tra kỹ thông tin trước khi xác nhận</li>
                        </ul>
                    </Text>
                </div>

                <div style={{ textAlign: "right" }}>
                    <Space>
                        <Button onClick={handleCancel}>
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            icon={<WalletOutlined />}
                            onClick={handleRefund}
                            loading={isRefunding}
                            disabled={refundAmount <= 0}
                        >
                            Xác nhận hoàn tiền
                        </Button>
                    </Space>
                </div>
            </Form>
        </Modal>
    );
};

export default RefundModal; 