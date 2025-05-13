import React, { useState } from "react";

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
        image: "../assets/img/team-2.jpg"
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
        image: "../assets/img/team-3.jpg"
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
        image: "../assets/img/team-2.jpg"
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
        image: "../assets/img/team-3.jpg"
    },
    {
        id: 5,
        name: "Sản phẩm 5",
        description: "Mô tả phụ",
        price: "18.000đ",
        category: "Áo",
        status: "còn hàng",
        stock: 12,
        date: "10/5/2025",
        image: "../assets/img/team-2.jpg"
    },
    {
        id: 6,
        name: "Sản phẩm 6",
        description: "Chi tiết khác",
        price: "25.000đ",
        category: "Quần",
        status: "còn hàng",
        stock: 8,
        date: "11/5/2025",
        image: "../assets/img/team-3.jpg"
    }
];

const TableCategory = () => {
    const [searchTerm, setSearchTerm] = useState(""); // "" là tất cả
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Lọc theo từ khóa
    const filteredProducts = products.filter((product) => {
        const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
   
        return matchesName ;
    });

    // Tính toán phân trang
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="w-full px-6 py-6 mx-auto">
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3">
                    <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-xl rounded-2xl">
                        {/* Ô tìm kiếm */}

                        <div className="w-full mb-4  p-5 flex items-center justify-between gap-4">
                            <button
                                type="button"
                                className="bg-[rgb(94_114_228)] hover:bg-[rgb(74_94_208)] text-white rounded px-3 py-1"
                            >
                                <a href="/admin/add-danh-muc">Thêm danh mục</a>
                            </button>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm sản phẩm..."
                                    className="border p-2   rounded"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />

                            </div>

                        </div>

                
                                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
                                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                        <tr>
                                        <th className="px-6 py-3 text-left">ID</th>
                                            <th className="px-6 py-3 text-left">Tên danh mục </th>
                                            <th className="px-6 py-3 text-left">Mô tả</th>
                                            <th className="px-6 py-3 text-left">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {currentItems.map((product,index) => (               
                                            <tr key={product.id} className="hover:bg-gray-50 transition duration-200">
                                                <td className="px-6 py-4">{index+1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                       
                                                        <h1 className="font-medium text-sil text-gray-800">{product.name}</h1>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">{product.description}</td>
                                                <td className="px-6 py-4 space-x-3">
                                                    <a className="text-red-500 hover:underline cursor-pointer">
                                                        <i className="far fa-trash-alt mr-1" />
                                                        Xóa
                                                    </a>
                                                    <a
                                                        href="/admin/edit-danh-muc"
                                                        className="text-blue-500 hover:underline cursor-pointer"
                                                    >
                                                        <i className="fas fa-pencil-alt mr-1" />
                                                        Sửa
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                        {currentItems.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="text-center py-4 text-gray-400">
                                                    Không có sản phẩm nào.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                        

                        {/* Phân trang */}
                        <div className="flex justify-center items-center gap-2 py-4">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-white bg-blue-500 rounded-l disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 text-white bg-blue-500 rounded-r disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableCategory;
