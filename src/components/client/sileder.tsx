import React, { useRef } from "react";

const products = [
    {
        id: 1,
        name: "Quần short bơi 100 cho nam",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "145.000đ", colors: ["bg-red-600", "bg-blue-600", "bg-lime-500"],
    },
    {
        id: 2,
        name: "Giày chạy bộ JOGFLOW 500.1 cho nam",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "969.000đ",

        colors: ["border", "bg-blue-700"],
        discount: "Giảm 12%",
    },
    {
        id: 3,
        name: "Giày chạy bộ RUN ACTIVE cho nam",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "795.000đ",
        colors: ["bg-black", "bg-yellow-600"],
    },
    {
        id: 4,
        name: "Quần short bơi 100 cho nam - Họa tiết lá cây",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "495.000đ",
        colors: ["bg-black", "bg-yellow-600"],
    },
    {
        id: 5,
        name: "Áo thun ngắn tay TechFRESH",
        image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p431620.jpg?v=1694051065360",
        price: "175.000đ",
        colors: ["bg-black", "bg-yellow-600"],
        discount: "Giảm 10%",
    },
];

const ProductSlider = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div className=" mt-6 mx-auto px-4 flex gap-6 py-6 " 
        style={{
            backgroundImage: `url("https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/e/AmazonStores/ATVPDKIKX0DER/a0f3468fc16178c1ba8d1f2c2b0038d5.w1920.h640._CR0%2C0%2C1920%2C640_SX1500_.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "462px",
        }}>
            <div className="w-[80%] mx-auto px-4 flex gap-6 py-6 "
              
            >

                {/* Left: Title + Arrows */}
                <div className="w-1/4 flex flex-col justify-between h-full">
                    <div className="my-auto">
                        <h2 className="text-2xl font-extrabold text-white mb-2">THỂ THAO CHO NAM</h2>
                        <div className="h-1 w-16 bg-lime-500 mb-6 rounded-full" />
                        <div className="flex space-x-2 mb-6">
                            <button onClick={scrollLeft} className="w-10 h-10 border rounded text-white hover:bg-gray-100 flex items-center justify-center">
                                ←
                            </button>
                            <button onClick={scrollRight} className="w-10 h-10 border rounded text-white hover:bg-gray-100 flex items-center justify-center">
                                →
                            </button>
                        </div>
                    </div>
                </div>
                {/* Right: Products */}
                <div className="w-3/4 overflow-hidden">
                    <div ref={scrollRef} className="flex space-x-4 overflow-x-auto no-scrollbar scroll-smooth">
                        {products.map((product) => (
                            <div key={product.id} className="min-w-[200px] bg-white rounded-md shadow border">
                                <div className="relative">
                                    {product.discount && (
                                        <div className="absolute top-0 left-0 bg-red-500 text-white text-sm px-2 py-1">
                                            {product.discount}
                                        </div>
                                    )}
                                    <img src={product.image} alt={product.name} className="w-full h-52 object-cover" />
                                </div>
                                <div className="p-3">
                                    {product.colors && (
                                        <div className="flex space-x-2 mb-2">
                                            {product.colors.map((color, i) => (
                                                <div key={i} className={`w-4 h-4 rounded-full ${color} border`} />
                                            ))}
                                        </div>
                                    )}
                                    <div className="text-sm text-gray-700">{product.name}</div>
                                    <div className="mt-1">
                                        <span className="text-red-600 font-bold text-base">{product.price}</span>

                                    </div>
                                </div>
                                <div className="bg-lime-400 text-center py-2 font-medium text-gray-800 hover:bg-lime-300 cursor-pointer flex items-center justify-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                                    </svg>
                                    Tùy chọn
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProductSlider;