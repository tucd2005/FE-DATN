import React, { useState } from "react";
import { Table, Input, Button, Space, Popconfirm } from "antd";

const { Search } = Input;

const products = [
    {
        id: 1,
        name: "Sản phẩm 1",
        description: "Mô tả sản phẩm",
        price: "10.000đ",
        category: "Áo",
        status: "còn hàng",
        stock: 30,
        date: "20/3/2025",
        image:
            "https://bizweb.dktcdn.net/100/301/479/files/bo-quan-ao-bong-chuyen-nam-nu-bulbal-lineage-sportsviet-3.jpg?v=1714209692046",
    },
    {
        id: 2,
        name: "Sản phẩm 2",
        description: "Mô tả khác",
        price: "15.000đ",
        category: "Quần",
        status: "hết hàng",
        stock: 0,
        date: "18/4/2025",
        image:
            "https://bizweb.dktcdn.net/100/301/479/files/bo-quan-ao-bong-chuyen-nam-nu-bulbal-lineage-sportsviet-3.jpg?v=1714209692046",
    },
    {
        id: 3,
        name: "Sản phẩm 3",
        description: "Chi tiết mô tả",
        price: "20.000đ",
        category: "Áo",
        status: "còn hàng",
        stock: 10,
        date: "01/5/2025",
        image:
            "https://bizweb.dktcdn.net/100/301/479/files/bo-quan-ao-bong-chuyen-nam-nu-bulbal-lineage-sportsviet-3.jpg?v=1714209692046",
    },
    {
        id: 4,
        name: "Sản phẩm 4",
        description: "Thông tin",
        price: "12.000đ",
        category: "Phụ kiện",
        status: "hết hàng",
        stock: 0,
        date: "28/4/2025",
        image:
            "https://bizweb.dktcdn.net/100/301/479/files/bo-quan-ao-bong-chuyen-nam-nu-bulbal-lineage-sportsviet-3.jpg?v=1714209692046",
    },
];

const TableCategory = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            title: "ID",
            key: "index",
            render: (_: any, __: any, index: number) => index + 1,
            width: 60,
        },
        {
            title: "Tên danh mục",
            dataIndex: "name",
            key: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
            width: 180,
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            width: 100,
            render: (image: string, record: any) => (
                <img
                    src={image}
                    alt={record.name}
                    style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
                />
            ),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            ellipsis: true,
        },
        {
            title: "Thao tác",
            key: "actions",
            width: 160,
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        size="small"

                        href="/admin/edit-danh-muc"
                    // Có thể thêm link đúng id nếu cần
                    >
                        Sửa
                    </Button>

                    <Popconfirm
                        title="Bạn có chắc muốn xóa?"
                        okText="Có"
                        cancelText="Không"
                        overlayClassName="tailwind-popconfirm"
                        onConfirm={() => {
                            alert(`Xóa danh mục có id: ${record.id}`);
                        }}
                    >
                        <Button type="default" danger size="small">
                            Xóa
                        </Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    return (
        <div className="w-full px-6 py-6 mx-auto bg-white rounded shadow">
            <div className="mb-4 flex justify-between items-center">
                <Button type="primary" style={{ backgroundColor: '#1890ff', color: '#ffffff' }}>
                    <a href="/admin/add-danh-muc" className="text-white no-underline">
                        Thêm danh mục
                    </a>
                </Button>

                <Search
                    placeholder="Tìm kiếm sản phẩm..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    allowClear
                    style={{ width: 250 }}
                />
            </div>

            <Table
                columns={columns}
                dataSource={filteredProducts}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default TableCategory;
