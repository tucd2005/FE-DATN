import React, { useState } from "react";
import {
  Table,
  Tag,
  Spin,
  Alert,
  Button,
  Space,
  Switch,
  Modal,
  Radio,
  InputNumber,
  Input,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  useDiscountCodes,
  useSoftDeleteDiscountCode,
  useUpdateDiscountCodeStatus,
  useSendDiscountCode,
} from "../../../hooks/useDiscountCodes";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const { Search } = Input;
const { Option } = Select;

interface DiscountCode {
  id: number;
  ma: string;
  ten: string;
  loai: string;
  gia_tri: number;
  // so_luong: number;
  trang_thai: boolean;
  ngay_bat_dau: string;
  ngay_ket_thuc: string;
}

export default function DiscountCodeList() {
  const [page, setPage] = useState(1);

  // 🔍 state cho lọc & tìm kiếm
  const [keyword, setKeyword] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // ✅ gọi API kèm keyword & status
  const { data, isLoading: isFetching, isError } = useDiscountCodes(page, {
    keyword,
    status: statusFilter,
  });

  const nav = useNavigate();
  const { mutate: toggleStatus, isPending: isToggling } = useUpdateDiscountCodeStatus();
  const { mutate: softDelete, isPending: isDeleting } = useSoftDeleteDiscountCode();
  const { mutate: sendCode, isPending: isSending } = useSendDiscountCode();

  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<DiscountCode | null>(null);
  const [sendType, setSendType] = useState<"tat_ca" | "ngau_nhien">("tat_ca");
  const [soLuongNgauNhien, setSoLuongNgauNhien] = useState<number | null>(null);

  const handleAdd = () => nav("/admin/ma-giam-gia/add");
  const handleEdit = (item: DiscountCode) => nav(`/admin/ma-giam-gia/edit/${item.id}`);
  const handleViewDeleted = () => nav("/admin/ma-giam-gia/list/delete");
  const handleToggleStatus = (item: DiscountCode) => {
    toggleStatus({ id: item.id, status: !item.trang_thai });
  };
  const handleDelete = (item: DiscountCode) => {
    softDelete(item.id);
  };
  const handleSendCode = (item: DiscountCode) => {
    setSelectedCode(item);
    setSendModalOpen(true);
  };

  const handleSend = () => {
    if (!selectedCode) return;

    if (sendType === "ngau_nhien" && (!soLuongNgauNhien || soLuongNgauNhien < 1)) {
      toast.error("Vui lòng nhập số lượng người dùng hợp lệ.");
      return;
    }

    const payload: any = {
      kieu: sendType,
      ...(sendType === "ngau_nhien" && { so_luong: soLuongNgauNhien }),
    };

    sendCode(
      {
        id: selectedCode.id,
        payload,
      },
      {
        onSuccess: () => {
          toast.success("Gửi mã giảm giá thành công!");
          setSendModalOpen(false);
          setSelectedCode(null);
          setSendType("tat_ca");
          setSoLuongNgauNhien(null);
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "Gửi mã giảm giá thất bại!";
          toast.error(msg);
          console.error("❌ Lỗi khi gửi mã:", err);
        },
      }
    );
  };

  const columns: ColumnsType<DiscountCode> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Mã", dataIndex: "ma", key: "ma" },
    { title: "Tên", dataIndex: "ten", key: "ten" },
    { title: "Mô tả ", dataIndex: "mo_ta", key: "mo_ta" },
    {
      title: "Loại",
      dataIndex: "loai",
      key: "loai",
    },
    {
      title: "Giá trị",
      dataIndex: "gia_tri",
      key: "gia_tri",
      render: (value, record) =>
        record.loai === "phan_tram" ? `${value}%` : `${value}đ`,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "ngay_bat_dau",
      key: "ngay_bat_dau",
      render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "ngay_ket_thuc",
      key: "ngay_ket_thuc",
      render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      render: (active) =>
        active ? <Tag color="green">Đang áp dụng</Tag> : <Tag color="red">Ngưng</Tag>,
    },
    {
      title: "Bật/Tắt",
      key: "toggle",
      render: (_, record) => (
        <Switch
          checked={record.trang_thai}
          onChange={() => handleToggleStatus(record)}
          checkedChildren="Bật"
          unCheckedChildren="Tắt"
        />
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button size="small" type="default" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button
            size="small"
            danger
            onClick={() => handleDelete(record)}
            loading={isDeleting}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  if (isFetching) return <Spin tip="Đang tải..." />;
  if (isError) return <Alert message="Đã xảy ra lỗi khi tải dữ liệu" type="error" />;

  return (
    <div>
      {/* 🔍 Thanh lọc & tìm kiếm */}
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", gap: 12 }}>
        <Space>
          <Search
            placeholder="Tìm kiếm theo mã hoặc tên"
            allowClear
            enterButton="Tìm"
            onSearch={(val) => {
              setKeyword(val);
              setPage(1);
            }}
            style={{ width: 260 }}
          />
      
        </Space>

        <Space>
          <Button type="primary" onClick={handleAdd}>
            Thêm
          </Button>
          <Button onClick={handleViewDeleted}>Đã xoá mềm</Button>
        </Space>
      </div>

      <Table
        loading={isToggling || isDeleting || isFetching}
        rowKey="id"
        columns={columns}
        dataSource={data?.data || []}
        bordered
        pagination={{
          current: data?.meta?.current_page || 1,
          pageSize: data?.meta?.per_page || 10,
          total: data?.meta?.total || 0,
          onChange: (page) => setPage(page),
          showSizeChanger: false,
        }}
      />

      <Modal
        open={sendModalOpen}
        title={
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>
            Gửi mã giảm giá:{" "}
            <span style={{ color: "#1677ff" }}>{selectedCode?.ma}</span>
          </div>
        }
        width={500}
        onCancel={() => setSendModalOpen(false)}
        onOk={handleSend}
        confirmLoading={isSending}
        okText="Gửi"
        cancelText="Hủy"
      >
        <div style={{ fontSize: "16px", marginBottom: 16 }}>
          Chọn kiểu gửi mã giảm giá:
        </div>
        <Radio.Group
          value={sendType}
          onChange={(e) => setSendType(e.target.value)}
          style={{
            marginBottom: 24,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <Radio value="tat_ca" style={{ fontSize: "15px" }}>
            Gửi đến <strong>tất cả</strong> người dùng
          </Radio>
          <Radio value="ngau_nhien" style={{ fontSize: "15px" }}>
            Gửi đến <strong>ngẫu nhiên</strong> một số người dùng
          </Radio>
        </Radio.Group>

        {sendType === "ngau_nhien" && (
          <>
            <div style={{ marginBottom: 8, fontSize: "15px" }}>
              Nhập số lượng người dùng sẽ nhận mã:
            </div>
            <InputNumber
              placeholder="Số lượng người dùng"
              value={soLuongNgauNhien ?? undefined}
              min={1}
              onChange={(val) => setSoLuongNgauNhien(val)}
              style={{ width: "100%", padding: "6px 10px", fontSize: "16px" }}
            />
          </>
        )}
      </Modal>
    </div>
  );
}
