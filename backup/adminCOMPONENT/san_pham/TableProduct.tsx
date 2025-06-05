import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Select, Button, Space } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;
const itemsPerPage = 5;

const ProductTable = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Lọc theo tên và danh mục
  const filteredProducts = products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    return matchesName && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "ID",
      key: "index",
      render: (_: any, __: any, index: number) => (currentPage - 1) * itemsPerPage + index + 1,
      width: 60,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (img: string) => (
        <img
          src={img}
          alt="product"
          style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%" }}
        />
      ),
      width: 70,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (name: string) => <strong>{name}</strong>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 50,
      render: (description: string) => (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={description}
        >
          {description}
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "center" as const,
      render: (price: number) => (
        <span style={{ fontWeight: "bold", color: "#3b82f6" }}>
          {price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
        </span>
      ),
      width: 100,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      align: "center" as const,
      width: 100,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      width: 100,
      render: (status: string) => (
        <span
          style={{
            width: "30px",
            padding: "2px 8px",
            borderRadius: 9999,
            color: "white",
            backgroundColor: status === "còn hàng" ? "#22c55e" : "#9ca3af",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: 12,
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Kho",
      dataIndex: "stock",
      key: "stock",
      align: "center" as const,
      width: 80,
    },
    {
      title: "Ngày tạo",
      dataIndex: "date",
      key: "date",
      align: "center" as const,
      width: 140,
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center" as const,
      width: 150,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`/admin/chi-tiet-san-pham/${record.id}`} className="text-yellow-600 hover:underline">
            <i className="fas fa-eye mr-1" /> Xem
          </Link>
          <Button
            type="link"
            danger
            onClick={() => {
              alert(`Xóa sản phẩm ID: ${record.id}`);
            }}
          >
            <i className="far fa-trash-alt mr-1" /> Xóa
          </Button>
          <Link to={`/admin/edit-san-pham/${record.id}`} className="text-blue-600 hover:underline">
            <i className="fas fa-pencil-alt mr-1" /> Sửa
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <Button type="primary"style={{ backgroundColor: '#1890ff', color: '#ffffff' }}>
          <Link to="/admin/add-san-pham">Thêm sản phẩm</Link>
        </Button>
        

        <Input
          placeholder="Tìm theo tên sản phẩm..."
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setCurrentPage(1);
          }}
          style={{ width: 200 }}
          allowClear
        />

        <Select
          value={selectedCategory}
          onChange={(value) => {
            setSelectedCategory(value);
            setCurrentPage(1);
          }}
          style={{ width: 160 }}
          allowClear
          placeholder="Chọn danh mục"
        >
          <Option value="">Tất cả danh mục</Option>
          <Option value="Áo">Áo</Option>
          <Option value="Quần">Quần</Option>
          <Option value="Phụ kiện">Phụ kiện</Option>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={currentItems}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: filteredProducts.length,
          onChange: handlePageChange,
          showSizeChanger: false,
        }}
        rowKey="id"
      />
    </div>
  );
};

export default ProductTable;
