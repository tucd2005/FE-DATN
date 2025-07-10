import React, { useState } from "react";
import { Table, Tag, Button, Pagination, Spin, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useBlockstaff, useStaffList, useUnblockstaff } from "../../../hooks/useAccount";
import type { Staff } from "../../../services/account";
import { LockOutlined, PlusOutlined, UnlockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


export default function StaffManagementPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useStaffList(page, 10);
const navigate = useNavigate();
  const staffs = data?.data ?? [];
  const pagination = data?.pagination;
  const { mutate: blockUser, isPending: isBlocking } = useBlockstaff();
  const { mutate: unblockUser, isPending: isUnblocking } = useUnblockstaff();
  const columns: ColumnsType<Staff> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "so_dien_thoai",
      key: "so_dien_thoai",
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      render: (text) => (
        <Tag color={text === "active" ? "green" : "red"}>
          {text.toUpperCase()}
        </Tag>
      ),
    },
     {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <>
          {record.trang_thai !== 'blocked' ? (
            <Popconfirm
              title="Xác nhận khóa tài khoản này?"
              okText="Khóa"
              cancelText="Hủy"
              onConfirm={() =>
                blockUser({
                  id: record.id,
                  data: { ly_do_block: 'Khóa bởi admin', block_den_ngay: null }
                })
              }
            >
              <Button
                icon={<LockOutlined />}
                loading={isBlocking}
              >
                Khóa
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Xác nhận mở khóa tài khoản này?"
              okText="Mở khóa"
              cancelText="Hủy"
              onConfirm={() => unblockUser(record.id)}
            >
              <Button
                type="primary"
                icon={<UnlockOutlined />}
                loading={isUnblocking}
              >
                Mở khóa
              </Button>
            </Popconfirm>
          )}
        </>
      )
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách staff</h2>
          <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/admin/accounts/add')}
        >
          Thêm tài khoản
        </Button>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Table
            rowKey="id"
            dataSource={staffs}
            columns={columns}
            pagination={false}
          />
          <div className="flex justify-end mt-4">
            <Pagination
              current={pagination?.current_page}
              pageSize={pagination?.per_page}
              total={pagination?.total}
              onChange={(newPage) => setPage(newPage)}
            />
          </div>
        </>
      )}
    </div>
  );
}
