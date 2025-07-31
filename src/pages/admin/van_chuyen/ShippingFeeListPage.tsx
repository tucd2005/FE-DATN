import { Table, InputNumber, Input, message, Button, Space } from "antd";
import React, { useState } from "react";
import { useShippingFees, useUpdateShippingFee } from "../../../hooks/useship";

const ShippingFeeListPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useShippingFees({ search, page });
  const updateFee = useUpdateShippingFee();

  // State lưu phí tạm thời từng dòng
  const [editFees, setEditFees] = useState<Record<number, number>>({});

  const handleChangeFee = (id: number, value: number | null) => {
    if (typeof value === "number") {
      setEditFees((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleUpdateFee = (id: number) => {
    const phi = editFees[id];
    if (typeof phi === "number") {
      updateFee.mutate(
        { id, phi },
        {
          onSuccess: () => {
            message.success("Cập nhật thành công");
          },
          onError: () => {
            message.error("Cập nhật thất bại");
          },
        }
      );
    }
  };

  const columns = [
    {
      title: "Tỉnh/Thành",
      dataIndex: "tinh_thanh",
      key: "tinh_thanh",
    },
    {
      title: "Phí vận chuyển",
      dataIndex: "phi",
      key: "phi",
      render: (value: number, record: any) => (
        <Space>
          <InputNumber
            min={0}
            style={{ width: 120 }}
            value={editFees[record.id] ?? value}
            formatter={(val) =>
              val ? `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ" : ""
            }
            parser={(val) => Number(val?.replace(/\s?VNĐ|\./g, "") || 0)}
            onChange={(val) => handleChangeFee(record.id, val)}
          />
          <Button
            type="primary"
            onClick={() => handleUpdateFee(record.id)}
            disabled={editFees[record.id] === undefined || editFees[record.id] === value}
          >
            Cập nhật
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Quản lý phí vận chuyển</h2>
      <Input.Search
        allowClear
        placeholder="Tìm theo tỉnh/thành"
        onSearch={(value) => {
          setSearch(value);
          setPage(1); // reset về trang 1 khi tìm kiếm
        }}
        style={{ maxWidth: 300, marginBottom: 16 }}
      />
      <Table
        rowKey="id"
        columns={columns}
        loading={isLoading}
        dataSource={data?.data || []}
        pagination={{
          total: data?.meta?.total,
          pageSize: data?.meta?.per_page,
          current: data?.meta?.current_page,
          showSizeChanger: false,
        }}
        onChange={(pagination) => {
          setPage(pagination.current || 1);
        }}
      />
    </div>
  );
};

export default ShippingFeeListPage;
