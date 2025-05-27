
import { Button, Image, Table, Popconfirm, message, Input } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useList, useUpdate } from "../../../hooks/useCategory";

export default function TableCategory() {
  const { data, isLoading, refetch } = useList({ resource: "categories" });
  const { mutate: updateCategory } = useUpdate({ resource: "categories" });

  const [searchText, setSearchText] = useState("");

  const handleSoftDelete = (category: any) => {
    updateCategory(
      { id: category.id, values: { deleted: true } },
      {
        onSuccess: () => {
          message.success("Xóa danh mục thành công (xóa mềm)");
          refetch();
        },
        onError: () => {
          message.error("Xóa thất bại");
        },
      }
    );
  };

  // Lọc dữ liệu theo searchText (theo tên)
  const filteredData = data
    ?.filter((c: any) => !c.deleted)
    .filter((c: any) =>
      c.name.toLowerCase().includes(searchText.toLowerCase())
    );

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Tên", dataIndex: "name" },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (imageSrc: string) => <Image src={imageSrc} width={100} />,
    },
    { title: "Mô tả", dataIndex: "description" },
    { title: "Ngày tạo", dataIndex: "createdAt" },
    {
      title: "Thao tác",
      render: (_: any, category: any) => (
        <>
          <Button style={{ marginRight: 8 }}>
            <Link to={`/admin/categorys/edit/${category.id}`}>Edit</Link>
          </Button>

          <Popconfirm
            title="Bạn có chắc muốn xóa danh mục này?"
            onConfirm={() => handleSoftDelete(category)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>

     <div className="mb-4 ">
  <Input.Search
    placeholder="Tìm kiếm tên danh mục"
    allowClear
    onChange={(e) => setSearchText(e.target.value)}
    style={{ width: 300 }}
  />
</div>
      <Table
        dataSource={filteredData}
        columns={columns}
        loading={isLoading}
        rowKey="id"
      />
    </div>
  );
}
