import 'aos/dist/aos.css';
import AOS from 'aos';
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "../../../stores/cart.store";
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

export default function CartPage() {
  const {
    items: cartItems,
    loading,
    error,
    totalPrice,
    totalQuantity,
    fetchCart,
    updateQuantity,
    removeFromCart
  } = useCartStore();
  const [promoCode, setPromoCode] = useState("SPORT30");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 800, // thời gian chạy animation (ms)
      once: true,    // chỉ chạy 1 lần
    });
  }, []);

  const handleCheckout = () => {
    console.log(cartItems);
    navigate('/thanh-toan', { state: { cartItems, totalPrice, totalQuantity } });
  }

  const handleUpdateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      await removeFromCart(id);
      return;
    }
    await updateQuantity(id, newQuantity);
  }

  const handleRemoveItem = async (id: number) => {
    await removeFromCart(id);
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  }

  const subtotal = totalPrice;
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div
          className="relative bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl overflow-hidden mb-8 p-6 md:p-12 flex flex-col items-center text-center shadow-sm"
          data-aos="fade-down"
        >
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
          {/* Cart Items */}
          <div className="lg:col-span-2" data-aos="fade-right">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Giỏ hàng ({cartItems.length} sản phẩm)</h1>

            <div className="space-y-6">
              {/* {loading && (
                <div className="text-center py-8">
                  <div className="text-gray-600">Đang tải giỏ hàng...</div>
                </div>
              )} */}

              {error && (
                <div className="text-center py-8">
                  <div className="text-red-600">Lỗi: {error}</div>
                </div>
              )}

              {cartItems.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-600">Giỏ hàng trống</div>
                </div>
              )}

              {cartItems.map((item) => (
                <CartItem item={item} formatPrice={formatPrice} handleRemoveItem={handleRemoveItem} handleUpdateQuantity={handleUpdateQuantity} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1" data-aos="fade-left">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>
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

              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium mb-4"
              >
                Tiến hành thanh toán
              </button>

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
  );
}
