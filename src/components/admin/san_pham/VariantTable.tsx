import { Table, Tag, Space, Image, Button } from 'antd';
import VariantActions from './VariantActions';

const VariantTable = ({ variants, onEdit, onStop }) => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      render: (src) => <Image src={src} width={50} height={60} />,
    },
    {
      title: 'Kích cỡ',
      dataIndex: 'size',
    },
    {
      title: 'Màu sắc',
      render: (_, record) => (
        <Space>
          {record.color}
          <div
            style={{
              backgroundColor: record.colorCode,
              width: 14,
              height: 14,
              borderRadius: '50%',
              border: '1px solid #ccc',
            }}
          />
        </Space>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status) =>
        status === 'Mở bán' ? (
          <Tag color="green">Mở bán</Tag>
        ) : (
          <Tag color="red">Dừng bán</Tag>
        ),
    },
    {
      title: 'Chức năng',
      render: (_, record) => (
        <VariantActions
          variantId={record.id}
          onEdit={onEdit}
          onStop={onStop}
        />
      ),
    },
  ];

  return (
    <>
      <Button type="primary" style={{ backgroundColor: '#1890ff', color: '#ffffff' }}>
  Thêm biến thể mới
</Button>
      <Table
        dataSource={variants}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default VariantTable;
