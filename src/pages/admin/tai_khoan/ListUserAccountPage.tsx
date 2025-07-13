import { Button, Popconfirm, Tag, Table, Modal, Select, Radio, InputNumber } from 'antd';
import React, { useState } from 'react';
import { useAccountListuser, useBlockUser, useUnblockUser } from '../../../hooks/useAccount';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSendDiscountCode } from '../../../hooks/useDiscountCodes';
import { message } from 'antd';
import { useDiscountCodes } from '../../../hooks/useDiscountCodes';

const ListAccountUsePage = () => {
  const { data: accounts = [], isLoading } = useAccountListuser();
  const { mutate: blockUser, isPending: isBlocking } = useBlockUser();
  const { mutate: unblockUser, isPending: isUnblocking } = useUnblockUser();
  const navigate = useNavigate();

  const [sendModal, setSendModal] = useState<{ open: boolean, user?: any }>({ open: false });
  const [selectedCode, setSelectedCode] = useState<number | null>(null);
  const [sendType, setSendType] = useState<'tat_ca' | 'ngau_nhien'>('tat_ca');
  const [soLuong, setSoLuong] = useState<number>(1);
  const { mutate: sendDiscount, isPending } = useSendDiscountCode();

  const { data: discountCodes = [], isLoading: isLoadingDiscountCodes } = useDiscountCodes();

  const handleSend = () => {
    if (!selectedCode) return;
    sendDiscount(
      {
        id: selectedCode,
        payload: { kieu: sendType, so_luong: sendType === 'ngau_nhien' ? soLuong : undefined }
      },
      {
        onSuccess: () => {
          message.success("Đã gửi mã giảm giá!");
          setSendModal({ open: false });
        },
        onError: () => message.error("Gửi thất bại!")
      }
    );
  };

  const columns = [
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'SĐT', dataIndex: 'so_dien_thoai', key: 'so_dien_thoai' },
    { title: 'Vai trò', dataIndex: 'ten_vai_tro', key: 'ten_vai_tro' },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      key: 'trang_thai',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Đang hoạt động' : status === 'blocked' ? 'Đã khóa' : 'Không hoạt động'}
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
          <Button onClick={() => setSendModal({ open: true, user: record })}>
            Gửi mã giảm giá
          </Button>
        </>
      )
    }
  ];

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold">Danh sách tài khoản người dùng</h2>
      
      </div>
      <Table
        columns={columns}
        dataSource={accounts}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        open={sendModal.open}
        onCancel={() => setSendModal({ open: false })}
        onOk={handleSend}
        confirmLoading={isPending}
        title="Gửi mã giảm giá"
      >
        <Select
          style={{ width: '100%' }}
          placeholder="Chọn mã giảm giá"
          onChange={setSelectedCode}
          loading={isLoadingDiscountCodes}
          options={discountCodes.map(code => ({
            value: code.id,
            label: `${code.ma} - ${code.ten} (${code.so_luong_con_lai ?? code.so_luong ?? ''} lượt)`
          }))}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
        <Radio.Group
          value={sendType}
          onChange={e => setSendType(e.target.value)}
          style={{ marginTop: 16 }}
        >
          <Radio value="tat_ca">Gửi tất cả</Radio>
          <Radio value="ngau_nhien">Ngẫu nhiên</Radio>
        </Radio.Group>
        {sendType === 'ngau_nhien' && (
          <InputNumber
            min={1}
            value={soLuong}
            onChange={setSoLuong}
            style={{ marginTop: 16, width: '100%' }}
            placeholder="Số lượng"
          />
        )}
      </Modal>
    </div>
  );
};

export default ListAccountUsePage;
