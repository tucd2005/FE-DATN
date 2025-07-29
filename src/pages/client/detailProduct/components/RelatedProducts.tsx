const RelatedProducts = () => {
    const StarIcon = ({ filled = true, className = "" }) => (
        <svg
            className={`w-5 h-5 ${filled ? "text-yellow-400 fill-current" : "text-gray-300"} ${className}`}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    );

    const relatedProducts = [
        {
            name: "Áo thể thao Nike Pro",
            price: "1,200,000",
            originalPrice: "1,600,000",
            discount: "-25%",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            name: "Quần short Nike Dri-FIT",
            price: "800,000",
            originalPrice: "1,000,000",
            discount: "-20%",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            name: "Áo khoác Nike Windrunner",
            price: "1,800,000",
            originalPrice: "2,400,000",
            discount: "-25%",
            image: "/placeholder.svg?height=300&width=300",
        },
        {
            name: "Giày Nike Air Max",
            price: "2,400,000",
            originalPrice: "3,200,000",
            discount: "-25%",
            image: "/placeholder.svg?height=300&width=300",
        },
    ];

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group">
                        <div className="relative overflow-hidden rounded-t-lg">
                            <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                                {product.discount}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-bold text-blue-600">{product.price}đ</span>
                                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}đ</span>
                                </div>
                                <div className="flex">
                                    <StarIcon filled={true} className="w-3 h-3" />
                                    <StarIcon filled={true} className="w-3 h-3" />
                                    <StarIcon filled={true} className="w-3 h-3" />
                                    <StarIcon filled={true} className="w-3 h-3" />
                                    <StarIcon filled={true} className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts; 