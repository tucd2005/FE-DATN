import { Table, Tag, Space } from 'antd';

const QuanLyDonHang = () => {
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Order Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'green';
        if (status === 'Processing') color = 'orange';
        if (status === 'Pending') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href={`/orders/${record.orderId}`}>View</a>
          <a>Approve</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      orderId: '#1001',
      customer: 'Nguyen Van A',
      date: '27/05/2025',
      total: '1.200.000đ',
      status: 'Pending',
    },
    {
      key: 2,
      orderId: '#1002',
      customer: 'Tran Thi B',
      date: '27/05/2025',
      total: '900.000đ',
      status: 'Processing',
    },
    {
      key: 3,
      orderId: '#1003',
      customer: 'Le Van C',
      date: '27/05/2025',
      total: '2.000.000đ',
      status: 'Shipped',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default QuanLyDonHang;
