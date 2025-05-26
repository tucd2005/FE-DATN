import { Table, Button, Popconfirm, Tag, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';
import type { Voucher } from '../../../types/voucher/voucher';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface VoucherTableProps {
  data: Voucher[];
  onEdit?: (voucher: Voucher) => void;
  onToggleStatus?: (id: string, checked: boolean) => void; // 👈 Thêm
}

const VoucherTable: React.FC<VoucherTableProps> = ({ data, onEdit, onToggleStatus }) => {
  const columns: ColumnsType<Voucher> = [
    {
      title: '#',
      key: 'index',
      render: (_: unknown, __: Voucher, index: number) => index + 1,
    },
    {
      title: 'Tên voucher',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Mã voucher',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Giá trị giảm (%)',
      dataIndex: 'discountPercent',
      key: 'discountPercent',
    },
    {
      title: 'Giảm tối đa (VNĐ)',
      dataIndex: 'maxDiscount',
      key: 'maxDiscount',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Trạng thái',
      key: 'statusDisplay',
      render: (_, record) => {
        const isExpired = new Date(record.endDate) < new Date();
        return (
          <Tag color={isExpired ? 'red' : 'green'}>
            {isExpired ? 'Hết hạn' : 'Hiệu lực'}
          </Tag>
        );
      },
    },
    {
      title: 'Trạng thái hoạt động',
      key: 'status',
      render: (_, record) => (
        <div className="flex items-center">
        <Switch
          checked={record.status}
          checkedChildren="Hiện"
          unCheckedChildren="Ẩn"
          onChange={(checked) => onToggleStatus?.(record.id, checked)}
        />
      </div>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => format(new Date(date), 'Pp'),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => format(new Date(date), 'Pp'),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => format(new Date(date), 'Pp'),
    },
    {
      title: 'Ngày sửa',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => format(new Date(date), 'Pp'),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: unknown, record: Voucher) => (
        <>
          <Button type="link" onClick={() => onEdit?.(record)}>
            Sửa
          </Button>
          <Popconfirm title="Xác nhận xoá?">
            <Button danger type="link">
              Xoá
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        background: 'white',
        padding: '16px',
        borderRadius: '12px',
        marginBottom: '16px',
      }}
    >
      <Button style={{ backgroundColor: '#5A67D8', color: 'white', marginBottom: 12 }} icon={<PlusOutlined />}>
        <Link to="/admin/Voucher/add" style={{ color: 'white' }}>
          Thêm mã giảm giá
        </Link>
      </Button>

      <Table<Voucher>
        rowKey="id"
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default VoucherTable;
