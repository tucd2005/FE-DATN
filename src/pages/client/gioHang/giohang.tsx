import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  User,
  Star,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Shirt,
  Dumbbell,
  Target,
  Zap,
  Trophy,
  Percent,
  Minus,
  Plus,
  Trash2,
} from "lucide-react"
import { useState } from "react"

interface CartItem {
  id: number
  name: string
  size: string
  color: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Áo thun thể thao Nike Dri-FIT",
      size: "M",
      color: "Đen",
      price: 599000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      id: 2,
      name: "Giày chạy bộ Adidas Ultraboost",
      size: "42",
      color: "Trắng",
      price: 2999000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    },
  ])

  const [promoCode, setPromoCode] = useState("SPORT30")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ"
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0 // Miễn phí
  const total = subtotal + shipping

  return (

    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl overflow-hidden mb-8 p-6 md:p-12 flex flex-col items-center text-center shadow-sm">
  <ShoppingCart className="absolute opacity-10 w-48 h-48 text-blue-300 -bottom-4 -left-4 rotate-12 hidden md:block" />
  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Giỏ hàng của bạn</h1>
  <p className="text-gray-700 max-w-md mb-4">
    Xem lại các sản phẩm bạn đã chọn và tận dụng ưu đãi <span className="font-semibold text-blue-600">SPORT30</span> để tiết kiệm hơn trước khi thanh toán.
  </p>
  <a
    href="/"
    className="inline-flex items-center gap-2 bg-white hover:bg-blue-600 text-blue-600 hover:text-white font-medium px-5 py-2 rounded-full transition-colors shadow"
  >
    <ShoppingCart className="w-4 h-4" />
    Tiếp tục mua sắm
  </a>
</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Giỏ hàng ({cartItems.length} sản phẩm)</h1>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-6 border-b border-gray-200">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{item.name}</h3>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>Size: {item.size}</span>
                      <span>Màu: {item.color}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-lg font-semibold text-gray-900">{formatPrice(item.price)}</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  {/* Item Total */}
                  <div className="text-right min-w-[120px]">
                    <span className="text-lg font-semibold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>

              {/* Order Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium">Miễn phí</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Mã giảm giá (SPORT30)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium">
                    Áp dụng
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium mb-4">
                Tiến hành thanh toán
              </button>

              {/* Continue Shopping */}
              <div className="text-center">
                <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors text-sm">
                  Tiếp tục mua sắm
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
   
    </div>
    
  )
}
