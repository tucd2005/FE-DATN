import { useState } from "react"
import { Table, Tag, Select, Space, Button, Modal, Descriptions, Badge, Image, Row, Col } from "antd"
import { useWalletTransactions, useCancelWithdraw } from "../../../../hooks/useWalletClient"
import { formatCurrency } from "../../../../utils/formatCurrency"

const { Option } = Select

interface TransactionHistoryProps {
    className?: string
}

export default function TransactionHistory({ className = "" }: TransactionHistoryProps) {
    const { data: transactions, isLoading } = useWalletTransactions()
    const { mutate: cancelWithdraw, isPending: isCancelPending } = useCancelWithdraw()
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
    const [detailModalVisible, setDetailModalVisible] = useState(false)
    const [filterType, setFilterType] = useState<string>("all")
    const [filterStatus, setFilterStatus] = useState<string>("all")

    // Filter transactions
    const filteredTransactions = transactions?.filter(transaction => {
        const typeMatch = filterType === "all" || transaction.type === filterType
        const statusMatch = filterStatus === "all" || transaction.status === filterStatus
        return typeMatch && statusMatch
    }) || []

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "processing"
            case "success":
                return "success"
            case "rejected":
                return "error"
            default:
                return "default"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "pending":
                return "Chờ xử lý"
            case "success":
                return "Thành công"
            case "rejected":
                return "Từ chối"
            default:
                return status
        }
    }

    const getTypeText = (type: string) => {
        switch (type) {
            case "deposit":
                return "Nạp tiền"
            case "withdraw":
                return "Rút tiền"
            case "payment":
                return "Thanh toán"
            case "refund":
                return "Hoàn tiền"
            default:
                return type
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case "deposit":
                return "green"
            case "withdraw":
                return "blue"
            case "payment":
                return "orange"
            case "refund":
                return "purple"
            default:
                return "default"
        }
    }

    const columns = [
        {
            title: "Mã giao dịch",
            dataIndex: "transaction_code",
            key: "transaction_code",
            width: 150,
            render: (code: string) => (
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {code}
                </span>
            )
        },
        {
            title: "Loại",
            dataIndex: "type",
            key: "type",
            width: 120,
            render: (type: string) => (
                <Tag color={getTypeColor(type)}>
                    {getTypeText(type)}
                </Tag>
            )
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "amount",
            width: 150,
            render: (amount: number, record: any) => (
                <span className={`font-bold ${(record.type === "deposit" || record.type === "refund") ? "text-green-600" : "text-blue-600"}`}>
                    {(record.type === "deposit" || record.type === "refund") ? "+" : "-"}{formatCurrency(amount)}
                </span>
            )
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 120,
            render: (status: string) => (
                <Badge
                    status={getStatusColor(status) as any}
                    text={getStatusText(status)}
                />
            )
        },
        {
            title: "Thời gian",
            dataIndex: "created_at",
            key: "created_at",
            width: 180,
            render: (date: string) => (
                <div className="text-sm">
                    <div>{new Date(date).toLocaleDateString("vi-VN")}</div>
                    <div className="text-gray-500">{new Date(date).toLocaleTimeString("vi-VN")}</div>
                </div>
            )
        },
        {
            title: "Thao tác",
            key: "action",
            width: 150,
            render: (_: any, record: any) => (
                <Space>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            setSelectedTransaction(record)
                            setDetailModalVisible(true)
                        }}
                    >
                        Chi tiết
                    </Button>
                    {record.type === "withdraw" && record.status === "pending" && (
                        <Button
                            type="link"
                            size="small"
                            danger
                            onClick={() => cancelWithdraw(record.id)}
                            disabled={isCancelPending}
                        >
                            {isCancelPending ? "Đang hủy..." : "Hủy"}
                        </Button>
                    )}
                </Space>
            )
        }
    ]

    return (
        <div className={`bg-white rounded-xl shadow-sm border ${className}`}>
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Lịch sử giao dịch</h3>
                    <div className="flex items-center space-x-3">
                        <Select
                            value={filterType}
                            onChange={setFilterType}
                            style={{ width: 120 }}
                            placeholder="Loại giao dịch"
                        >
                            <Option value="all">Tất cả</Option>
                            <Option value="deposit">Nạp tiền</Option>
                            <Option value="withdraw">Rút tiền</Option>
                        </Select>
                        <Select
                            value={filterStatus}
                            onChange={setFilterStatus}
                            style={{ width: 140 }}
                            placeholder="Trạng thái"
                        >
                            <Option value="all">Tất cả</Option>
                            <Option value="pending">Chờ xử lý</Option>
                            <Option value="success">Thành công</Option>
                            <Option value="rejected">Từ chối</Option>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={filteredTransactions}
                    loading={isLoading}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        // showSizeChanger: true,
                        // showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} của ${total} giao dịch`,
                        pageSizeOptions: ["10", "20", "50"],
                    }}
                    scroll={{ x: 800 }}
                    size="middle"
                />
            </div>

            {/* Modal chi tiết giao dịch */}
            <Modal
                title="Chi tiết giao dịch"
                style={{ top: 20 }}
                open={detailModalVisible}
                onCancel={() => setDetailModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setDetailModalVisible(false)}>
                        Đóng
                    </Button>
                ]}
                width={600}
            >
                {selectedTransaction && (
                    <Row gutter={10}>
                        {selectedTransaction.transfer_image && <Col><div className="w-[200px] h-[350px] rounded-[12px] overflow-hidden">
                            <Image style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: 12, objectFit: 'contain' }} src={selectedTransaction.transfer_image} />
                            </div></Col>}
                        <Col>
                            <Descriptions column={1} bordered>
                                <Descriptions.Item label="Mã giao dịch">
                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                                        {selectedTransaction.transaction_code}
                                    </span>
                                </Descriptions.Item>
                                <Descriptions.Item label="Loại giao dịch">
                                    <Tag color={getTypeColor(selectedTransaction.type)}>
                                        {getTypeText(selectedTransaction.type)}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Số tiền">
                                    <span className={`font-bold text-lg ${selectedTransaction.type === "deposit" ? "text-green-600" : "text-blue-600"}`}>
                                        {selectedTransaction.type === "deposit" ? "+" : "-"}{formatCurrency(selectedTransaction.amount)}
                                    </span>
                                </Descriptions.Item>
                                <Descriptions.Item label="Trạng thái">
                                    <Badge
                                        status={getStatusColor(selectedTransaction.status) as any}
                                        text={getStatusText(selectedTransaction.status)}
                                    />
                                </Descriptions.Item>
                                <Descriptions.Item label="Mô tả">
                                    {selectedTransaction.description || "Không có mô tả"}
                                </Descriptions.Item>
                                {selectedTransaction.bank_name && (
                                    <>
                                        <Descriptions.Item label="Ngân hàng">
                                            {selectedTransaction.bank_name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Số tài khoản">
                                            {selectedTransaction.bank_account}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Chủ tài khoản">
                                            {selectedTransaction.acc_name}
                                        </Descriptions.Item>
                                    </>
                                )}
                                {selectedTransaction.rejection_reason && (
                                    <Descriptions.Item label="Lý do từ chối">
                                        <span className="text-red-600">{selectedTransaction.rejection_reason}</span>
                                    </Descriptions.Item>
                                )}
                                <Descriptions.Item label="Thời gian tạo">
                                    {new Date(selectedTransaction.created_at).toLocaleString("vi-VN")}
                                </Descriptions.Item>
                                <Descriptions.Item label="Thời gian cập nhật">
                                    {new Date(selectedTransaction.updated_at).toLocaleString("vi-VN")}
                                </Descriptions.Item>
                                {selectedTransaction.expires_at && (
                                    <Descriptions.Item label="Thời gian hết hạn">
                                        {new Date(selectedTransaction.expires_at).toLocaleString("vi-VN")}
                                    </Descriptions.Item>
                                )}
                            </Descriptions></Col>
                    </Row>
                )}
            </Modal>
        </div>
    )
}