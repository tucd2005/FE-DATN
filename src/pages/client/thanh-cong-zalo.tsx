"use client"

import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { CheckCircle, XCircle, Copy, Package, User, MapPin, Calendar, CreditCard, Home } from "lucide-react"
import instanceAxios from "../../utils/axios"

interface OrderDetail {
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

interface Order {
  id: number
  ma_don_hang: string
  email_nguoi_dat: string
  dia_chi: string
  thanh_pho: string
  huyen: string
  xa: string
  trang_thai_don_hang: string
  trang_thai_thanh_toan: string
  so_tien_thanh_toan: number
  so_tien_duoc_giam: string
  ten_nguoi_dat: string
  sdt_nguoi_dat: string
  ten_san_pham: string
  gia_tri_bien_the: string
  created_at: string
  updated_at: string
  order_detail: OrderDetail[]
  user: {
    id: number
    name: string
    email: string
  }
}

interface PaymentData {
  code: string
  message: string
  order: Order | null
}

export default function PaymentResultZaloPage() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<PaymentData | null>(null)
  const [copied, setCopied] = useState(false)
  const didFetch = useRef(false)

  useEffect(() => {
    if (didFetch.current) return
    didFetch.current = true
    console.log("Query Params:", location.search)

    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const appTransId = params.get("ma_don_hang"); // FE nhận từ redirect là ma_don_hang
        const status = params.get("status");

        if (!appTransId) {
          setData({ code: "01", message: "Thiếu mã đơn hàng", order: null })
          setLoading(false)
          return
        }

        // 🔥 FIX: truyền app_trans_id thay vì ma_don_hang
        const query = `?app_trans_id=${appTransId}${status ? `&status=${status}` : ""}`;
        const res = await instanceAxios.get(`/payment/zalopay/callback${query}`);
        setData(res.data)
      } catch (error) {
        console.error("Lỗi khi gọi API ZaloPay callback:", error);
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [location.search])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full mx-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Đang xử lý thanh toán</h2>
          <p className="text-gray-600">Vui lòng chờ trong giây lát...</p>
        </div>
      </div>
    )
  }

  if (
    !data ||
    data.code !== "00" ||
    !data.order ||
    data.order.trang_thai_thanh_toan !== "da_thanh_toan"
  ) {
    // Kiểm tra nếu là hủy thanh toán
    const isUserCancel =
      data?.code === "24" ||
      (data?.message && data.message.toLowerCase().includes("hủy")) ||
      data?.order?.trang_thai_thanh_toan !== "da_thanh_toan";
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
          <div className="mb-6">
            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4 animate-pulse" />
            <h1 className="text-2xl font-bold text-red-600 mb-3">
              {isUserCancel ? "Bạn đã hủy thanh toán" : "Thanh toán thất bại!"}
            </h1>
            <div className="bg-red-50 rounded-lg p-4 mb-6">
              <p className="text-red-700 font-medium">
                {isUserCancel ? "Giao dịch đã bị hủy theo yêu cầu của bạn." : (data?.message || "Không xác định")}
              </p>
            
            </div>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            Về trang chủ
          </a>
        </div>
      </div>
    )
  }

  const order = data.order
  const orderDetails = order?.order_detail || []
  const isCancelled = order.trang_thai_don_hang === "da_huy"

  const formatCurrency = (amount: number) => new Intl.NumberFormat("vi-VN").format(amount)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })

  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      da_thanh_toan: "Đã thanh toán",
      dang_chuan_bi: "Đang chuẩn bị",
      dang_giao: "Đang giao",
      da_giao: "Đã giao",
      da_huy: "Đã hủy",
    }
    return map[status] || status
  }

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      da_thanh_toan: "bg-green-100 text-green-800",
      dang_chuan_bi: "bg-yellow-100 text-yellow-800",
      dang_giao: "bg-blue-100 text-blue-800",
      da_giao: "bg-green-100 text-green-800",
      da_huy: "bg-red-100 text-red-800",
    }
    return colorMap[status] || "bg-gray-100 text-gray-800"
  }

  const parseProductAttributes = (str: string): string => {
    if (!str) return "";
    try {
      const attrs: Array<{ thuoc_tinh: string; gia_tri: string }> = JSON.parse(str);
      if (!Array.isArray(attrs)) return "";
      return attrs.map((a) => `${a.thuoc_tinh}: ${a.gia_tri}`).join(", ");
    } catch {
      return "";
    }
  };

  const copyOrderCode = () => {
    if (order?.ma_don_hang) {
      navigator.clipboard.writeText(order.ma_don_hang)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const fullAddress = [order.dia_chi, order.xa, order.huyen, order.thanh_pho].filter(Boolean).join(", ");

  function getImageUrl(hinh_anh: string | string[] | undefined): string {
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
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${isCancelled ? "from-red-50 via-pink-50 to-rose-50" : "from-green-50 via-emerald-50 to-teal-50"} py-8 px-4`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Success */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div
            className={`text-center py-12 px-6 ${isCancelled ? "bg-gradient-to-r from-red-500 to-pink-500" : "bg-gradient-to-r from-green-500 to-emerald-500"}`}
          >
            {isCancelled ? (
              <XCircle className="w-20 h-20 text-white mx-auto mb-4 animate-pulse" />
            ) : (
              <CheckCircle className="w-20 h-20 text-white mx-auto mb-4 animate-bounce" />
            )}
            <h1 className="text-3xl font-bold text-white mb-3">
              {isCancelled ? "Đơn hàng đã hủy" : "Thanh toán thành công!"}
            </h1>
            <p className="text-white/90 text-lg">
              {isCancelled ? "Đơn hàng của bạn đã bị hủy." : "Cảm ơn bạn đã sử dụng dịch vụ thanh toán zalopay của chúng tôi!"}
            </p>
          </div>

          {/* Payment Amount */}
          {!isCancelled && (
            <div className="p-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 text-center border border-green-200">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <CreditCard className="w-6 h-6 text-green-600" />
                  <p className="text-gray-700 text-lg font-medium">Số tiền đã thanh toán</p>
                </div>
                <p className="text-4xl font-bold text-green-600 mb-2">{formatCurrency(order.so_tien_thanh_toan)} VNĐ</p>
                {Number.parseFloat(order.so_tien_duoc_giam) > 0 && (
                  <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    <span>Đã tiết kiệm: {formatCurrency(Number.parseFloat(order.so_tien_duoc_giam))} VNĐ</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-800">Chi tiết sản phẩm</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {orderDetails.map((item) => {
              // Lấy hình ảnh từ variant hoặc product
              const variantImage = getImageUrl(item.variant?.hinh_anh);
              const productImage = getImageUrl(item.product?.hinh_anh);
              const imgSrc = variantImage !== "/placeholder.svg" ? variantImage : productImage;
              
              // Lấy tên sản phẩm từ product hoặc order
              const productName = item.product?.ten || order.ten_san_pham || "Sản phẩm không xác định";

              return (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={imgSrc}
                      alt={productName}
                      className="w-20 h-20 object-cover rounded-lg border-2 border-gray-100"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.endsWith('/placeholder.svg')) {
                          target.src = '/placeholder.svg';
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold text-gray-800 text-lg">{productName}</h4>
                    {parseProductAttributes(item.thuoc_tinh_bien_the) && (
                      <div className="flex flex-wrap gap-2">
                        {JSON.parse(item.thuoc_tinh_bien_the).map((attr: { thuoc_tinh: string; gia_tri: string }, idx: number) => {
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
                    )}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                        Số lượng: {item.so_luong}
                      </span>
                      <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium">
                        Đơn giá: {formatCurrency(Number.parseFloat(item.don_gia))} VNĐ
                      </span>
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                        Thành tiền: {formatCurrency(Number.parseFloat(item.tong_tien))} VNĐ
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Information */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Thông tin đơn hàng</h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Order Code */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-600 mb-1">Mã đơn hàng</p>
                <p className="font-mono text-lg font-semibold text-gray-800">{order.ma_don_hang}</p>
              </div>
              <button
                onClick={copyOrderCode}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Đã sao chép!" : "Sao chép"}
              </button>
            </div>

            {/* Status */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Trạng thái đơn hàng</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.trang_thai_don_hang)}`}
                >
                  {getStatusText(order.trang_thai_don_hang)}
                </span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Trạng thái thanh toán</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.trang_thai_thanh_toan)}`}
                >
                  {getStatusText(order.trang_thai_thanh_toan)}
                </span>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Calendar className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Ngày đặt hàng</p>
                <p className="font-medium text-gray-800">{formatDate(order.created_at)}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <User className="w-5 h-5 text-gray-600 mt-1" />
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Thông tin khách hàng</p>
                <p className="font-medium text-gray-800">{order.ten_nguoi_dat || order.user?.name || "Không xác định"}</p>
                <p className="text-gray-700">{order.email_nguoi_dat || order.user?.email || ""}</p>
                {order.sdt_nguoi_dat && <p className="text-gray-700">{order.sdt_nguoi_dat}</p>}
              </div>
            </div>
            
            {/* Address */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <MapPin className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <p className="text-sm text-gray-600 mb-1">Địa chỉ giao hàng</p>
                <p className="text-gray-800 leading-relaxed">{fullAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <Home className="w-5 h-5" />
            Về trang chủ
          </a>
        </div>
      </div>
    </div>
  )
}
