import React from "react";

const products = [
    {
        id: 1,
        name: "Quả bóng rổ BT100 cỡ 7 cho nam từ 13 tuổi trở lên",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "345.000đ",
      
        discount: "Giảm 31%",
        button: "Thêm vào giỏ",
        colors: [],
    },
    {
        id: 2,
        name: "Quần short bơi 100 cho nam",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "145.000đ",
        discount: "Giảm 10%",
        colors: ["bg-red-600", "bg-green-600", "bg-blue-600"],
        button: "Tùy chọn",
    },
    {
        id: 3,
        name: "Áo khoác nỉ leo núi MH520 cho nữ",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "175.000đ",
        colors: ["bg-pink-400", "bg-blue-400"],
        button: "Tùy chọn",
    },
    {
        id: 4,
        name: "Áo khoác nỉ leo núi MH520 cho nữ",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "175.000đ",
        colors: ["bg-pink-400", "bg-blue-400"],
        button: "Tùy chọn",
    },
    {
        id: 5,
        name: "Áo khoác nỉ leo núi MH520 cho nữ",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "175.000đ",
        colors: ["bg-pink-400", "bg-blue-400"],
        button: "Tùy chọn",
    },
    {
        id: 6,
        name: "Áo khoác nỉ leo núi MH520 cho nữ",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "175.000đ",
        colors: ["bg-pink-400", "bg-blue-400"],
        button: "Tùy chọn",
    },
    {
        id: 7,
        name: "Áo khoác nỉ leo núi MH520 cho nữ",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "175.000đ",
        colors: ["bg-pink-400", "bg-blue-400"],
        button: "Tùy chọn",
    },
    {
        id: 8,
        name: "Áo khoác nỉ leo núi MH520 cho nữ",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "175.000đ",
        colors: ["bg-pink-400", "bg-blue-400"],
        button: "Tùy chọn",
    },
    {
        id: 9,
        name: "Áo khoác nỉ leo núi MH520 cho nữ",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "175.000đ",
        colors: ["bg-pink-400", "bg-blue-400"],
        button: "Tùy chọn",
    },
    {
        id: 10,
        name: "Áo khoác nỉ leo núi MH520 cho nữ",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "175.000đ",
        colors: ["bg-pink-400", "bg-blue-400"],
        button: "Tùy chọn",
    },
    {
        id: 11,
        name: "Áo khoác nỉ leo núi MH520 cho nữ",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "175.000đ",
        colors: ["bg-pink-400", "bg-blue-400"],
        button: "Tùy chọn",
    },
    // thêm sản phẩm khác nếu cần
];

const ProductGrid = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">TOP SẢN PHẨM BÁN CHẠY</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.slice(0, 10).map((p) => (
                    <div key={p.id} className="border rounded shadow bg-white">
                        <div className="relative">
                            {p.discount && (
                                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                    {p.discount}
                                </div>
                            )}
                            <img
                                src={p.image}
                                alt={p.name}
                                className="object-contain w-full h-48"
                            />

                        </div>
                        <div className="p-3">
                            {p.colors?.length > 0 && (
                                <div className="flex space-x-1 mb-2">
                                    {p.colors.map((color, idx) => (
                                        <span key={idx} className={`w-4 h-4 rounded-full border ${color}`} />
                                    ))}
                                </div>
                            )}
                            <h3 className="text-sm font-medium text-gray-800">{p.name}</h3>
                            <div className="mt-1 text-base font-bold text-red-600">{p.price}</div>
                          
                        </div>
                        <button className="w-full bg-lime-400 hover:bg-lime-300 text-sm font-semibold text-black py-2 flex items-center justify-center gap-2">
                            {p.button === "Tùy chọn" && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                                </svg>
                            )}
                            {p.button}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
