import React from "react";
import { Card, Statistic, Button, Typography, Space } from "antd";
import { WalletOutlined, PlusOutlined } from "@ant-design/icons";
import { useWalletBalance } from "../hooks/useClientWallet";
import { formatCurrency } from "../utils/formatCurrency";

const { Text } = Typography;

interface WalletWidgetProps {
    compact?: boolean;
}

const WalletWidget: React.FC<WalletWidgetProps> = ({
    compact = false
}) => {
    const { data: walletData, isLoading } = useWalletBalance();
    const balance = walletData?.balance || 0;

    if (compact) {
        return (
            <Card size="small" style={{ width: 200 }}>
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Text strong>Số dư:</Text>
                        <Text strong style={{ color: "#3f8600" }}>
                            {formatCurrency(balance)}
                        </Text>
                    </div>
                </Space>
            </Card>
        );
    }

    return (
        <Card>
            <Statistic
                title={
                    <Space>
                        <WalletOutlined />
                        <span>Số dư ví</span>
                    </Space>
                }
                value={balance}
                precision={0}
                valueStyle={{ color: "#3f8600", fontSize: "24px" }}
                prefix="₫"
                suffix={
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                        VND
                    </Text>
                }
            />
        </Card>
    );
};

export default WalletWidget; 