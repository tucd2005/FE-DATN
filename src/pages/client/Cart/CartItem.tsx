import React from 'react'
import type { CartItemAPI } from '../../../services/cartService'
import { Minus, Plus, Trash2 } from 'lucide-react'

type Props = {
    item: CartItemAPI,
    formatPrice: (giatien: number | string | undefined | null) => string,
    handleUpdateQuantity: (product_id: number, quantity: number) => void,
    handleRemoveItem: (product_id: number) => void,
    isSelected?: boolean;
    onToggleSelect?: (checked: boolean) => void;
}

const CartItem = ({ item, formatPrice, handleUpdateQuantity, handleRemoveItem, isSelected, onToggleSelect }: Props) => {
    console.log("bien_the:", item.bien_the);
    const getBienTheImg = (bien_theImg: string | string[] | undefined) => {
        if (!bien_theImg) return null;
        if (Array.isArray(bien_theImg)) return bien_theImg[0];
        if (typeof bien_theImg === "string" && bien_theImg.startsWith("[")) {
            try {
                const arr = JSON.parse(bien_theImg);
                if (Array.isArray(arr) && arr.length > 0) return arr[0];
            } catch { /* ignore JSON parse error */ }
        }
        return bien_theImg;
    };

    const bienTheImg = getBienTheImg(item.bien_the?.hinh_anh);

    const imgSrc =
        bienTheImg
            ? bienTheImg.startsWith("http")
                ? bienTheImg
                : `http://localhost:8000/storage/${bienTheImg}`
            : item.hinh_anh
                ? item.hinh_anh.startsWith("http")
                    ? item.hinh_anh
                    : `http://localhost:8000/storage/${item.hinh_anh}`
                : "/placeholder.svg";

    return (
        <div>
            <div
                key={item.id}
                className="flex items-center gap-4 py-6 border-b border-gray-200"
                data-aos="fade-up"
            >
                <div className="flex items-center gap-2">
                    {typeof isSelected !== "undefined" && onToggleSelect && (
                        <input type="checkbox" checked={isSelected}
                            onChange={(e) => onToggleSelect(e.target.checked)}
                            className='w-5 h-5 accent-blue-500'
                        />
                    )}

                    <img
                        src={imgSrc}
                        alt={item.ten_san_pham}
                        className="w-20 h-20 object-cover rounded-lg"
                    />
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{item.ten_san_pham}</h3>
                    <div className="flex gap-4 text-sm text-gray-600">
                        {(item.bien_the?.thuoc_tinh || []).map((attr, index) => {
                            const isColor = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(attr.gia_tri);
                            return (
                                <span key={index} className="flex items-center gap-1">
                                    {attr.ten_thuoc_tinh}:
                                    {isColor ? (
                                        <span
                                            className="inline-block w-5 h-5 rounded-full border ml-1"
                                            style={{ backgroundColor: attr.gia_tri }}
                                            title={attr.gia_tri}
                                        />
                                    ) : (
                                        <span className="ml-1">{attr.gia_tri}</span>
                                    )}
                                </span>
                            );
                        })}
                    </div>
                    <div className="mt-2">
                        <span className="text-lg font-semibold text-gray-900">{formatPrice(item.gia_san_pham)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleUpdateQuantity(item.id, item.so_luong - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.so_luong}</span>
                    <button
                        onClick={() => handleUpdateQuantity(item.id, item.so_luong + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                >
                    <Trash2 className="w-5 h-5" />
                </button>

                <div className="text-right min-w-[120px]">
                    <span className="text-lg font-semibold text-gray-900">
                        {formatPrice(item.thanh_tien)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CartItem