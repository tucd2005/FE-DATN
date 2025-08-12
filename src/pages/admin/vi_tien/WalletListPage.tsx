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
  Upload,
  Card,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd/es/upload/interface";
import {
  useUpdateWalletStatus,
  useWalletTransactionList,
} from "../../../hooks/useWallet";

const { Dragger } = Upload;
const { Option } = Select;
const { Title, Text } = Typography;

interface Transaction {
  id: number;
  user: {
    name: string;
    email: string;
    so_dien_thoai: string;
  };
  type: string;
  amount: number;
  status: string;
  rejection_reason: string;
  bank_name: string;
  bank_account: string;
  acc_name: string;
  description: string;
  created_at: string;
  updated_at: string;
  transfer_image?: string;
}

const WalletListPage: React.FC = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    type: "",
    status: "",
    page: 1,
  });
  const [form] = Form.useForm();
  const { data, isLoading } = useWalletTransactionList(filters);
  const { mutate: updateStatus } = useUpdateWalletStatus();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
  const [currentAction, setCurrentAction] = useState<"approve" | "reject">("approve");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const uploadProps: UploadProps = {
    multiple: false,
    accept: "image/*",
    fileList: fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Chỉ được phép tải lên file ảnh!');
        return false;
      }
      return false; // Ngăn không cho file được tải lên ngay lập tức
    },
    onChange: (info) => {
      if (info.file.status !== 'uploading') {
        setFileList(info.fileList.slice(-1)); // Chỉ giữ lại file cuối cùng
      }
    },
  };

  const handleStatusAction = (id: number, action: "approve" | "reject") => {
    setSelectedTransactionId(id);
    setCurrentAction(action);
    setIsModalOpen(true);
    form.resetFields();
    setFileList([]);
  };

  const handleSubmit = async () => {
    try {
      // Thay vì dùng FormData, chuyển sang object thông thường
      const data: { status: string; rejection_reason?: string; transfer_image?: File } = {
        status: currentAction === "approve" ? "success" : "rejected"
      };
  
      if (currentAction === "approve") {
        if (fileList[0]?.originFileObj) {
          // Nếu cần gửi file, phải dùng FormData
          
          const formData = new FormData();
          formData.append("_method", "PATCH"); 
          formData.append("status", data.status);
          formData.append("transfer_image", fileList[0].originFileObj);
          await updateStatus({ id: selectedTransactionId!, data: formData });
        } else {
          message.error("Vui lòng tải lên ảnh minh chứng chuyển khoản");
          return;
        }
      } else {
        const values = await form.validateFields();
        data.rejection_reason = values.reason;
        await updateStatus({ id: selectedTransactionId!, data });
      }
  
      
      setIsModalOpen(false);
      setFileList([]);
    } catch (error) {
      message.error(error?.response?.data?.message || "Có lỗi xảy ra");
    }
  };
  
  

  const columns = [
    { title: "ID", dataIndex: "id" },
    {
      title: "Người dùng (ID ví)",
      dataIndex: "user",
      render: (user: any, record: any) => {
        const name = user?.name ?? "Không rõ";
        const walletId = record?.wallet_id;
        return `${name} (ID ví: ${walletId})`;
      },
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      render: (val: string) => val ?? "Chưa có",
    },
    {
      title: "Số điện thoại",
      dataIndex: ["user", "so_dien_thoai"],
      render: (val: string) => val ?? "Chưa có",
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
      render: (_: any, record: Transaction) =>
        record.type === "withdraw" && record.status === "pending" && (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => handleStatusAction(record.id, "approve")}
            >
              Duyệt
            </Button>
            <Button
              type="primary"
              danger
              size="small"
              onClick={() => handleStatusAction(record.id, "reject")}
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

      <Modal
        title={
          <Typography.Title level={4}>
            {currentAction === "approve" ? "XÁC NHẬN DUYỆT GIAO DỊCH" : "XÁC NHẬN TỪ CHỐI GIAO DỊCH"}
          </Typography.Title>
        }
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={uploading}
        okText="Xác nhận"
        cancelText="Hủy"
        width={600}
      >
        {currentAction === "approve" ? (
          <div>
            <Text strong className="mb-2 block">
              Vui lòng tải lên ảnh minh chứng chuyển khoản:
            </Text>
            
            <Dragger {...uploadProps} className="wallet-upload">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Kéo thả file ảnh vào đây hoặc click để chọn file
              </p>
              <p className="ant-upload-hint">
                Hỗ trợ định dạng: JPG, PNG (Kích thước tối đa: 5MB)
              </p>
            </Dragger>

            {fileList.length > 0 && (
              <Card size="small" className="mt-3">
                <div className="flex items-center gap-2">
                  <img 
                    src={URL.createObjectURL(fileList[0].originFileObj as Blob)} 
                    alt="Ảnh minh chứng" 
                    className="h-16 object-contain"
                  />
                  <Text>{fileList[0].name}</Text>
                </div>
              </Card>
            )}
          </div>
        ) : (
          <Form form={form} layout="vertical">
            <Form.Item
              name="reason"
              label="Lý do từ chối"
              rules={[
                { 
                  required: true, 
                  message: 'Vui lòng nhập lý do từ chối' 
                }
              ]}
            >
              <Input.TextArea 
                rows={4} 
                placeholder="Nhập lý do từ chối giao dịch này..."
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default WalletListPage;
