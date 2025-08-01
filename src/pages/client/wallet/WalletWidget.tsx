import React from "react";
import { Card, Statistic, Button, Space, Typography } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { useWalletBalance } from "../../../hooks/useClientWallet";

const { Text } = Typography;

interface WalletWidgetProps {
    onWithdrawClick?: () => void;
    onDepositClick?: () => void;
}

const WalletWidget: React.FC<WalletWidgetProps> = ({
    onWithdrawClick,
    onDepositClick,
}) => {
    const { data: walletData, isLoading } = useWalletBalance();
    const balance = walletData?.data?.balance || 0;

    return (
        <Card
            size="small"
            style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                minWidth: "200px",
            }}
        >
            <Statistic
                title={
                    <Text style={{ color: "white", fontSize: "14px" }}>
                        Số dư ví
                    </Text>
                }
                value={balance}
                precision={0}
                valueStyle={{ color: "white", fontSize: "20px" }}
                suffix="₫"
                prefix={<WalletOutlined style={{ color: "white" }} />}
                loading={isLoading}
            />

            <Space style={{ marginTop: "12px" }}>
                {onDepositClick && (
                    <Button
                        type="primary"
                        size="small"
                        onClick={onDepositClick}
                        style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}
                    >
                        Nạp tiền
                    </Button>
                )}
                {onWithdrawClick && (
                    <Button
                        size="small"
                        onClick={onWithdrawClick}
                        disabled={balance < 50000}
                        style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            color: "white"
                        }}
                    >
                        Rút tiền
                    </Button>
                )}
            </Space>
        </Card>
    );
};

export default WalletWidget; 