import React, { useState } from 'react';
import { Table, Tag, Input, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Contact } from '../../../services/contactService';
import { useContactList, useContactSearch } from '../../../hooks/useContact';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const { Option } = Select;

const typeLabels: Record<string, string> = {
  gop_y: 'Góp ý',
  khieu_nai: 'Khiếu nại',
  hop_tac: 'Hợp tác',
  ho_tro: 'Hỗ trợ',
};

const statusColors: Record<string, string> = {
  chua_xu_ly: 'orange',
  da_tra_loi: 'green',
  dang_xu_ly: 'blue',
};

const statusLabels: Record<string, string> = {
  chua_xu_ly: 'Chưa xử lý',
  da_tra_loi: 'Đã trả lời',
  dang_xu_ly: 'Đang xử lý',
};

const ContactListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState('');

  const isSearching = !!search || !!status;
  const { data: listData, isLoading: listLoading } = useContactList({ page });
  const { data: searchData, isLoading: searchLoading } = useContactSearch({ q: search, status, page });

  const data = isSearching ? searchData?.data || [] : listData?.data || [];
  const total = isSearching ? searchData?.total || 0 : listData?.total || 0;
  const loading = isSearching ? searchLoading : listLoading;

  const columns: ColumnsType<Contact> = [
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'SĐT', dataIndex: 'phone', key: 'phone' },
    { title: 'Tiêu đề', dataIndex: 'subject', key: 'subject' },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag>{typeLabels[type] || type}</Tag>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusColors[status] || 'default'}>
          {statusLabels[status] || status}
        </Tag>
      ),
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Contact) => (
        <Link to={`/admin/lien-he/${record.id}`}>Xem</Link>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 16, fontWeight: 600, fontSize: 20 }}>
        Quản lý liên hệ
      </h2>
      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Input.Search
          placeholder="Tìm kiếm theo tên, email, tiêu đề..."
          allowClear
          onSearch={v => { setSearch(v); setPage(1); }}
          style={{ width: 250 }}
        />
        <Select
          allowClear
          placeholder="Trạng thái"
          style={{ width: 150 }}
          onChange={v => { setStatus(v); setPage(1); }}
        >
          <Option value="chua_xu_ly">Chưa xử lý</Option>
          <Option value="dang_xu_ly">Đang xử lý</Option>
          <Option value="da_tra_loi">Đã trả lời</Option>
        </Select>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        bordered
        loading={loading}
        pagination={{
          pageSize: 10,
          total,
          current: page,
          onChange: setPage,
        }}
      />
    </div>
  );
};

export default ContactListPage;
