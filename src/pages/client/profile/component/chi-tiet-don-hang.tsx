"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useOrderDetailclient, useCancelOrder, useReturnOrder } from "../../../../hooks/useOrder"
import { ArrowLeft, X, CheckCircle, Clock, BadgeCheck, Truck } from "lucide-react"
import { toast } from "react-toastify"

export default function OrderTracking() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, isLoading } = useOrderDetailclient(id as string)
  const cancelOrderMutation = useCancelOrder()
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [orderStatus, setOrderStatus] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)
  const [showReturnModal, setShowReturnModal] = useState(false)
  const returnOrderMutation = useReturnOrder()

  const trackingSteps = [
    { id: "cho_xac_nhan", title: "Chờ xác nhận", icon: Clock, color: "from-amber-400 to-orange-500" },
    { id: "dang_chuan_bi", title: "Đang chuẩn bị", icon: BadgeCheck, color: "from-blue-400 to-blue-600" },
    { id: "dang_van_chuyen", title: "Đang vận chuyển", icon: Truck, color: "from-purple-400 to-purple-600" },
    { id: "da_giao", title: "Đã giao", icon: CheckCircle, color: "from-green-400 to-green-600" },
    { id: "yeu_cau_huy_hang", title: "Đang yêu cầu hủy hàng", icon: X, color: "from-red-400 to-red-600" },
    { id: "da_huy", title: "Đã huỷ", icon: X, color: "from-red-400 to-red-600" },
    { id: "tra_hang", title: "Trả hàng", icon: ArrowLeft, color: "from-gray-400 to-gray-600" },
    { id: "yeu_cau_tra_hang", title: "Đang yêu cầu hoàn hàng", icon: ArrowLeft, color: "from-purple-400 to-pink-600" },
  ]

  useEffect(() => {
    if (data?.trang_thai_don_hang) {
      setOrderStatus(data.trang_thai_don_hang)
    }
  }, [data])
console.log(data);

  const getCurrentStepIndex = () => trackingSteps.findIndex((s) => s.id === orderStatus)
  const isStepCompleted = (idx: number) => idx <= getCurrentStepIndex()
  const isStepActive = (idx: number) => idx === getCurrentStepIndex()

  const handleCancelOrder = async () => {
    try {
      await cancelOrderMutation.mutateAsync(id as string)
      setShowCancelModal(false)
      // Có thể thêm toast notification ở đây
      toast.success("Đơn hàng đã được hủy thành công!")
    } catch (error: unknown) {
      toast.error("Có lỗi xảy ra khi hủy đơn hàng!")
      
      // Hiển thị thông báo lỗi cụ thể
      let errorMessage = "Có lỗi xảy ra khi hủy đơn hàng!"
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { error?: string; message?: string } } }
        if (axiosError.response?.data?.error) {
          errorMessage = axiosError.response.data.error
        } else if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message
        }
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      
      alert(`Lỗi: ${errorMessage}`)
    }
  }

  const handleReturnOrder = async () => {
    try {
      await returnOrderMutation.mutateAsync(id as string)
      setShowReturnModal(false)
      toast.success("Yêu cầu trả hàng đã được gửi!")
    } catch (error: unknown) {
      let errorMessage = "Có lỗi xảy ra khi trả hàng!"
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { error?: string; message?: string } } }
        if (axiosError.response?.data?.error) {
          errorMessage = axiosError.response.data.error
        } else if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message
        }
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      alert(`Lỗi: ${errorMessage}`)
    }
  }

  // Kiểm tra xem có thể hủy đơn hàng không
  const canCancelOrder = orderStatus === "cho_xac_nhan" || orderStatus === "dang_chuan_bi"

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-lg text-gray-600">Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <X className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-lg text-gray-600">Không tìm thấy đơn hàng</p>
        </div>
      </div>
    )
  }

  const order = data
  // Sử dụng chi_tiet_san_pham thay vì items
  const firstItem = order.chi_tiet_san_pham?.[0]

  const formatPrice = (price: number | string) => Number(price).toLocaleString("vi-VN") + "đ"


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate("/chi-tiet-don-hang")}
            className="flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Quay lại danh sách đơn hàng
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Order Header Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  <h1 className="text-2xl font-bold text-white">Đơn hàng #{order.ma_don_hang}</h1>
                </div>
                <p className="text-teal-100">Đặt hàng lúc: {new Date(order.created_at).toLocaleString("vi-VN")}</p>
              </div>
              {canCancelOrder && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/30 focus:outline-none focus:ring-4 focus:ring-white/25 transition-all duration-200 border border-white/20"
                >
                  <X className="w-4 h-4 mr-2" />
                  Hủy đơn hàng
                </button>
              )}
              {orderStatus === "da_giao" && (
                <button
                  onClick={() => setShowReturnModal(true)}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium rounded-xl hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-pink-200 transition-all duration-200 border border-white/20 ml-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Trả hàng
                </button>
              )}
            </div>
          </div>

          {/* Tracking Steps */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-8 flex items-center">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
              Trạng thái đơn hàng
            </h2>

            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${
                      orderStatus === "da_huy" || orderStatus === "tra_hang"
                        ? 100
                        : (
                            getCurrentStepIndex() /
                              (trackingSteps.filter((s) => s.id !== "da_huy" && s.id !== "tra_hang").length - 1)
                          ) * 100
                    }%`,
                  }}
                />
              </div>

              {/* Steps */}
              <div className="flex justify-between relative z-10">
                {(
                  orderStatus === "yeu_cau_huy_hang" ||
                  orderStatus === "da_huy" ||
                  orderStatus === "tra_hang" ||
                  orderStatus === "yeu_cau_tra_hang"
                ) ? (
                  <div className="flex-1 flex flex-col items-center">
                    <div className={`w-20 h-20 flex items-center justify-center rounded-full border-4 ${
                      orderStatus === "tra_hang" || orderStatus === "yeu_cau_tra_hang"
                        ? "bg-gradient-to-r from-purple-400 to-pink-400"
                        : "bg-gradient-to-r from-red-400 to-red-600"
                    } text-white border-white shadow-2xl scale-110 animate-pulse mx-auto`}>
                      {(orderStatus === "yeu_cau_huy_hang" || orderStatus === "da_huy") && <X className="w-10 h-10 animate-bounce" />}
                      {(orderStatus === "tra_hang" || orderStatus === "yeu_cau_tra_hang") && <ArrowLeft className="w-10 h-10 animate-bounce" />}
                    </div>
                    <div className="mt-4 text-center">
                      <p className={`text-lg font-semibold scale-110 ${
                        orderStatus === "tra_hang" || orderStatus === "yeu_cau_tra_hang"
                          ? "text-purple-600"
                          : "text-red-600"
                      }`}>
                        {orderStatus === "yeu_cau_huy_hang" && "Đang yêu cầu hủy hàng"}
                        {orderStatus === "da_huy" && "Đã huỷ"}
                        {orderStatus === "tra_hang" && "Trả hàng"}
                        {orderStatus === "yeu_cau_tra_hang" && "Đang yêu cầu hoàn hàng"}
                      </p>
                      <div className={`mt-2 px-4 py-2 rounded-full inline-block ${
                        orderStatus === "tra_hang" || orderStatus === "yeu_cau_tra_hang"
                          ? "bg-gradient-to-r from-purple-100 to-pink-100"
                          : "bg-gradient-to-r from-red-100 to-pink-100"
                      }`}>
                        <span className={`text-base font-medium ${
                          orderStatus === "tra_hang" || orderStatus === "yeu_cau_tra_hang"
                            ? "text-purple-700"
                            : "text-red-700"
                        }`}>Hiện tại</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Render các bước bình thường như cũ
                  trackingSteps.map((step, index) => {
                    const Icon = step.icon
                    const completed = isStepCompleted(index)
                    const active = isStepActive(index)
                    const isSpecialStatus = step.id === "da_huy" || step.id === "tra_hang" || step.id === "yeu_cau_huy_hang"
                    if (isSpecialStatus && !active) return null
                    return (
                      <div key={step.id} className="flex flex-col items-center group">
                        <div
                          className={`w-16 h-16 flex items-center justify-center rounded-full border-4 transition-all duration-500 ${
                            active
                              ? `bg-gradient-to-r ${step.color} text-white border-white shadow-2xl scale-110 animate-pulse`
                              : completed
                                ? "bg-gradient-to-r from-teal-400 to-emerald-400 text-white border-teal-200 shadow-lg"
                                : "bg-white text-gray-400 border-gray-300 shadow-md"
                          } group-hover:scale-105`}
                        >
                          <Icon className={`w-7 h-7 transition-all duration-300 ${active ? "animate-bounce" : ""}`} />
                        </div>
                        <div className="mt-4 text-center">
                          <p
                            className={`text-sm font-semibold transition-all duration-300 ${
                              active ? "text-teal-600 scale-110" : completed ? "text-emerald-600" : "text-gray-400"
                            }`}
                          >
                            {step.title}
                          </p>
                          {active && (
                            <div className="mt-2 px-3 py-1 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full">
                              <span className="text-xs font-medium text-teal-700">Hiện tại</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product & Address Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <div className="w-2 h-2 bg-white/30 rounded-full mr-3"></div>
                  Thông tin giao hàng
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {order.ten_nguoi_dat || "Không xác định"}
                      </p>
                      {order.sdt_nguoi_dat && <p className="text-gray-600">{order.sdt_nguoi_dat}</p>}
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-medium text-gray-800">{order.email_nguoi_dat || "Không xác định"}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600">Địa chỉ giao hàng</p>
                      <p className="font-medium text-gray-800">{order.dia_chi}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600">Phương thức thanh toán</p>
                      <p className="font-medium text-gray-800">{order.phuong_thuc_thanh_toan}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <div className="w-2 h-2 bg-white/30 rounded-full mr-3"></div>
                  Chi tiết sản phẩm
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className="relative">
                    <img
                      src={imageError 
                        ? 'https://via.placeholder.com/96x96?text=No+Image'
                        : `http://localhost:8000/storage/${firstItem?.san_pham_id || 'default'}.jpg`
                      }
                      alt={firstItem?.ten_san_pham || 'Sản phẩm'}
                      className="w-24 h-24 rounded-xl object-cover shadow-lg ring-4 ring-white"
                      onError={() => setImageError(true)}
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{firstItem?.so_luong || 0}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">{firstItem?.ten_san_pham || "Không xác định"}</h4>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {(firstItem?.thuoc_tinh_bien_the || []).map((attr: { thuoc_tinh: string; gia_tri: string }, idx: number) =>
                        attr.gia_tri.startsWith("#") ? (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                            style={{ backgroundColor: attr.gia_tri }}
                            title={attr.thuoc_tinh}
                          />
                        ) : (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white border border-gray-300 text-sm rounded-full font-medium text-gray-700"
                          >
                            {attr.thuoc_tinh}: {attr.gia_tri}
                          </span>
                        ),
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Số lượng: {firstItem?.so_luong || 0}</span>
                      <span className="text-lg font-bold text-teal-600">{formatPrice(firstItem?.don_gia || 0)}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <div className="w-2 h-2 bg-white/30 rounded-full mr-3"></div>
                  Tóm tắt đơn hàng
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Tổng tiền hàng:</span>
                  <span className="font-semibold text-gray-800">
                    {formatPrice(order.tong_tien || 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-semibold text-green-600">Miễn phí</span>
                </div>
                <div className="flex justify-between items-center py-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl px-4 border border-teal-100">
                  <span className="font-semibold text-gray-800">Tổng thanh toán:</span>
                  <span className="text-xl font-bold text-teal-600">{formatPrice(order.tong_tien || 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Hủy đơn hàng</h3>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="text-white/80 hover:text-white transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-gray-600">Bạn có chắc chắn muốn hủy đơn hàng này?</p>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Không hủy
                </button>
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelOrderMutation.isPending}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-xl hover:from-red-600 hover:to-pink-600 focus:ring-4 focus:ring-red-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelOrderMutation.isPending ? "Đang hủy..." : "Xác nhận hủy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReturnModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-red-500 px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Trả hàng</h3>
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="text-white/80 hover:text-white transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-gray-600">Bạn có chắc chắn muốn gửi yêu cầu trả hàng cho đơn này?</p>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Không trả hàng
                </button>
                <button
                  onClick={handleReturnOrder}
                  disabled={returnOrderMutation.isPending}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium rounded-xl hover:from-pink-600 hover:to-red-600 focus:ring-4 focus:ring-pink-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {returnOrderMutation.isPending ? "Đang gửi..." : "Xác nhận trả hàng"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
