import type { Variant } from "../../../../types/product.type";

interface ProductActionsProps {
    quantity: number;
    setQuantity: (quantity: number) => void;
    maxQuantity: number;
    selectedVariant: Variant | null;
    product: {
        id: number;
        ten: string;
        so_luong: number;
        gia: number;
        gia_khuyen_mai?: number;
        mo_ta: string;
        variants: Variant[];
    };
    safeLocaleString: (value: number | string | undefined | null) => string;
    handleAddToCart: () => void;
    handleBuyNow: () => void;
}

const ProductActions = ({
    quantity,
    setQuantity,
    maxQuantity,
    selectedVariant,
    product,
    safeLocaleString,
    handleAddToCart,
    handleBuyNow,
}: ProductActionsProps) => {
    const MinusIcon = () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
    );

    const PlusIcon = () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
    );

    const ShoppingCartIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
            />
        </svg>
    );

    const HeartIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
        </svg>
    );

    return (
        <div className="space-y-6">
            {/* Quantity */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-3">Số lượng:</h3>
                <div className="flex items-center space-x-4">
                    <div className={`flex items-center border rounded-lg ${maxQuantity === 0 ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            disabled={maxQuantity === 0}
                            className={`p-2 transition-colors ${maxQuantity === 0 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                        >
                            <MinusIcon />
                        </button>
                        <span className={`px-4 py-2 font-semibold ${maxQuantity === 0 ? 'text-red-600' : ''}`}>{quantity}</span>
                        <button
                            onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                            disabled={maxQuantity === 0}
                            className={`p-2 transition-colors ${maxQuantity === 0 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                        >
                            <PlusIcon />
                        </button>
                    </div>
                    <span className={`${maxQuantity === 0 ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                        {maxQuantity === 0 ? 'Hết hàng' : `Còn lại ${safeLocaleString(selectedVariant ? selectedVariant.so_luong : product?.so_luong)} sản phẩm`}
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
                <button
                    onClick={handleAddToCart}
                    disabled={maxQuantity === 0}
                    className={`w-fit py-2 px-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${maxQuantity === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                >
                    <ShoppingCartIcon />
                    <span className="text-sm">Thêm vào giỏ hàng</span>
                </button>

                <button
                    onClick={handleBuyNow}
                    disabled={maxQuantity === 0}
                    className={`w-fit py-2 px-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${maxQuantity === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'border border-gray-200 bg-white text-gray-800 hover:bg-gray-100'
                        }`}
                >
                    <ShoppingCartIcon />
                    <span className="text-sm">Mua ngay</span>
                </button>

            {/* Out of Stock Message */}
            {maxQuantity === 0 && (
                <div className="mt-3 text-red-600 font-semibold text-base">
                    Sản phẩm đã hết hàng
                </div>
            )}
                <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <HeartIcon />
                </button>
            </div>

        </div>
    );
};

export default ProductActions; 