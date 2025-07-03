"use client"

import { useState, useEffect } from "react"
import { MapPin, Truck, CreditCard, Shield, CheckCircle, Banknote, ChevronRight, ChevronDown } from "lucide-react"

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("vnpay")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [note, setNote] = useState("")
  const [provinces, setProvinces] = useState<any[]>([])
  const [districts, setDistricts] = useState<any[]>([])
  const [wards, setWards] = useState<any[]>([])
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedWard, setSelectedWard] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error">("success")

  const orderItems = [
    {
      san_pham_id: 1,
      bien_the_id: 1,
      name: "Sony WH-1000XM5",
      size: "M",
      color: "Đỏ",
      quantity: 1,
      price: 206239,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const total = subtotal + shipping

  const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price) + "đ"

  const paymentMethods = [
    {
      id: "vnpay",
      name: "VNPay",
      description: "Thanh toán qua VNPay",
      detail: "Hỗ trợ thẻ ATM, Internet Banking, QR Code",
      icon: <CreditCard className="w-5 h-5" />,
      color: "bg-blue-50 border-blue-200 text-blue-700",
      recommended: true,
    },
    {
      id: "cod",
      name: "Thanh toán khi nhận hàng (COD)",
      description: "Trả tiền mặt khi nhận hàng",
      detail: "Thanh toán bằng tiền mặt cho shipper",
      icon: <Banknote className="w-5 h-5" />,
      color: "bg-green-50 border-green-200 text-green-700",
      recommended: false,
    },
  ]

  const showToastMessage = (message: string, type: "success" | "error") => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleOrder = () => {
    if (!fullName || !phone || !email || !address || !selectedProvince || !selectedDistrict || !selectedWard) {
      showToastMessage("Vui lòng điền đầy đủ thông tin giao hàng", "error")
      return
    }

    if (!agreedToTerms) {
      showToastMessage("Vui lòng đồng ý với điều khoản và điều kiện", "error")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      showToastMessage("Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.", "success")
    }, 2000)
  }

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
  }, [])

  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts || []))
    } else {
      setDistricts([])
      setWards([])
      setSelectedDistrict("")
      setSelectedWard("")
    }
  }, [selectedProvince])

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards || []))
    } else {
      setWards([])
      setSelectedWard("")
    }
  }, [selectedDistrict])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div
            className={`p-4 rounded-lg shadow-lg border ${
              toastType === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center gap-2">
              {toastType === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              )}
              <span className="font-medium">{toastMessage}</span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thanh toán đơn hàng</h1>
          <p className="text-gray-600">Vui lòng kiểm tra thông tin và hoàn tất đơn hàng của bạn</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái */}
          <div className="lg:col-span-2 space-y-6">
            {/* Địa chỉ giao hàng */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Địa chỉ giao hàng</h2>
                </div>
                <p className="text-gray-600 text-sm">Thông tin người nhận hàng</p>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Họ và tên *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nhập họ và tên"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Số điện thoại *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Nhập số điện thoại"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập địa chỉ email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Địa chỉ cụ thể *
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Số nhà, tên đường..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Tỉnh/Thành phố *</label>
                    <div className="relative">
                      <select
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                      >
                        <option value="">Chọn tỉnh/thành phố</option>
                        {provinces.map((p) => (
                          <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Quận/Huyện *</label>
                    <div className="relative">
                      <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        disabled={!selectedProvince}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-500"
                      >
                        <option value="">Chọn quận/huyện</option>
                        {districts.map((d) => (
                          <option key={d.code} value={d.code}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Phường/Xã *</label>
                    <div className="relative">
                      <select
                        value={selectedWard}
                        onChange={(e) => setSelectedWard(e.target.value)}
                        disabled={!selectedDistrict}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-500"
                      >
                        <option value="">Chọn phường/xã</option>
                        {wards.map((w) => (
                          <option key={w.code} value={w.code}>
                            {w.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                    Ghi chú giao hàng
                  </label>
                  <textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ghi chú đặc biệt cho đơn hàng..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Phương thức vận chuyển */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Phương thức vận chuyển</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Giao hàng tiêu chuẩn</p>
                      <p className="text-sm text-green-600">Thời gian: 3-5 ngày làm việc</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    Miễn phí
                  </span>
                </div>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Phương thức thanh toán</h2>
                </div>
                <p className="text-gray-600 text-sm">Chọn phương thức thanh toán phù hợp với bạn</p>
              </div>

              <div className="p-6 space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="relative">
                    <label
                      className={`flex items-start space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedPayment === method.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${method.color}`}>{method.icon}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">{method.name}</span>
                              {method.recommended && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                  Khuyến nghị
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>

                        {selectedPayment === method.id && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <Shield className="w-4 h-4 text-green-500" />
                              <span>{method.detail}</span>
                            </div>
                            {method.id === "vnpay" && (
                              <div className="mt-2 text-xs text-gray-600">
                                ✓ Bảo mật SSL 256-bit • ✓ Hỗ trợ 24/7 • ✓ Hoàn tiền nhanh chóng
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {selectedPayment === method.id && <ChevronRight className="w-5 h-5 text-blue-500 mt-1" />}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cột phải - Đơn hàng */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Đơn hàng của bạn</h2>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border">
                    {orderItems.length} sản phẩm
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Danh sách sản phẩm */}
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.bien_the_id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg?height=64&width=64"}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover border"
                        />
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white text-xs rounded-full flex items-center justify-center font-medium">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                        <div className="flex gap-2 mt-1">
                          <span className="px-2 py-1 bg-white border border-gray-200 text-xs rounded">
                            Size: {item.size}
                          </span>
                          <span className="px-2 py-1 bg-white border border-gray-200 text-xs rounded">
                            {item.color}
                          </span>
                        </div>
                        <p className="font-semibold text-blue-600 mt-2">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="border-gray-200" />

                {/* Tóm tắt giá */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium text-green-600">Miễn phí</span>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-600">{formatPrice(total)}</span>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Điều khoản */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-sm leading-relaxed text-gray-700">
                    Tôi đồng ý với{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      điều khoản và điều kiện
                    </a>{" "}
                    của cửa hàng
                  </label>
                </div>

                {/* Nút đặt hàng */}
                <button
                  onClick={handleOrder}
                  disabled={!agreedToTerms || isLoading}
                  className="w-full h-12 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Đặt hàng ngay
                    </>
                  )}
                </button>

                {/* Thông tin bảo mật */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                  <Shield className="w-4 h-4" />
                  <span>Thanh toán được bảo mật bởi SSL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
