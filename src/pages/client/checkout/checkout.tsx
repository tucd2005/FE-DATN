import { useState } from "react"
import { MapPin, Truck, CreditCard, Wallet, Shield, Clock, CheckCircle, ArrowLeft } from "lucide-react"

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("vnpay")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const orderItems = [
    {
      id: 1,
      name: "Áo thun thể thao Nike Dri-FIT",
      size: "M",
      color: "Đen",
      quantity: 1,
      price: 599000,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      id: 2,
      name: "Giày chạy bộ Adidas Ultraboost",
      size: "42",
      color: "Trắng",
      quantity: 1,
      price: 2999000,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const total = subtotal + shipping

  const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price) + "đ"

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Thanh toán đơn hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="border rounded-lg bg-white">
              <div className="border-b p-4">
                <h3 className="flex items-center space-x-2 text-lg font-semibold">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Địa chỉ giao hàng</span>
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label htmlFor="address" className="text-sm font-medium text-gray-700">Địa chỉ *</label>
                  <input id="address" placeholder="123 Nguyễn Văn Linh" defaultValue="123 Nguyễn Văn Linh" className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Tỉnh/Thành phố *', 'Quận/Huyện *', 'Phường/Xã *'].map((label, idx) => (
                    <div key={idx}>
                      <label className="text-sm font-medium text-gray-700">{label}</label>
                      <select className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Chọn {label.toLowerCase().replace(' *', '')}</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="note" className="text-sm font-medium text-gray-700">Ghi chú giao hàng (tuỳ chọn)</label>
                  <input id="note" placeholder="Ghi chú cho shipper..." className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="border rounded-lg bg-white p-4 space-y-2">
              <h3 className="flex items-center space-x-2 text-lg font-semibold mb-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <span>Phương thức vận chuyển</span>
              </h3>
              <div className="border rounded p-4 bg-green-50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">Giao hàng tiêu chuẩn</div>
                    <div className="text-sm text-gray-600">3-5 ngày làm việc</div>
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Miễn phí</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border rounded-lg bg-white p-4 space-y-4">
              <h3 className="flex items-center space-x-2 text-lg font-semibold">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span>Phương thức thanh toán</span>
              </h3>
              {['vnpay', 'cod'].map((method) => (
                <label key={method} className="flex items-start space-x-3 p-4 border rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={selectedPayment === method}
                    onChange={() => setSelectedPayment(method)}
                    className="mt-1 accent-blue-600"
                  />
                  <div>
                    <div className="font-medium">{method === 'vnpay' ? 'VNPay' : 'Thanh toán khi nhận hàng (COD)'}</div>
                    <div className="text-sm text-gray-600">
                      {method === 'vnpay' ? 'Thanh toán qua ví điện tử VNPay' : 'Thanh toán bằng tiền mặt khi nhận hàng'}
                    </div>
                    {selectedPayment === method && method === 'vnpay' && (
                      <div className="mt-2 bg-blue-50 border border-blue-200 rounded p-2 text-sm text-blue-800 space-y-1">
                        <div className="flex items-center space-x-1"><CheckCircle className="w-4 h-4" /><span>Hỗ trợ thanh toán qua thẻ ATM, Internet Banking</span></div>
                        <div className="flex items-center space-x-1"><CheckCircle className="w-4 h-4" /><span>Thanh toán qua ví điện tử VNPay</span></div>
                        <div className="flex items-center space-x-1"><Shield className="w-4 h-4" /><span>Bảo mật với công nghệ SSL</span></div>
                        <div className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>Giao dịch nhanh chóng, an toàn</span></div>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg bg-white p-4 sticky top-24 space-y-4">
              <h3 className="text-lg font-semibold">Đơn hàng của bạn</h3>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex space-x-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border" />
                    <div className="flex-1">
                      <div className="font-medium text-sm line-clamp-2">{item.name}</div>
                      <div className="text-sm text-gray-600">Size: {item.size} | Màu: {item.color} | SL: {item.quantity}</div>
                      <div className="font-medium mt-1">{formatPrice(item.price)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="text-sm space-y-1">
                <div className="flex justify-between"><span>Tạm tính:</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span>Phí vận chuyển:</span><span className="text-green-600">Miễn phí</span></div>
                <hr />
                <div className="flex justify-between font-bold text-lg"><span>Tổng cộng:</span><span className="text-blue-600">{formatPrice(total)}</span></div>
              </div>
              <hr />
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mt-1 accent-blue-600" />
                <span className="text-sm text-gray-600">Tôi đồng ý với <a href="#" className="text-blue-600 underline">điều khoản dịch vụ</a> và <a href="#" className="text-blue-600 underline">chính sách bảo mật</a></span>
              </label>
              <button disabled={!agreedToTerms} className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded disabled:opacity-50">Đặt hàng</button>
              <p className="text-xs text-gray-500 text-center">Bằng cách đặt hàng, bạn xác nhận đã đọc và đồng ý với các điều khoản của chúng tôi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
