import React, { useState } from "react";
import {
    Card,
    Table,
    Tag,
    Typography,
    Space,
    Select,
    Input,
    Row,
    Col,
    Statistic,
    DatePicker,
} from "antd";
import {
    HistoryOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
} from "@ant-design/icons";
import { useWalletBalance, useWalletTransactionHistory } from "../../../hooks/useClientWallet";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const TransactionHistoryPage: React.FC = () => {
    const [filters, setFilters] = useState({
        type: "",
        status: "",
        keyword: "",
        dateRange: null,
    });

    const { data: walletData, isLoading } = useWalletBalance();
    const { data: transactionData, isLoading: isLoadingTransactions } = useWalletTransactionHistory(filters);
    const balance = walletData?.data?.balance || 0;

    // Sử dụng dữ liệu từ API
    const transactionHistory = transactionData?.data || [];

    // Tính toán thống kê
    const totalDeposits = transactionHistory
        .filter(t => t.type === "deposit" && t.status === "success")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalWithdrawals = transactionHistory
        .filter(t => t.type === "withdraw" && t.status === "success")
        .reduce((sum, t) => sum + t.amount, 0);

    const pendingWithdrawals = transactionHistory
        .filter(t => t.type === "withdraw" && t.status === "pending")
        .reduce((sum, t) => sum + t.amount, 0);

    const columns = [
        {
            title: "Mã GD",
            dataIndex: "id",
            key: "id",
            width: 80,
        },
        {
            title: "Loại giao dịch",
            dataIndex: "type",
            key: "type",
            width: 120,
            render: (type: string) => (
                <Tag color={type === "deposit" ? "green" : "blue"}>
                    {type === "deposit" ? (
                        <Space>
                            <ArrowDownOutlined />
                            Nạp tiền
                        </Space>
                    ) : (
                        <Space>
                            <ArrowUpOutlined />
                            Rút tiền
                        </Space>
                    )}
                </Tag>
            ),
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "amount",
            width: 120,
            render: (amount: number, record: any) => (
                <Text
                    strong
                    style={{
                        color: record.type === "deposit" ? "#52c41a" : "#1890ff",
                        fontSize: "14px"
                    }}
                >
                    {record.type === "deposit" ? "+" : "-"}{amount.toLocaleString()} ₫
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
                            : "Từ chối";
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: "Ngân hàng",
            dataIndex: "bank_name",
            key: "bank_name",
            width: 120,
        },
        {
            title: "Số TK",
            dataIndex: "bank_account",
            key: "bank_account",
            width: 120,
        },
        {
            title: "Chủ TK",
            dataIndex: "acc_name",
            key: "acc_name",
            width: 120,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            ellipsis: true,
        },
        {
            title: "Lý do từ chối",
            dataIndex: "rejection_reason",
            key: "rejection_reason",
            width: 150,
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

    // Lọc dữ liệu theo filter
    const filteredData = transactionHistory.filter((transaction) => {
        if (filters.type && transaction.type !== filters.type) return false;
        if (filters.status && transaction.status !== filters.status) return false;
        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase();
            return (
                transaction.description.toLowerCase().includes(keyword) ||
                transaction.bank_name.toLowerCase().includes(keyword) ||
                transaction.bank_account.includes(keyword) ||
                transaction.acc_name.toLowerCase().includes(keyword)
            );
        }
        return true;
    });

    return (
        <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
            <Title level={2} style={{ marginBottom: "24px" }}>
                <HistoryOutlined style={{ marginRight: "8px" }} />
                Lịch sử giao dịch
            </Title>

            {/* Thống kê */}
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Số dư hiện tại"
                            value={balance}
                            precision={0}
                            valueStyle={{ color: "#1890ff" }}
                            suffix="₫"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Tổng nạp tiền"
                            value={totalDeposits}
                            precision={0}
                            valueStyle={{ color: "#52c41a" }}
                            suffix="₫"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Tổng rút tiền"
                            value={totalWithdrawals}
                            precision={0}
                            valueStyle={{ color: "#1890ff" }}
                            suffix="₫"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Đang chờ rút"
                            value={pendingWithdrawals}
                            precision={0}
                            valueStyle={{ color: "#faad14" }}
                            suffix="₫"
                        />
                    </Card>
                </Col>
            </Row>

            {/* Bộ lọc */}
            <Card style={{ marginBottom: "24px" }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            allowClear
                            placeholder="Loại giao dịch"
                            style={{ width: "100%" }}
                            value={filters.type}
                            onChange={(value) => setFilters({ ...filters, type: value })}
                        >
                            <Option value="deposit">Nạp tiền</Option>
                            <Option value="withdraw">Rút tiền</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            allowClear
                            placeholder="Trạng thái"
                            style={{ width: "100%" }}
                            value={filters.status}
                            onChange={(value) => setFilters({ ...filters, status: value })}
                        >
                            <Option value="success">Thành công</Option>
                            <Option value="pending">Đang xử lý</Option>
                            <Option value="rejected">Từ chối</Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Input
                            placeholder="Tìm kiếm..."
                            value={filters.keyword}
                            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                            allowClear
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <RangePicker
                            style={{ width: "100%" }}
                            placeholder={["Từ ngày", "Đến ngày"]}
                            onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
                        />
                    </Col>
                </Row>
            </Card>

            {/* Bảng lịch sử */}
            <Card>
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} của ${total} giao dịch`,
                        total: transactionData?.total || 0,
                        current: transactionData?.current_page || 1,
                        pageSize: transactionData?.per_page || 10,
                    }}
                    loading={isLoading || isLoadingTransactions}
                    scroll={{ x: 1200 }}
                    size="small"
                />
            </Card>
        </div>
    );
};

export default TransactionHistoryPage; 