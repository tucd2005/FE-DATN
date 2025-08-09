import 'aos/dist/aos.css';
import AOS from 'aos';
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "../../../stores/cart.store";
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { Modal, message } from 'antd';
import { toast } from 'react-toastify';

const CartPage = () => {
  const {
    items: cartItems,
    error,
    fetchCart,
    updateQuantity,
    removeFromCart
  } = useCartStore();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const navigate = useNavigate();

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Init animation
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Sync selectedItems when cart changes
  useEffect(() => {
    if (
      selectedItems.length > 0 &&
      selectedItems.length !== cartItems.length &&
      !selectedItems.every(id => cartItems.some(item => item.id === id))
    ) {
      setSelectedItems(selectedItems.filter(id => cartItems.some(item => item.id === id)));
    }
  }, [cartItems]);

  const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.id));
const subtotal = selectedCartItems.reduce(
  (sum, item) => sum + (Number(item?.thanh_tien) || 0),
  0
);

  const shipping = 0;
  const total = subtotal + shipping;
  const selectedTotalQuantity = selectedCartItems.reduce(
    (sum, item) => sum + (Number(item?.so_luong) || 0),
    0
  );
  

  const handleCheckout = () => {
    if (selectedCartItems.some(item => !!item.error_message)) {
      toast.error("Có sản phẩm trong giỏ hàng đã bị xóa hoặc hết hàng. Vui lòng kiểm tra lại!");
      return;
    }
    navigate('/thanh-toan', {
      state: {
        cartItems: selectedCartItems,
        totalPrice: subtotal,
        totalQuantity: selectedTotalQuantity,
      },
    });
  };

  const handleUpdateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number) => {
    Modal.confirm({
      title: "Xác nhận xoá sản phẩm",
      content: "Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng?",
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      centered: true,
      onOk: async () => {
        await removeFromCart(id);
      },
    });
  };

  const formatPrice = (price: number | string | undefined | null) => {
    const num = typeof price === "number"
      ? price
      : typeof price === "string" && !isNaN(Number(price))
        ? Number(price)
        : 0;
    return num.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Giỏ hàng ({cartItems.length} sản phẩm)
            </h1>

            {selectedItems.length > 0 && (
              <p className="text-sm text-gray-600 mb-4">
                Đã chọn <strong>{selectedItems.length}</strong> sản phẩm
              </p>
            )}

            {error && (
              <div className="text-center py-8 text-red-600">
                Lỗi: {error}
              </div>
            )}

            {cartItems.length === 0 && (
              <div className="text-center py-8 text-gray-600">
                Giỏ hàng trống
              </div>
            )}

            {cartItems.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === cartItems.length}
                    onChange={(e) => {
                      setSelectedItems(
                        e.target.checked ? cartItems.map(item => item.id) : []
                      );
                    }}
                    className="w-5 h-5 accent-blue-500"
                  />
                  <span className="text-gray-700">Chọn tất cả</span>
                </div>

                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      formatPrice={formatPrice}
                      handleRemoveItem={handleRemoveItem}
                      handleUpdateQuantity={handleUpdateQuantity}
                      isSelected={selectedItems.includes(item.id)}
                      onToggleSelect={(checked) => {
                        setSelectedItems((prev) =>
                          checked
                            ? [...prev, item.id]
                            : prev.filter(id => id !== item.id)
                        );
                      }}
                    />
                  ))}
                </div>
              </>
            )}
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

              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium mb-4"
                disabled={selectedItems.length === 0} // chỉ disable khi chưa chọn sản phẩm
              >
                Tiến hành thanh toán
              </button>

              <div className="text-center">
                <a href="/" className="text-blue-600 hover:text-blue-700 transition-colors text-sm">
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
export default CartPage