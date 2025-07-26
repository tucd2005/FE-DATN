import { Table, InputNumber, Input, message } from "antd";
import React, { useState } from "react";
import { useShippingFees, useUpdateShippingFee } from "../../../hooks/useship";

const ShippingFeeListPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useShippingFees(search);
  const updateFee = useUpdateShippingFee();

  const columns = [
    {
      title: "Tỉnh/Thành",
      dataIndex: "tinh_thanh", // đúng theo Resource
      key: "tinh_thanh",
    },
    {
      title: "Phí vận chuyển",
      dataIndex: "phi", // Backend trả về "phi" trong resource
      key: "phi",
      render: (value: number, record: any) => (
        <InputNumber
          min={0}
          value={value}
          onChange={(val) => {
            if (typeof val === "number") {
              updateFee.mutate(
                { id: record.id, phi: val },
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
          }}
        />
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Quản lý phí vận chuyển</h2>
      <Input.Search
        allowClear
        placeholder="Tìm theo tỉnh/thành"
        onSearch={(value) => setSearch(value)}
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
      />
    </div>
  );
};

export default ShippingFeeListPage;
