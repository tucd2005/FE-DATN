    import React from 'react'
    import type { CartItemAPI } from '../../../services/cartService'
import { Minus, Plus, Trash2 } from 'lucide-react'

    type Props = {
        item: CartItemAPI,
        formatPrice: (giatien: number) => string,
        handleUpdateQuantity: (product_id: number, quantity: number) => void,
        handleRemoveItem: (product_id: number) => void,
    }

    const CartItem = ({item,formatPrice,handleUpdateQuantity, handleRemoveItem}: Props) => {
        return (
            <div>
                <div
                    key={item.id}
                    className="flex items-center gap-4 py-6 border-b border-gray-200"
                    data-aos="fade-up"
                >
                    <div className="flex-shrink-0">
                        <img
                            src={item.hinh_anh || "/placeholder.svg"}
                            alt={item.ten_san_pham}
                            className="w-20 h-20 object-cover rounded-lg"
                        />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{item.ten_san_pham}</h3>
                        <div className="flex gap-4 text-sm text-gray-600">
                            {item.bien_the && item.bien_the.thuoc_tinh.map((attr, index) => (
                                <span key={index}>
                                    {attr.ten_thuoc_tinh}: {attr.gia_tri}
                                </span>
                            ))}
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