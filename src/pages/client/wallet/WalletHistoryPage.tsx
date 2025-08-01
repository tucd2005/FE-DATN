import React, { useState } from "react";
import {
    Card,
    Table,
    Tag,
    Typography,
    Select,
    Input,
    DatePicker,
    Row,
    Col,
    Statistic,
} from "antd";
import {
    WalletOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
} from "@ant-design/icons";
import { useWalletBalance, useWalletTransactions } from "../../../hooks/useClientWallet";
import { formatCurrency } from "../../../utils/formatCurrency";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface Transaction {
    id: number;
    type: "deposit" | "withdraw" | "payment" | "refund";
    amount: number;
    status: "pending" | "success" | "rejected";
    description?: string;
    bank_name?: string;
    bank_account?: string;
    acc_name?: string;
    rejection_reason?: string;
    related_order_id?: number;
    created_at: string;
    updated_at: string;
}

const WalletHistoryPage: React.FC = () => {
    const [filters, setFilters] = useState({
        type: "",
        status: "",
        keyword: "",
        dateRange: null as [any, any] | null,
    });

    const { data: walletData } = useWalletBalance();
    const { data: transactionsData, isLoading } = useWalletTransactions({
        type: filters.type || undefined,
        status: filters.status || undefined,
        keyword: filters.keyword || undefined,
        start_date: filters.dateRange?.[0]?.format('YYYY-MM-DD'),
        end_date: filters.dateRange?.[1]?.format('YYYY-MM-DD'),
    });

    const transactions = (transactionsData?.data || []) as Transaction[];
    const pagination = transactionsData?.meta || {};

    // Tính toán thống kê
    const totalRefunds = transactions
        .filter((t: Transaction) => t.type === "refund" && t.status === "success")
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    const totalWithdrawals = transactions
        .filter((t: Transaction) => t.type === "withdraw" && t.status === "success")
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    const pendingWithdrawals = transactions
        .filter((t: Transaction) => t.type === "withdraw" && t.status === "pending")
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    const totalPayments = transactions
        .filter((t: Transaction) => t.type === "payment" && t.status === "success")
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    const columns = [
        {
            title: "Mã GD",
            dataIndex: "id",
            key: "id",
            width: 80,
        },
        {
            title: "Loại",
            dataIndex: "type",
            key: "type",
            width: 100,
            render: (type: string) => {
                const typeConfig = {
                    deposit: { color: "green", icon: <ArrowUpOutlined style={{ marginRight: "4px" }} />, text: "Nạp" },
                    withdraw: { color: "blue", icon: <ArrowDownOutlined style={{ marginRight: "4px" }} />, text: "Rút" },
                    payment: { color: "orange", icon: <ArrowDownOutlined style={{ marginRight: "4px" }} />, text: "Thanh toán" },
                    refund: { color: "purple", icon: <ArrowUpOutlined style={{ marginRight: "4px" }} />, text: "Hoàn tiền" }
                };

                const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.withdraw;

                return (
                    <Tag color={config.color}>
                        {config.icon}
                        {config.text}
                    </Tag>
                );
            },
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "amount",
            width: 120,
            render: (amount: number) => (
                <Text strong style={{ color: amount > 0 ? "#52c41a" : "#1890ff" }}>
                    {formatCurrency(amount)}
                </Text>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 100,
            render: (status: string) => {
                const color =
                    status === "success" ? "green" :
                        status === "pending" ? "orange" : "red";
                const text =
                    status === "success" ? "Thành công" :
                        status === "pending" ? "Chờ xử lý" : "Từ chối";
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            render: (description: string, record: Transaction) => (
                <div>
                    <div>{description}</div>
                    {record.type === "withdraw" && record.bank_name && (
                        <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                            {record.bank_name} - {record.bank_account}
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: "Lý do từ chối",
            dataIndex: "rejection_reason",
            key: "rejection_reason",
            render: (reason: string) => reason || "-",
        },
        {
            title: "Thời gian",
            dataIndex: "created_at",
            key: "created_at",
            width: 150,
            render: (date: string) => new Date(date).toLocaleString("vi-VN"),
        },
    ];

    return (
        <div style={{ padding: "24px" }}>
            <Title level={2} style={{ marginBottom: "24px" }}>
                <WalletOutlined style={{ marginRight: "8px" }} />
                Lịch sử giao dịch ví
            </Title>

            {/* Thống kê */}
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
                <Col xs={24} sm={6}>
                    <Card>
                        <Statistic
                            title="Tổng hoàn tiền"
                            value={totalRefunds}
                            precision={0}
                            valueStyle={{ color: "#3f8600" }}
                            prefix="₫"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={6}>
                    <Card>
                        <Statistic
                            title="Tổng rút"
                            value={totalWithdrawals}
                            precision={0}
                            valueStyle={{ color: "#1890ff" }}
                            prefix="₫"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={6}>
                    <Card>
                        <Statistic
                            title="Tổng thanh toán"
                            value={totalPayments}
                            precision={0}
                            valueStyle={{ color: "#faad14" }}
                            prefix="₫"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={6}>
                    <Card>
                        <Statistic
                            title="Số dư hiện tại"
                            value={walletData?.balance || 0}
                            precision={0}
                            valueStyle={{ color: "#722ed1" }}
                            prefix="₫"
                        />
                    </Card>
                </Col>
            </Row>

            {/* Bộ lọc */}
            <Card style={{ marginBottom: "24px" }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={6}>
                        <Select
                            placeholder="Loại giao dịch"
                            allowClear
                            style={{ width: "100%" }}
                            onChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
                        >
                            <Option value="refund">Hoàn tiền</Option>
                            <Option value="withdraw">Rút tiền</Option>
                            <Option value="payment">Thanh toán</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Select
                            placeholder="Trạng thái"
                            allowClear
                            style={{ width: "100%" }}
                            onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                        >
                            <Option value="success">Thành công</Option>
                            <Option value="pending">Chờ xử lý</Option>
                            <Option value="rejected">Từ chối</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Input
                            placeholder="Tìm kiếm..."
                            allowClear
                            onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
                        />
                    </Col>
                    <Col xs={24} sm={6}>
                        <RangePicker
                            style={{ width: "100%" }}
                            placeholder={["Từ ngày", "Đến ngày"]}
                            onChange={(dates) => setFilters(prev => ({ ...prev, dateRange: dates }))}
                        />
                    </Col>
                </Row>
            </Card>

            {/* Bảng lịch sử */}
            <Card>
                <Table
                    columns={columns}
                    dataSource={transactions}
                    rowKey="id"
                    loading={isLoading}
                    pagination={{
                        current: pagination.current_page || 1,
                        pageSize: pagination.per_page || 10,
                        total: pagination.total || 0,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} của ${total} giao dịch`,
                    }}
                    scroll={{ x: 800 }}
                />
            </Card>
        </div>
    );
};

export default WalletHistoryPage; 