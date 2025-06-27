"use client"

import { Check, Package, MapPin, Truck, ShoppingCart, User, Search } from "lucide-react"

export default function OrderSuccessPage() {
  const orderItems = [
    {
      id: 1,
      name: "Áo thun thể thao Nike Dri-FIT",
      size: "M",
      color: "Đen",
      quantity: 1,
      price: 599000,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      id: 2,
      name: "Giày chạy bộ Adidas Ultraboost",
      size: "42",
      color: "Trắng",
      quantity: 1,
      price: 2999000,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const total = subtotal + shipping

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  return (
    <div className="min-h-screen bg-gray-50">
     

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">Đặt hàng thành công!</h1>
            <p className="text-gray-600">Cảm ơn bạn đã mua sắm tại Sportigo. Đơn hàng của bạn đã được xác nhận.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 flex flex-col space-y-6">
              <div className="bg-white rounded-lg border p-6 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold flex items-center space-x-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      <span>Thông tin đơn hàng</span>
                    </h2>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">Đã xác nhận</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Mã đơn hàng</p>
                      <p className="font-semibold mb-4">#SPT029059</p>
                      <p className="text-sm text-gray-600">Phương thức thanh toán</p>
                      <p className="font-semibold">VNPay</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ngày đặt</p>
                      <p className="font-semibold mb-4">27/06/2025</p>
                      <p className="text-sm text-gray-600">Dự kiến giao hàng</p>
                      <p className="font-semibold">3-5 ngày làm việc</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border p-6 flex flex-col h-full justify-between">
                <h2 className="text-lg font-semibold mb-4">Sản phẩm đã đặt</h2>
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 border p-4 rounded">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border" />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Size: {item.size} | Màu: {item.color} | SL: {item.quantity}</p>
                      </div>
                      <div className="text-right font-semibold">{formatPrice(item.price)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border p-6 flex flex-col h-full justify-between">
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Địa chỉ giao hàng</span>
                </h2>
                <p className="font-semibold">Nguyễn Văn Minh</p>
                <p className="text-gray-600">0123456789</p>
                <p className="text-gray-600">123 Nguyễn Văn Linh, Phường 1, Quận 7, TP. Hồ Chí Minh</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col space-y-6 h-full">
              <div className="bg-white rounded-lg border p-6 flex flex-col h-full justify-between">
                <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium text-green-600">Miễn phí</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border p-6 flex flex-col h-full justify-between space-y-3">
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded font-medium flex items-center justify-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>Theo dõi đơn hàng</span>
                </button>
                <button className="w-full text-gray-700 hover:text-blue-600 py-2 rounded font-medium text-center">
                  Tiếp tục mua sắm
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex flex-col h-full justify-between">
                <h3 className="font-semibold text-blue-900 mb-1">Cần hỗ trợ?</h3>
                <p className="text-sm text-blue-800 mb-2">Liên hệ nếu bạn cần hỗ trợ đơn hàng.</p>
                <p className="text-sm text-blue-800">📞 Hotline: 1900 2024</p>
                <p className="text-sm text-blue-800">✉️ support@sportigo.vn</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8 bg-white rounded-lg border p-6">
  <h2 className="text-center text-2xl font-bold  text-green-600 mb-6">
    Bước tiếp theo
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
    <div>
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
        <Check className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="font-medium">Xác nhận đơn hàng</h3>
      <p className="text-sm text-gray-600">Đơn hàng đã được xác nhận.</p>
    </div>
    <div>
      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
        <Package className="w-6 h-6 text-yellow-600" />
      </div>
      <h3 className="font-medium">Đóng gói</h3>
      <p className="text-sm text-gray-600">Sản phẩm đang được đóng gói.</p>
    </div>
    <div>
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
        <Truck className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="font-medium">Giao hàng</h3>
      <p className="text-sm text-gray-600">Giao hàng 3-5 ngày làm việc.</p>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  )
}
