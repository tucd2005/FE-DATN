import React, { useState } from "react";
import {
  Table,
  Tag,
  Input,
  Select,
  Space,
  Button,
  Modal,
  Form,
  Typography,
  message,
} from "antd";
import {
  useUpdateWalletStatus,
  useWalletTransactionList,
} from "../../../hooks/useWallet";

const { Option } = Select;
const { Title } = Typography;

const WalletListPage: React.FC = () => {
  const [filters, setFilters] = useState({ keyword: "", type: "", status: "", page: 1 });
  const [form] = Form.useForm();

  const { data, isLoading } = useWalletTransactionList(filters);
  const { mutate: updateStatus } = useUpdateWalletStatus();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);

  // Xử lý cập nhật trạng thái
  const handleStatusUpdate = (id: number, status: string) => {
    if (status === "rejected") {
      setSelectedTransactionId(id);
      setIsModalOpen(true);
    } else {
      updateStatus(
        { id, data: { status } },
        {
          onSuccess: () => message.success("Cập nhật thành công"),
          onError: () => message.error("Có lỗi xảy ra"),
        }
      );
    }
  };

  const handleRejectSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (selectedTransactionId !== null) {
        updateStatus(
          {
            id: selectedTransactionId,
            data: {
              status: "rejected",
              rejection_reason: values.rejection_reason,
            },
          },
          {
            onSuccess: () => message.success("Đã từ chối giao dịch"),
            onError: () => message.error("Có lỗi xảy ra"),
          }
        );
        setIsModalOpen(false);
        form.resetFields();
      }
    } catch (err) {}
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    {
      title: "Người dùng (ID ví)",
      dataIndex: "user",
      render: (user: any, record: any) => {
        const name = user?.name ?? "Không rõ";
        const walletId = record?.id;
        return `${name} (ID ví: ${walletId})`;
      },
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      render: (val) => val ?? "Chưa có",
    },
    {
      title: "Số điện thoại",
      dataIndex: ["user", "so_dien_thoai"],
      render: (val) => val ?? "Chưa có",
    },
    {
      title: "Loại",
      dataIndex: "type",
      render: (type: string) => {
        switch (type) {
          case "deposit":
            return "Nạp";
          case "withdraw":
            return "Rút";
          case "payment":
            return "Thanh toán";
          case "refund":
            return "Hoàn tiền";
          default:
            return type;
        }
      },
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      render: (amount: number) => amount.toLocaleString() + " ₫",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) => {
        const color =
          status === "pending" ? "orange" : status === "success" ? "green" : "red";
        const text =
          status === "pending"
            ? "Chờ xử lý"
            : status === "success"
            ? "Thành công"
            : "Từ chối";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Lý do từ chối",
      dataIndex: "rejection_reason",
      render: (val: string) => val || "-",
    },
    { title: "Ngân hàng", dataIndex: "bank_name" },
    { title: "Số TK", dataIndex: "bank_account" },
    { title: "Chủ tài khoản", dataIndex: "acc_name" },
    { title: "Mô tả", dataIndex: "description" },
    {
      title: "Thời gian tạo",
      dataIndex: "created_at",
      render: (val: string) => new Date(val).toLocaleString(),
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "updated_at",
      render: (val: string) => new Date(val).toLocaleString(),
    },
    {
      title: "Thao tác",
      render: (_: any, record: any) =>
        record.type === "withdraw" && record.status === "pending" && (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => handleStatusUpdate(record.id, "success")}
            >
              Duyệt
            </Button>
            <Button
              type="primary"
              danger
              size="small"
              onClick={() => handleStatusUpdate(record.id, "rejected")}
            >
              Từ chối
            </Button>
          </Space>
        ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={4} className="mb-4">Quản lý giao dịch ví</Title>

      {/* Bộ lọc */}
      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder="Tìm theo tên, email, sđt"
          allowClear
          onPressEnter={(e) =>
            setFilters((f) => ({ ...f, keyword: e.currentTarget.value }))
          }
          onChange={(e) =>
            setFilters((f) => ({ ...f, keyword: e.currentTarget.value }))
          }
        />
        <Select
          allowClear
          placeholder="Loại"
          style={{ width: 120 }}
          onChange={(val) => setFilters((f) => ({ ...f, type: val }))}
        >
          <Option value="deposit">Nạp</Option>
          <Option value="withdraw">Rút</Option>
        </Select>

        <Select
          allowClear
          placeholder="Trạng thái"
          style={{ width: 140 }}
          onChange={(val) => setFilters((f) => ({ ...f, status: val }))}
        >
          <Option value="pending">Chờ xử lý</Option>
          <Option value="success">Thành công</Option>
          <Option value="rejected">Từ chối</Option>
        </Select>
      </Space>

      {/* Bảng danh sách */}
      <div style={{ overflowX: "auto" }}>
        <Table
          rowKey="id"
          loading={isLoading}
          dataSource={data?.data || []}
          pagination={{
            total: data?.total,
            current: filters.page,
            pageSize: 10,
            onChange: (page) => setFilters((f) => ({ ...f, page })),
          }}
          columns={columns}
          scroll={{ x: "max-content" }}
          bordered
        />
      </div>

      {/* Modal nhập lý do từ chối */}
      <Modal
        title="Nhập lý do từ chối"
        open={isModalOpen}
        onOk={handleRejectSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Lý do từ chối"
            name="rejection_reason"
            rules={[{ required: true, message: "Vui lòng nhập lý do" }]}
          >
            <Input.TextArea rows={4} placeholder="Nhập lý do từ chối giao dịch" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WalletListPage;
