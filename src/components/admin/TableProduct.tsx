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

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // "" là tất cả
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Lọc theo từ khóa
  const filteredProducts = products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    return matchesName && matchesCategory;
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
                 <a href="/admin/add-san-pham">Thêm sản phẩm</a>
              </button>
              <div>
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="border p-2   rounded"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <select
                  className="border p-2 rounded"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Tất cả danh mục</option>
                  <option value="Áo">Áo</option>
                  <option value="Quần">Quần</option>
                  <option value="Phụ kiện">Phụ kiện</option>
                </select>
              </div>

            </div>

            <div className="flex-auto px-0 pt-0 pb-2">
              <div className="p-0 overflow-x-auto">
                <table className="items-center w-full mb-0 border-collapse text-slate-500">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left uppercase text-xs text-slate-400">Ảnh</th>
                      <th className="px-6 py-3 text-left uppercase text-xs text-slate-400">Mô tả</th>
                      <th className="px-6 py-3 text-center uppercase text-xs text-slate-400">Giá</th>
                      <th className="px-6 py-3 text-center uppercase text-xs text-slate-400">Danh mục</th>
                      <th className="px-6 py-3 text-center uppercase text-xs text-slate-400">Trạng thái</th>
                      <th className="px-6 py-3 text-center uppercase text-xs text-slate-400">Kho</th>
                      <th className="px-6 py-3 text-center uppercase text-xs text-slate-400">Ngày tạo</th>
                      <th className="px-6 py-3 text-center uppercase text-xs text-slate-400">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((product) => (
                      <tr key={product.id}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt="img" className="h-9 w-9 rounded-full object-cover" />
                            <div>
                              <h6 className="text-sm font-semibold text-gray-900">{product.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-gray-600">{product.description}</p>
                        </td>
                        <td className="p-4 text-center">
                          <p className="text-sm font-semibold text-blue-gray-600">{product.price}</p>
                        </td>
                        <td className="p-4 text-center">
                          <p className="text-sm">{product.category}</p>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase text-white ${product.status === 'còn hàng' ? 'bg-green-500' : 'bg-gray-400'}`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <p className="text-sm">{product.stock}</p>
                        </td>
                        <td className="p-4 text-center">
                          <p className="text-sm">{product.date}</p>
                        </td>
                        <td className="p-2 text-center">
                          <div className="flex justify-center gap-2">
                            <a className="px-3 py-1 text-yellow-600 hover:underline cursor-pointer">
                              <i className="fas fa-eye mr-1" />
                              Xem
                            </a>
                            <a className="px-3 py-1 text-red-600 hover:underline cursor-pointer">
                              <i className="far fa-trash-alt mr-1" />
                              Xóa
                            </a>
                            <a href="/admin/edit-san-pham" className="px-3 py-1 text-blue-600 hover:underline cursor-pointer">
                              <i className="fas fa-pencil-alt mr-1" />
                              Sửa
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {currentItems.length === 0 && (
                      <tr>
                        <td colSpan={8} className="text-center py-4 text-gray-400">
                          Không có sản phẩm nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

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

export default ProductTable;
