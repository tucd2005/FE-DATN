import { Table, Button, Popconfirm, Space, Image } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCategory,
  useListCategory,
} from "../../../hooks/useCategory";

export default function CategoryList() {
  const navigate = useNavigate();
  const { data, isLoading } = useListCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Tên", dataIndex: "ten" },
    { title: "Mô tả", dataIndex: "mo_ta" },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (img: string) =>
        img ? (
          <Image width={50} src={`http://localhost:8000/storage/${img}`} />
        ) : (
          "Không có"
        ),
    },
    {
      title: "Hành động",
      render: (_: any, record: any) => (
        <Space>
          <Button onClick={() => navigate(`/admin/category/detail/${record.id}`)}>
            Xem
          </Button>
          <Button onClick={() => navigate(`/admin/danh-muc-edit/${record.id}`)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận xoá danh mục?"
            onConfirm={() => deleteCategory(record.id)}
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Danh sách danh mục</h2>
        <Button type="primary" onClick={() => navigate("/admin/danh-muc-add")}>Thêm danh mục</Button>
      </div>
      <Table
        loading={isLoading}
        rowKey="id"
        columns={columns}
        dataSource={data?.data?.data || []}
        pagination={{
          total: data?.data?.total || 0,
          pageSize: data?.data?.per_page || 10,
          current: data?.data?.current_page || 1,
        }}
      />
    </div>
  );
}
