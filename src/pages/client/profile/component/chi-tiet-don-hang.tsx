"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useOrderDetailclient, useReturnOrder } from "../../../../hooks/useOrder"
import { useCancelOrder } from "../../../../hooks/useOrder"
import { ArrowLeft, X, CheckCircle, Clock, BadgeCheck, Truck } from "lucide-react"
import { useMarkOrderAsDelivered } from "../../../../hooks/useOrder"

// Cập nhật interface để phù hợp với cấu trúc dữ liệu thực tế
interface OrderItem {
  id: number
  san_pham_id: number
  bien_the_id: number
  so_luong: number
  don_gia: string
  tong_tien: string
  so_tien_duoc_giam: string
  thuoc_tinh_bien_the: string
  created_at: string
  updated_at: string
  product: {
    id: number
    ten: string
    hinh_anh: string
    mo_ta: string
    so_luong: number
    so_luong_da_ban: number
    created_at: string
    updated_at: string
  }
  variant: {
    id: number
    san_pham_id: number
    so_luong: number
    hinh_anh: string
    so_luong_da_ban: number
    gia: string
    gia_khuyen_mai: string
    created_at: string
    updated_at: string
  }
}

export default function OrderTracking() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, isLoading } = useOrderDetailclient(id as string)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelReason, setCancelReason] = useState(""); // Lý do hủy
  const [returnReason, setReturnReason] = useState(""); // Lý do trả hàng
  const [showReturnModal, setShowReturnModal] = useState(false); // Modal trả hàng
  const [customCancelReason, setCustomCancelReason] = useState("");
  const [customReturnReason, setCustomReturnReason] = useState("");
  const [orderStatus, setOrderStatus] = useState<string | null>(null)
  const { mutate: returnOrder, isPending: isReturning } = useReturnOrder()
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder()
  const { mutate: markAsDelivered, isPending } = useMarkOrderAsDelivered();
  const [isRequestingCancel, setIsRequestingCancel] = useState(false);

  const trackingSteps = [
    { id: "cho_xac_nhan", title: "Chờ xác nhận", icon: Clock, color: "from-amber-400 to-orange-500" },
    { id: "dang_chuan_bi", title: "Đang chuẩn bị", icon: BadgeCheck, color: "from-blue-400 to-blue-600" },
    { id: "dang_van_chuyen", title: "Đang vận chuyển", icon: Truck, color: "from-purple-400 to-purple-600" },
    { id: "da_giao", title: "Đã giao", icon: CheckCircle, color: "from-green-400 to-green-600" },
    { id: "yeu_cau_huy_hang", title: "Yêu cầu hủy", icon: X, color: "from-red-400 to-red-600" },
    { id: "yeu_cau_tra_hang", title: "Yêu cầu trả hàng", icon: ArrowLeft, color: "from-gray-400 to-gray-600" },
    { id: "da_huy", title: "Đã huỷ", icon: X, color: "from-red-400 to-red-600" },
    { id: "tra_hang", title: "Trả hàng", icon: ArrowLeft, color: "from-gray-400 to-gray-600" },
  ]

  useEffect(() => {
    if (data?.order?.trang_thai_don_hang) {
      setOrderStatus(data.order.trang_thai_don_hang)
    }
  }, [data])

  const getCurrentStepIndex = () => trackingSteps.findIndex((s) => s.id === orderStatus)
  const isStepCompleted = (idx: number) => idx <= getCurrentStepIndex()
  const isStepActive = (idx: number) => idx === getCurrentStepIndex()

  const cancelReasons = [
    "Tôi đặt nhầm đơn hàng",
    "Tôi muốn thay đổi sản phẩm",
    "Tôi tìm thấy giá tốt hơn ở nơi khác",
    "Thời gian giao hàng quá lâu",
    "Khác"
  ];
  const returnReasons = [
    "Sản phẩm bị lỗi/hỏng",
    "Sản phẩm không đúng mô tả",
    "Tôi không còn nhu cầu sử dụng",
    "Khác"
  ];

  const handleCancelOrder = () => {
    if (!order?.id) return;
    if (!cancelReason || (cancelReason === "Khác" && !customCancelReason)) return;
    setIsRequestingCancel(true);
    cancelOrder({
      id: order.id,
      ly_do_huy: cancelReason === "Khác" ? customCancelReason : cancelReason
    }, {
      onSuccess: () => {
        setIsRequestingCancel(false);
        setOrderStatus("da_huy");
        setShowCancelModal(false);
        setCancelReason("");
        setCustomCancelReason("");
      },
      onError: () => {
        setIsRequestingCancel(false);
      }
    });
  }

  const handleReturnOrder = () => {
    if (!order?.id) return;
    setShowReturnModal(true);
  }

  const confirmReturnOrder = () => {
    if (!returnReason || (returnReason === "Khác" && !customReturnReason)) return;
    returnOrder({
      id: order.id,
      ly_do_tra_hang: returnReason === "Khác" ? customReturnReason : returnReason
    }, {
      onSuccess: () => {
        setShowReturnModal(false);
        setReturnReason("");
        setCustomReturnReason("");
      }
    });
  }

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

  if (!data?.order) {
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

  const order = data.order
  const formatPrice = (price: number | string) => Number(price).toLocaleString("vi-VN") + "đ"
  console.log("Order data:", order);

  // Hàm lấy URL hình ảnh
  const getImageUrl = (hinh_anh: string | string[] | undefined): string => {
    if (!hinh_anh) return "/placeholder.svg";

    // Nếu là array
    if (Array.isArray(hinh_anh)) {
      if (hinh_anh.length > 0) {
        return `http://127.0.0.1:8000/storage/${hinh_anh[0]}`;
      }
      return "/placeholder.svg";
    }

    // Nếu là string
    if (typeof hinh_anh === 'string') {
      try {
        // Nếu là mảng JSON thì parse
        const parsed = JSON.parse(hinh_anh);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return `http://127.0.0.1:8000/storage/${parsed[0]}`;
        }
      } catch {
        // Nếu không phải JSON hoặc lỗi khi parse, tiếp tục kiểm tra định dạng string
        if (hinh_anh.startsWith("http")) {
          return hinh_anh;
        }
        return `http://127.0.0.1:8000/storage/${hinh_anh}`;
      }
    }

    return "/placeholder.svg";
  };

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
              {(orderStatus === "cho_xac_nhan" || orderStatus === "dang_chuan_bi") && !isRequestingCancel && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/30 focus:outline-none focus:ring-4 focus:ring-white/25 transition-all duration-200 border border-white/20"
                >
                  <X className="w-4 h-4 mr-2" />
                  Hủy đơn hàng
                </button>
              )}
              {orderStatus === "dang_van_chuyen" && (
                <button
                  onClick={() => markAsDelivered(order.id)}
                  disabled={isPending}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-medium rounded-xl hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-200 border border-white/20 ml-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isPending ? "Đang xác nhận..." : "Xác nhận đã nhận hàng"}
                </button>
              )}
              {orderStatus === "da_giao" && (
                <button
                  onClick={handleReturnOrder}
                  disabled={isReturning}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200 border border-white/20 ml-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {isReturning ? "Đang xử lý..." : "Trả hàng"}
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
              {["yeu_cau_huy_hang", "da_huy"].includes(orderStatus || "") ? (
                <div className="flex justify-center items-center relative z-10">
                  {/* Yêu cầu hủy hàng */}
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full border-4
                      ${orderStatus === "yeu_cau_huy_hang" ? "bg-gradient-to-r from-red-400 to-red-600 text-white border-white shadow-2xl scale-110 animate-pulse" : "bg-white text-gray-400 border-gray-300 shadow-md"}
                    `}>
                      {/* icon hủy */}
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="mt-4 text-center">
                      <p className={`text-sm font-semibold ${orderStatus === "yeu_cau_huy_hang" ? "text-red-600 scale-110" : "text-gray-400"}`}>Yêu cầu hủy hàng</p>
                      {orderStatus === "yeu_cau_huy_hang" && (
                        <div className="mt-2 px-3 py-1 bg-gradient-to-r from-red-100 to-red-200 rounded-full">
                          <span className="text-xs font-medium text-red-700">Hiện tại</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Thanh kết nối đỏ */}
                  <div className="h-1 w-24 bg-red-500 rounded-full -ml-2 -mr-2" />

                  {/* Đã hủy */}
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full border-4
                      ${orderStatus === "da_huy" ? "bg-gradient-to-r from-red-400 to-red-600 text-white border-white shadow-2xl scale-110 animate-pulse" : "bg-white text-gray-400 border-gray-300 shadow-md"}
                    `}>
                      {/* icon hủy */}
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="mt-4 text-center">
                      <p className={`text-sm font-semibold ${orderStatus === "da_huy" ? "text-red-600 scale-110" : "text-gray-400"}`}>Đã hủy</p>
                      {orderStatus === "da_huy" && (
                        <div className="mt-2 px-3 py-1 bg-gradient-to-r from-red-100 to-red-200 rounded-full">
                          <span className="text-xs font-medium text-red-700">Hiện tại</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : ["yeu_cau_tra_hang", "cho_xac_nhan_tra_hang", "tra_hang_thanh_cong"].includes(orderStatus || "") ? (
                // --- Timeline trả hàng ---
                <div className="flex justify-center items-center relative z-10">
                  {/* Yêu cầu trả hàng */}
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full border-4
                      ${orderStatus === "yeu_cau_tra_hang" ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-white shadow-2xl scale-110 animate-pulse" : "bg-white text-gray-400 border-gray-300 shadow-md"}
                    `}>
                      {/* icon trả hàng */}
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 7v4H5V7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 11V5a2 2 0 012-2h6a2 2 0 012 2v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 17h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 21h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="mt-4 text-center">
                      <p className={`text-sm font-semibold ${orderStatus === "yeu_cau_tra_hang" ? "text-yellow-700 scale-110" : "text-gray-400"}`}>Yêu cầu trả hàng</p>
                      {orderStatus === "yeu_cau_tra_hang" && (
                        <div className="mt-2 px-3 py-1 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-full">
                          <span className="text-xs font-medium text-yellow-700">Hiện tại</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Thanh kết nối */}
                  <div className="h-1 w-24 bg-yellow-400 rounded-full -ml-2 -mr-2" />

                  {/* Chờ xác nhận trả hàng */}
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full border-4
                      ${orderStatus === "cho_xac_nhan_tra_hang" ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white border-white shadow-2xl scale-110 animate-pulse" : "bg-white text-gray-400 border-gray-300 shadow-md"}
                    `}>
                      {/* icon chờ xác nhận */}
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 7v4H5V7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 11V5a2 2 0 012-2h6a2 2 0 012 2v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 17h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 21h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="mt-4 text-center">
                      <p className={`text-sm font-semibold ${orderStatus === "cho_xac_nhan_tra_hang" ? "text-blue-700 scale-110" : "text-gray-400"}`}>đã xác nhận trả hàng</p>
                      {orderStatus === "cho_xac_nhan_tra_hang" && (
                        <div className="mt-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full">
                          <span className="text-xs font-medium text-blue-700">Hiện tại</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Thanh kết nối */}
                  <div className="h-1 w-24 bg-green-400 rounded-full -ml-2 -mr-2" />

                  {/* Trả hàng thành công */}
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full border-4
                      ${orderStatus === "tra_hang_thanh_cong" ? "bg-gradient-to-r from-green-400 to-green-600 text-white border-white shadow-2xl scale-110 animate-pulse" : "bg-white text-gray-400 border-gray-300 shadow-md"}
                    `}>
                      {/* icon thành công */}
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="mt-4 text-center">
                      <p className={`text-sm font-semibold ${orderStatus === "tra_hang_thanh_cong" ? "text-green-700 scale-110" : "text-gray-400"}`}>Trả hàng thành công</p>
                      {orderStatus === "tra_hang_thanh_cong" && (
                        <div className="mt-2 px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 rounded-full">
                          <span className="text-xs font-medium text-green-700">Hiện tại</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // --- Timeline mặc định ---
                <>
                  <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${orderStatus === "tra_hang"
                            ? 100
                            : (
                              getCurrentStepIndex() /
                              (trackingSteps.filter((s) => s.id !== "da_huy" && s.id !== "tra_hang").length - 1)
                            ) * 100
                          }%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between relative z-10">
                    {trackingSteps.map((step, index) => {
                      const Icon = step.icon
                      const completed = isStepCompleted(index)
                      const active = isStepActive(index)
                      const isSpecialStatus = step.id === "da_huy" || step.id === "tra_hang"
                      if (isSpecialStatus && !active) return null
                      return (
                        <div key={step.id} className="flex flex-col items-center group">
                          <div
                            className={`w-16 h-16 flex items-center justify-center rounded-full border-4 transition-all duration-500 ${active
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
                              className={`text-sm font-semibold transition-all duration-300 ${active ? "text-teal-600 scale-110" : completed ? "text-emerald-600" : "text-gray-400"
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
                    })}
                  </div>
                </>
              )}
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7  7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{order.ten_nguoi_dat || order.user?.ten || order.user?.name}</p>
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
                      <p className="font-medium text-gray-800">{order.email_nguoi_dat}</p>
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
                      <p className="font-medium text-gray-800">
                        {[order.dia_chi, order.xa || order.phuong_xa, order.huyen, order.thanh_pho]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
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
                      <p className="font-medium text-gray-800">
                        {order.phuong_thuc_thanh_toan?.ten || "Không xác định"}
                      </p>
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
                {order.items.map((item: OrderItem, idx: number) => {
                  // Lấy hình ảnh từ variant hoặc product
                  const variantImage = getImageUrl(item.variant?.hinh_anh);
                  const productImage = getImageUrl(item.product?.hinh_anh);
                  const imgSrc = variantImage !== "/placeholder.svg" ? variantImage : productImage;
                  
                  // Lấy tên sản phẩm từ product hoặc order
                  const productName = item.product?.ten || order.ten_san_pham || "Sản phẩm không xác định";

                  // Parse thuộc tính biến thể
                  let attributes: { thuoc_tinh: string; gia_tri: string }[] = [];
                  if (typeof item.thuoc_tinh_bien_the === "string") {
                    try {
                      attributes = JSON.parse(item.thuoc_tinh_bien_the);
                    } catch {
                      // Không parse được, bỏ qua
                    }
                  }

                  return (
                    <div key={idx} className="flex items-center gap-6 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 mb-4">
                      <div className="relative">
                        <img
                          src={imgSrc}
                          alt={productName}
                          className="w-24 h-24 rounded-xl object-cover shadow-lg ring-4 ring-white"
                          onError={e => {
                            const target = e.target as HTMLImageElement;
                            if (!target.src.endsWith('/placeholder.svg')) {
                              target.src = '/placeholder.svg';
                            }
                          }}
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{item.so_luong}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-lg mb-2">{productName}</h4>
                        <div className="flex gap-2 mb-3 flex-wrap">
                          {attributes.map((attr, idx) => {
                            const isColor = typeof attr.gia_tri === "string" && attr.gia_tri.startsWith("#") && (attr.gia_tri.length === 7 || attr.gia_tri.length === 4);
                            return (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-white border border-gray-300 text-sm rounded-full font-medium text-gray-700 flex items-center gap-2"
                              >
                                {attr.thuoc_tinh}:
                                {isColor ? (
                                  <span
                                    className="inline-block w-5 h-5 rounded-full border border-gray-300 ml-1"
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
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Số lượng: {item.so_luong}</span>
                          <span className="text-lg font-bold text-teal-600">{formatPrice(item.don_gia)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                    {formatPrice(order.so_tien_thanh_toan)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-semibold text-green-600">Miễn phí</span>
                </div>
                <div className="flex justify-between items-center py-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl px-4 border border-teal-100">
                  <span className="font-semibold text-gray-800">Tổng thanh toán:</span>
                  <span className="text-xl font-bold text-teal-600">{formatPrice(order.so_tien_thanh_toan)}</span>
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
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Chọn lý do hủy đơn hàng <span className="text-red-500">*</span></label>
                <select
                  className="w-full border rounded-lg px-3 py-2 mb-2"
                  value={cancelReason}
                  onChange={e => setCancelReason(e.target.value)}
                >
                  <option value="">-- Chọn lý do --</option>
                  {cancelReasons.map((reason, idx) => (
                    <option key={idx} value={reason}>{reason}</option>
                  ))}
                </select>
                {cancelReason === "Khác" && (
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 mt-2"
                    placeholder="Nhập lý do khác..."
                    value={customCancelReason}
                    onChange={e => setCustomCancelReason(e.target.value)}
                  />
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Không hủy
                </button>
                <button
                  onClick={handleCancelOrder}
                  disabled={isCancelling || isRequestingCancel || !cancelReason || (cancelReason === "Khác" && !customCancelReason)}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-xl hover:from-red-600 hover:to-pink-600 focus:ring-4 focus:ring-red-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCancelling || isRequestingCancel ? "Đang xử lý..." : "Xác nhận hủy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Return Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4">
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
              <p className="text-gray-600">Vui lòng chọn lý do trả hàng:</p>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Chọn lý do trả hàng <span className="text-red-500">*</span></label>
                <select
                  className="w-full border rounded-lg px-3 py-2 mb-2"
                  value={returnReason}
                  onChange={e => setReturnReason(e.target.value)}
                >
                  <option value="">-- Chọn lý do --</option>
                  {returnReasons.map((reason, idx) => (
                    <option key={idx} value={reason}>{reason}</option>
                  ))}
                </select>
                {returnReason === "Khác" && (
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 mt-2"
                    placeholder="Nhập lý do khác..."
                    value={customReturnReason}
                    onChange={e => setCustomReturnReason(e.target.value)}
                  />
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Không trả hàng
                </button>
                <button
                  onClick={confirmReturnOrder}
                  disabled={!returnReason || (returnReason === "Khác" && !customReturnReason) || isReturning}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-xl hover:from-yellow-600 hover:to-orange-600 focus:ring-4 focus:ring-yellow-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isReturning && (
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  )}
                  {isReturning ? "Đang xử lý..." : "Xác nhận trả hàng"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isRequestingCancel && orderStatus !== "da_huy" && (
        <div className="flex justify-center my-6">
          <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-semibold">
            Đang yêu cầu hủy hàng...
          </div>
        </div>
      )}
      {orderStatus === "da_huy" && (
        <div className="flex justify-center my-6">
          <div className="px-4 py-2 bg-red-100 text-red-800 rounded-lg font-semibold">
            Đã hủy hàng
          </div>
        </div>
      )}
      {orderStatus === "yeu_cau_tra_hang" && (
        <div className="flex flex-col items-center justify-center my-12">
          <div className="flex items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-white shadow-2xl scale-110 animate-pulse">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 7v4H5V7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V5a2 2 0 012-2h6a2 2 0 012 2v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 17h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 21h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-yellow-700 mb-2">Đã gửi yêu cầu trả hàng</p>
            <p className="text-gray-600">Chờ xác nhận từ người bán</p>
          </div>
        </div>
      )}

      {orderStatus === "cho_xac_nhan_tra_hang" && (
        <div className="flex flex-col items-center justify-center my-12">
          <div className="flex items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white border-white shadow-2xl scale-110 animate-pulse">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 7v4H5V7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V5a2 2 0 012-2h6a2 2 0 012 2v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 17h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 21h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-blue-700 mb-2">Yêu cầu trả hàng đang chờ xác nhận...</p>
          </div>
        </div>
      )}

      {orderStatus === "tra_hang_thanh_cong" && (
        <div className="flex flex-col items-center justify-center my-12">
          <div className="flex items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 bg-gradient-to-r from-green-400 to-green-600 text-white border-white shadow-2xl scale-110 animate-pulse">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-green-700 mb-2">Trả hàng thành công!</p>
          </div>
        </div>
      )}
    </div>
  )
}
