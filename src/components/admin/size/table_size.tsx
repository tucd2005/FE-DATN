// components/size/SizeTable.tsx
import { Table, Button, Input } from "antd";
import { Link } from "react-router-dom";

interface Size {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface SizeTableProps {
  sizes: Size[];
}

const SizeTable: React.FC<SizeTableProps> = ({ sizes }) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tên kích thước",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Ngày sửa cuối",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Thao tác",
      key: "action",
      render: () => <Button style={{ backgroundColor: '#007BFF', color: 'white' }}>
      Chi tiết
    </Button>
    },
  ];

  return (
  
    <div
      style={{
       
        background: "white",
        padding: "16px",
        borderRadius: "12px",
        marginBottom: "16px",
      }}
    >
      <Button style={{ backgroundColor: "#5A67D8", color: "white" }}>
        <Link to ={"/admin/size/add"}>Thêm kích cỡ</Link>
        
      </Button>

     
       <Table
      dataSource={sizes}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 6 }}
    />
    </div>

  );
};

export default SizeTable;
