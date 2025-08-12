import { Heart, Eye, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../../types/product.type";

interface ProductCardProps {
    product: Product;
    isFavorite: boolean;
    onToggleFavorite: (productId: number) => void;
}

const ProductCard = ({ product, isFavorite, onToggleFavorite }: ProductCardProps) => {
    const navigate = useNavigate();

    const formatPrice = (price?: string | number) => {
        const num = Number(price);
        if (!isNaN(num)) return num.toLocaleString("vi-VN") + "đ";
        return "0đ";
    };

    const calculateDiscount = (originalPrice: string, salePrice: string) => {
        const original = Number(originalPrice);
        const sale = Number(salePrice);
        if (original > 0 && sale > 0) {
            return Math.round(((original - sale) / original) * 100);
        }
        return 0;
    };

    const variant = product.variants?.[0];
    const originalPrice = variant?.gia;
    const salePrice = variant?.gia_khuyen_mai;
    const discount = calculateDiscount(originalPrice || "0", salePrice || "0");

    const imgPath = Array.isArray(product.hinh_anh) ? product.hinh_anh[0] : product.hinh_anh;
    const src = imgPath?.startsWith("http")
        ? imgPath
        : imgPath
            ? `http://127.0.0.1:8000/storage/${imgPath}`
            : "/placeholder.svg";

    return (
        <div
            onClick={() => navigate(`/san-pham/${product.id}`)}
            className="cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        >
            <div className="relative overflow-hidden">
                <img
                    src={src}
                    alt={product.ten}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm flex items-center gap-1">
                        -{discount}%
                    </div>
                )}

                {/* Favorite Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product.id);
                    }}
                    className={`absolute top-4 right-4 p-2 rounded-full shadow-sm transition-colors duration-200 ${isFavorite
                        ? "bg-red-500 text-white"
                        : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500"
                        }`}
                >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                </button>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                    {product.ten_danh_muc && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                            {product.ten_danh_muc}
                        </span>
                    )}
                </div>
                <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-800 capitalize">{product.ten}</h3>

                <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">{product.mo_ta}</p>

                {/* Rating */}


                <div className="flex items-center gap-3 mb-6">
                    {salePrice && Number(salePrice) > 0 ? (
                        <>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                                {formatPrice(salePrice)}
                            </span>
                            <span className="text-sm text-gray-400 line-through font-medium">
                                {formatPrice(originalPrice)}
                            </span>
                        </>
                    ) : (
                        <span className="text-2xl font-bold text-gray-800">
                            {formatPrice(originalPrice)}
                        </span>
                    )}
                </div>

                <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-teal-600 transition-all duration-200 font-semibold shadow-sm">
                        <ShoppingCart className="w-4 h-4" />
                        Thêm vào giỏ
                    </button>

                    <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 text-gray-600 rounded-lg hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 font-semibold">
                        <Eye className="w-4 h-4" />
                        Chi tiết
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard; 