import React, { useState } from "react";
import { Table, Tag, Input, Select, Space, Button, Modal, Form } from "antd";
import { useUpdateWalletStatus, useWalletTransactionList } from "../../../hooks/useWallet";

const { Option } = Select;

const WalletListPage: React.FC = () => {
  const [filters, setFilters] = useState({ keyword: "", type: "", status: "" });
  const { data, isLoading } = useWalletTransactionList(filters);
  const { mutate: updateStatus } = useUpdateWalletStatus();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [form] = Form.useForm();

  const handleStatusUpdate = (id: number, status: string) => {
    if (status === "rejected") {
      setSelectedId(id);
      setIsModalOpen(true);
    } else {
      updateStatus({ id, data: { status } });
    }
  };

  const handleReject = () => {
    form.validateFields().then((values) => {
      if (selectedId !== null) {
        updateStatus({
          id: selectedId,
          data: { status: "rejected", rejection_reason: values.rejection_reason },
        });
        setIsModalOpen(false);
        form.resetFields();
      }
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Quản lý ví</h1>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm theo tên, email, sđt"
          onChange={(e) => setFilters((f) => ({ ...f, keyword: e.target.value }))}
        />
        <Select
          allowClear
          placeholder="Loại"
          onChange={(val) => setFilters((f) => ({ ...f, type: val }))}
        >
          <Option value="deposit">Nạp</Option>
          <Option value="withdrawal">Rút</Option>
        </Select>
        <Select
          allowClear
          placeholder="Trạng thái"
          onChange={(val) => setFilters((f) => ({ ...f, status: val }))}
        >
          <Option value="pending">Chờ xử lý</Option>
          <Option value="success">Thành công</Option>
          <Option value="rejected">Từ chối</Option>
        </Select>
      </Space>

      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={data?.data || []}
        pagination={{ total: data?.total }}
        columns={[
          {
            title: "Người dùng",
            dataIndex: "user",
            render: (user) => (
              <>
                <div>{user?.name}</div>
                <div className="text-gray-500 text-sm">{user?.email}</div>
              </>
            ),
          },
          { title: "Số tiền", dataIndex: "amount" },
          { title: "Loại", dataIndex: "type", render: (val) => val === "deposit" ? "Nạp" : "Rút" },
          {
            title: "Trạng thái",
            dataIndex: "status",
            render: (val) => {
              let color = val === "pending" ? "orange" : val === "success" ? "green" : "red";
              return <Tag color={color}>{val}</Tag>;
            },
          },
          {
            title: "Thao tác",
            render: (_, record) => (
              <Space>
                {record.status === "pending" && (
                  <>
                    <Button type="link" onClick={() => handleStatusUpdate(record.id, "success")}>Duyệt</Button>
                    <Button type="link" danger onClick={() => handleStatusUpdate(record.id, "rejected")}>Từ chối</Button>
                  </>
                )}
              </Space>
            ),
          },
        ]}
      />

      <Modal
        title="Lý do từ chối"
        open={isModalOpen}
        onOk={handleReject}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Lý do"
            name="rejection_reason"
            rules={[{ required: true, message: "Vui lòng nhập lý do từ chối" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WalletListPage;
