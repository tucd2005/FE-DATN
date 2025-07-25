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
} from "antd";
import {
  useUpdateWalletStatus,
  useWalletTransactionList,
} from "../../../hooks/useWallet";

const { Option } = Select;
const { Title, Text } = Typography;

const WalletListPage: React.FC = () => {
  const [filters, setFilters] = useState({ keyword: "", type: "", status: "" });
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
      updateStatus({ id, data: { status } });
    }
  };

  const handleRejectSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (selectedTransactionId !== null) {
        updateStatus({
          id: selectedTransactionId,
          data: {
            status: "rejected",
            rejection_reason: values.rejection_reason,
          },
        });
        setIsModalOpen(false);
        form.resetFields();
      }
    } catch (err) {
      // Form validation failed
    }
  };

  // Cột trong bảng
  const columns = [
   
      { title: "ID", dataIndex: "id" },
  
      { title: "Wallet ID", dataIndex: "wallet_id" },
      {
        title: "Loại",
        dataIndex: "type",
        render: (type: string) => (type === "deposit" ? "Nạp" : "Rút"),
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
            status === "pending"
              ? "orange"
              : status === "success"
              ? "green"
              : "red";
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
      { title: "Mã đơn hàng liên quan", dataIndex: "related_order_id" },
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
        render: (_: any, record: any) => (
          <Space>
            {record.status === "pending" && (
              <>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handleStatusUpdate(record.id, "success")}
                  icon={<span style={{ color: "white" }}></span>}
                  style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
                >
                  Duyệt
                </Button>
      
                <Button
                  type="primary"
                  danger
                  size="small"
                  onClick={() => handleStatusUpdate(record.id, "rejected")}
                  icon={<span style={{ color: "white" }}></span>}
                >
                  Từ chối
                </Button>
              </>
            )}
          </Space>
        ),
      }
      ,
    ];
    

  return (
    <div>
      <Title level={4} className="mb-4">Quản lý giao dịch ví</Title>

      {/* Bộ lọc */}
      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder="Tìm kiếm theo tên, email, sđt"
          allowClear
          onChange={(e) => setFilters((f) => ({ ...f, keyword: e.target.value }))}
        />
        <Select
          allowClear
          placeholder="Loại"
          style={{ width: 120 }}
          onChange={(val) => setFilters((f) => ({ ...f, type: val }))}
        >
          <Option value="deposit">Nạp</Option>
          <Option value="withdrawal">Rút</Option>
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
      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={data?.data || []}
        pagination={{ total: data?.total }}
        columns={columns}
      />

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
