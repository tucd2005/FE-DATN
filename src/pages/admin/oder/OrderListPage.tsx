import React, { useRef, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Tooltip,
  Spin,
  Select,
  message,
  Modal,
  Input,
} from "antd";
import { ExclamationCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCancelOrderadmin, useOrderList, useUpdateOrderStatus } from "../../../hooks/useOrder";
import { useQueryClient } from "@tanstack/react-query";

const { Option } = Select;

interface Order {
  id: number;
  ma_don_hang: string;
  dia_chi: string;
  xa?: string;
  huyen?: string;
  thanh_pho?: string;
  trang_thai_thanh_toan: string;
  trang_thai_don_hang: string;
  so_tien_thanh_toan: number;
  phuong_thuc_thanh_toan_id: number;
  created_at: string;
}

const ORDER_STATUS_OPTIONS = [
  { value: "cho_xac_nhan", label: "Chờ xác nhận" },
  { value: "dang_chuan_bi", label: "Đang chuẩn bị" },
  { value: "dang_van_chuyen", label: "Đang vận chuyển" },
  { value: "da_giao", label: "Đã giao" },
  { value: "cho_xac_nhan_tra_hang", label: "Chờ xác nhận trả hàng" },
  { value: "tra_hang_thanh_cong", label: "Trả hàng thành công" },
  { value: "tu_choi_tra_hang", label: "Từ chối trả hàng" },
  { value: "da_huy", label: "Đã huỷ" },
];

const ORDER_STATUS_TAG_MAP: Record<string, { color: string; label: string }> = {
  cho_xac_nhan: { color: "orange", label: "Chờ xác nhận" },
  dang_chuan_bi: { color: "purple", label: "Đang chuẩn bị" },
  dang_van_chuyen: { color: "cyan", label: "Đang vận chuyển" },
  da_giao: { color: "green", label: "Đã giao" },
  yeu_cau_tra_hang: { color: "magenta", label: "Yêu cầu trả hàng" },
  cho_xac_nhan_tra_hang: { color: "gold", label: "Chờ xác nhận trả hàng" },
  tra_hang_thanh_cong: { color: "lime", label: "Trả hàng thành công" },
  tu_choi_tra_hang: { color: "red", label: "Từ chối trả hàng" },
  yeu_cau_huy_hang: { color: "volcano", label: "Yêu cầu huỷ hàng" },
  da_huy: { color: "red", label: "Đã huỷ" },
};

const PAYMENT_STATUS_MAP: Record<string, { color: string; label: string }> = {
  da_thanh_toan: { color: "green", label: "Đã thanh toán" },
  cho_xu_ly: { color: "orange", label: "Chờ xử lý" },
  that_bai: { color: "red", label: "Thất bại" },
  hoan_tien: { color: "blue", label: "Hoàn tiền" },
  da_huy: { color: "red", label: "Đã huỷ" },
  cho_hoan_tien: { color: "gold", label: "Chờ hoàn tiền" },
};

const ORDER_STATUS_FLOW: Record<string, string[]> = {
  cho_xac_nhan: ["dang_chuan_bi", "da_huy"],
  dang_chuan_bi: ["dang_van_chuyen", "da_huy"],
  dang_van_chuyen: ["da_giao"],
  da_giao: [],
  yeu_cau_tra_hang: ["cho_xac_nhan_tra_hang", "tu_choi_tra_hang"],
  cho_xac_nhan_tra_hang: ["tra_hang_thanh_cong"],
  tra_hang_thanh_cong: [],
  tu_choi_tra_hang: [],
  yeu_cau_huy_hang: ["da_huy"],
  da_huy: [],
};

const PAYMENT_METHOD_MAP: Record<number, string> = {
  1: "Thanh toán khi nhận hàng (COD)",
  2: "Thanh toán qua VNPAY",
  3: "Thanh toán qua ZaloPay",
};

const OrderListPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const { data, isLoading } = useOrderList(page);
  const updateStatusMutation = useUpdateOrderStatus();
  const cancelOrderMutation = useCancelOrderadmin();
  const queryClient = useQueryClient();
  const reasonRef = useRef("");

  const handleChangeStatus = (id: number, value: string) => {
    const requiresReason = value === "da_huy" || value === "tu_choi_tra_hang";

    if (requiresReason) {
      reasonRef.current = "";

      Modal.confirm({
        title: value === "da_huy" ? "Lý do huỷ đơn hàng" : "Lý do từ chối trả hàng",
        content: (
          <Input.TextArea
            placeholder="Nhập lý do..."
            onChange={(e) => (reasonRef.current = e.target.value)}
          />
        ),
        onOk: () => {
          const currentReason = reasonRef.current?.trim();
          if (!currentReason) {
            message.error("Vui lòng nhập lý do.");
            return Promise.reject();
          }

          const payload: any = {
            id,
            trang_thai_don_hang: value,
          };
          if (value === "da_huy") payload.ly_do_huy = currentReason;
          if (value === "tu_choi_tra_hang") payload.ly_do_tu_choi_tra_hang = currentReason;

          setPendingId(id);
          return updateStatusMutation
            .mutateAsync(payload)
            .then(() => {
              queryClient.invalidateQueries({ queryKey: ["orders", page] });
              message.success("Cập nhật trạng thái thành công");
            })
            .catch((error: any) => {
              message.error(error?.response?.data?.message || "Cập nhật thất bại");
            })
            .finally(() => setPendingId(null));
        },
      });
    } else {
      setPendingId(id);
      updateStatusMutation.mutate(
        { id, trang_thai_don_hang: value },
        {
          onSuccess: () => {
            message.success("Cập nhật trạng thái thành công");
            queryClient.invalidateQueries({ queryKey: ["orders", page] });
          },
          onError: (error: any) =>
            message.error(error?.response?.data?.message || "Cập nhật thất bại"),
          onSettled: () => setPendingId(null),
        }
      );
    }
  };

  const columns = [
    {
      title: "Mã ĐH",
      dataIndex: "ma_don_hang",
    },
    {
      title: "Địa chỉ",
      render: (_: any, record: Order) => {
        const { dia_chi, xa, huyen, thanh_pho } = record;
        const fullAddress = [dia_chi, xa, huyen, thanh_pho].filter(Boolean).join(", ");
        return fullAddress || "Không rõ";
      },
    },
    {
      title: "Thanh toán",
      dataIndex: "trang_thai_thanh_toan",
      render: (status: string) => {
        const item = PAYMENT_STATUS_MAP[status];
        return item ? <Tag color={item.color}>{item.label}</Tag> : <Tag>{status}</Tag>;
      },
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "trang_thai_don_hang",
      render: (status: string) => {
        const item = ORDER_STATUS_TAG_MAP[status];
        return item ? <Tag color={item.color}>{item.label}</Tag> : <Tag>{status}</Tag>;
      },
    },
    {
      title: "PT Thanh toán",
      dataIndex: "phuong_thuc_thanh_toan_id",
      render: (id: number) => PAYMENT_METHOD_MAP[id] || "Không rõ",
    },
    {
      title: "Tổng tiền",
      dataIndex: "so_tien_thanh_toan",
      render: (value: number) =>
        value?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Cập nhật trạng thái",
      render: (_: any, record: Order) => {
        const currentStatus = record.trang_thai_don_hang;
        const allowedNextStatuses = ORDER_STATUS_FLOW[currentStatus] || [];

        return (
        <Select
  size="small"
  value={currentStatus}
  loading={pendingId === record.id}
  style={{ width: 180 }}
  onChange={(value) => handleChangeStatus(record.id, value)}
  disabled={pendingId !== null}
>
  {ORDER_STATUS_OPTIONS
    .filter(
      (opt) =>
        !(
          (currentStatus === "cho_xac_nhan" || currentStatus === "dang_chuan_bi") &&
          opt.value === "da_huy"
        )
    )
    .map((opt) => (
      <Option
        key={opt.value}
        value={opt.value}
        disabled={!allowedNextStatuses.includes(opt.value) && opt.value !== currentStatus}
      >
        {opt.label}
      </Option>
    ))}
</Select>

        );
      },
    },
    {
      title: "Hành động",
      render: (_: any, record: Order) => {
        const canCancel =
          record.trang_thai_don_hang === "cho_xac_nhan" ||
          record.trang_thai_don_hang === "dang_chuan_bi";

        const handleCancel = () => {
          reasonRef.current = "";

          Modal.confirm({
            title: "Xác nhận huỷ đơn hàng",
            icon: <ExclamationCircleOutlined />,
            content: (
              <Input.TextArea
                placeholder="Nhập lý do huỷ đơn hàng..."
                onChange={(e) => (reasonRef.current = e.target.value)}
              />
            ),
            onOk: () => {
              const lyDo = reasonRef.current?.trim();
              if (!lyDo) {
                message.error("Vui lòng nhập lý do.");
                return Promise.reject();
              }

              return cancelOrderMutation
                .mutateAsync({ id: record.id, ly_do_huy: lyDo })
                .then(() => {
                  queryClient.invalidateQueries({ queryKey: ["orders", page] });
                  message.success("Huỷ đơn hàng thành công");
                })
                .catch((error: any) => {
                  message.error(error?.response?.data?.message || "Huỷ đơn thất bại");
                });
            },
          });
        };

        return (
          <Space>
            <Tooltip title="Xem chi tiết">
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => navigate(`/admin/don-hang/${record.id}`)}
              />
            </Tooltip>

            {canCancel && (
              <Tooltip title="Huỷ đơn">
                <Button danger onClick={handleCancel} loading={cancelOrderMutation.isPending}>
                  Huỷ đơn
                </Button>
              </Tooltip>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng</h2>
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data?.data || []}
          pagination={{
            current: data?.current_page || 1,
            pageSize: data?.per_page || 10,
            total: data?.total || 0,
            onChange: (page) => setPage(page),
            showSizeChanger: false,
          }}
        />
      )}
    </div>
  );
};

export default OrderListPage;
