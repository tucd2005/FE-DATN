import type { Variant } from "../../../../types/product.type";

interface ProductInfoProps {
    product: {
        id: number;
        ten: string;
        so_luong: number;
        gia: number;
        gia_khuyen_mai?: number;
        mo_ta: string;
        variants: Variant[];
    };
    selectedAttributes: { [key: string]: string };
    setSelectedAttributes: (attrs: { [key: string]: string }) => void;
    attributeNames: string[];
    selectedVariant: Variant | null;
    gia: number | undefined;
    giaKhuyenMai: number | undefined;
    safeLocaleString: (value: number | string | undefined | null) => string;
    isAllAttributesSelected: boolean;
    maxQuantity: number;
    isSearchingVariant: boolean;
}

const ProductInfo = ({
    product,
    selectedAttributes,
    setSelectedAttributes,
    attributeNames,
    selectedVariant,
    gia,
    giaKhuyenMai,
    safeLocaleString,
    isAllAttributesSelected,
    maxQuantity,
    isSearchingVariant,
}: ProductInfoProps) => {
    const StarIcon = ({ filled = true, className = "" }) => (
        <svg
            className={`w-5 h-5 ${filled ? "text-yellow-400 fill-current" : "text-gray-300"} ${className}`}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    );

    return (
        <div className="space-y-6">
            {/* Category & Title */}
            <div>
                <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    Áo thể thao
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.ten}</h1>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">
                        <StarIcon filled={true} />
                        <StarIcon filled={true} />
                        <StarIcon filled={true} />
                        <StarIcon filled={true} />
                        <StarIcon filled={false} />
                    </div>
                    <span className="text-gray-600">4.9 (234 đánh giá)</span>
                </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
                {giaKhuyenMai !== undefined &&
                    gia !== undefined &&
                    !isNaN(Number(giaKhuyenMai)) &&
                    !isNaN(Number(gia)) &&
                    Number(giaKhuyenMai) > 0 &&
                    Number(giaKhuyenMai) < Number(gia) ? (
                    <>
                        {/* Giá khuyến mãi - in đậm, không gạch */}
                        <span className="text-3xl font-bold text-gray-900">
                            {safeLocaleString(Number(giaKhuyenMai))}đ
                        </span>

                        {/* Giá gốc - bị gạch */}
                        <span className="text-xl text-blue-600 line-through">
                            {safeLocaleString(Number(gia))}đ
                        </span>

                        {/* Phần trăm giảm giá */}
                        <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                            -
                            {Math.round(((Number(gia) - Number(giaKhuyenMai)) / Number(gia)) * 100)}%
                        </div>
                    </>
                ) : (
                    // Trường hợp không có khuyến mãi
                    <span className="text-3xl font-bold text-gray-900">
                        {selectedVariant
                            ? `${safeLocaleString(selectedVariant.gia)}đ`
                            : product?.gia
                                ? `${safeLocaleString(product.gia)}đ`
                                : isAllAttributesSelected
                                    ? "Liên hệ"
                                    : "Vui lòng chọn đầy đủ thuộc tính"}
                    </span>
                )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.mo_ta}</p>

            {/* Global Out of Stock Message
            {!selectedVariant && product?.variants?.length && product.variants.every(v => v.so_luong === 0) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 font-medium">⚠️ Sản phẩm đã hết hàng</p>
                    <p className="text-red-600 text-sm">Tất cả các biến thể của sản phẩm này đều đã hết hàng</p>
                </div>
            )} */}

            {/* Attributes Selection */}
            <div className="space-y-4">
                {attributeNames.map((attr) => {
                    const values = Array.from(
                        new Set(
                            product.variants.flatMap((v: Variant) =>
                                v.thuoc_tinh.filter((a: { ten: string; gia_tri: string }) => a.ten === attr).map((a: { ten: string; gia_tri: string }) => a.gia_tri)
                            )
                        )
                    );

                    return (
                        <div key={attr}>
                            <h3 className="font-semibold text-gray-900 mb-3">{attr}:</h3>
                            <div className="flex space-x-3 mb-2">
                                {values.map((value) => {
                                    const isColor = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
                                    const hypotheticalSelected = { ...selectedAttributes, [attr]: value };
                                    const matchingVariants = product.variants.filter((v: Variant) =>
                                        attributeNames.every((a) =>
                                            hypotheticalSelected[a]
                                                ? v.thuoc_tinh.some((t: { ten: string; gia_tri: string }) => t.ten === a && t.gia_tri === hypotheticalSelected[a])
                                                : true
                                        )
                                    );
                                    const isOutOfStock = matchingVariants.length === 0 || matchingVariants.every((v: Variant) => v.so_luong === 0);

                                    return (
                                        <button
                                            key={value}
                                            onClick={() => {
                                                if (isOutOfStock) return;
                                                setSelectedAttributes((prev: { [key: string]: string }) => {
                                                    if (prev[attr] === value) {
                                                        const newAttrs = { ...prev };
                                                        delete newAttrs[attr];
                                                        return newAttrs;
                                                    }
                                                    return { ...prev, [attr]: value };
                                                });
                                            }}
                                            disabled={isOutOfStock}
                                            className={
                                                isColor
                                                    ? `w-10 h-10 rounded-full border-4 transition-colors flex items-center justify-center
                              ${selectedAttributes[attr] === value ? "border-blue-500" : "border-gray-200 hover:border-gray-300"}
                              ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`
                                                    : `border-2 rounded-lg px-4 py-2 font-semibold transition-colors
                              ${selectedAttributes[attr] === value ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-700 hover:border-gray-300"}
                              ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`
                                            }
                                            style={isColor ? { backgroundColor: value } : {}}
                                            title={isColor ? value : undefined}
                                        >
                                            {isColor ? "" : value}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductInfo; 