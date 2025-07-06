import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import instanceAxios from "../../utils/axios"

interface OrderDetail {
  id: number
  so_luong: number
  don_gia: string
  tong_tien: string
  thuoc_tinh_bien_the: string
  product: {
    id: number
    ten: string
    hinh_anh: string
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
  order: Order
}

export default function VNPaySuccessPage() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<PaymentData | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = location.search
        const res = await instanceAxios.get(`/payment/vnpay/return${query}`)
        setData(res.data)
      } catch (error) {
        console.error(error)
        setData(null)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [location.search])

  if (loading) {
    return <div className="text-center mt-10">Đang xử lý kết quả thanh toán...</div>
  }

  if (!data || data.code !== "00") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Thanh toán thất bại!</h1>
          <p className="text-gray-700">Lý do: <strong>{data?.message || "Không xác định"}</strong></p>
          <a href="/" className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Về trang chủ</a>
        </div>
      </div>
    )
  }

  // Util
  const formatCurrency = (amount: number) => new Intl.NumberFormat("vi-VN").format(amount)
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    })
  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      da_thanh_toan: "Đã thanh toán",
      dang_chuan_bi: "Đang chuẩn bị",
      dang_giao: "Đang giao",
      da_giao: "Đã giao",
      da_huy: "Đã hủy"
    }
    return map[status] || status
  }
  const parseProductAttributes = (str: string) => {
    try {
      const attrs = JSON.parse(str)
      return attrs.map((a: any) => ${a.thuoc_tinh}: ${a.gia_tri}).join(", ")
    } catch { return "" }
  }
  const copyOrderCode = () => {
    navigator.clipboard.writeText(data.order.ma_don_hang)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const fullAddress = ${data.order.dia_chi}, ${data.order.xa}, ${data.order.huyen}, ${data.order.thanh_pho}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="text-center py-8 px-6 bg-white">
          <div className="flex justify-center mb-6">
            <div className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold text-2xl tracking-wide">VNPAY</div>
          </div>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-3">{data.message}</h1>
          <p className="text-gray-600 text-lg">Cảm ơn bạn đã sử dụng dịch vụ thanh toán VNPay</p>
        </div>

        {/* Nội dung giữ nguyên giao diện */}
        <div className="px-6 pb-8 space-y-8">
          <div className="text-center bg-green-50 p-8 rounded-xl border-2 border-green-100">
            <p className="text-gray-600 mb-2 text-lg">Số tiền đã thanh toán</p>
            <p className="text-4xl font-bold text-green-600">{formatCurrency(data.order.so_tien_thanh_toan)} VNĐ</p>
            {Number.parseFloat(data.order.so_tien_duoc_giam) > 0 && (
              <p className="text-sm text-green-600 mt-2">Đã giảm: {formatCurrency(Number.parseFloat(data.order.so_tien_duoc_giam))} VNĐ</p>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Information */}
            <div className="space-y-6">
              <h3 className="font-bold text-xl text-gray-800 border-b-2 border-gray-100 pb-2">Thông tin đơn hàng</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Mã đơn hàng:</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">{data.order.ma_don_hang}</span>
                    <button
                      onClick={copyOrderCode}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Sao chép mã đơn hàng"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                    {copied && <span className="text-sm text-green-600 font-medium">Đã sao chép!</span>}
                  </div>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Trạng thái thanh toán:</span>
                  <span className="font-semibold text-green-600">
                    {getStatusText(data.order.trang_thai_thanh_toan)}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Trạng thái đơn hàng:</span>
                  <span className="font-semibold text-blue-600">{getStatusText(data.order.trang_thai_don_hang)}</span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Thời gian đặt hàng:</span>
                  <span className="font-semibold text-gray-800">{formatDate(data.order.created_at)}</span>
                </div>

                <div className="flex justify-between py-3">
                  <span className="text-gray-600 font-medium">Mã phản hồi:</span>
                  <span className="font-semibold text-green-600">{data.code} - Thành công</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-6">
              <h3 className="font-bold text-xl text-gray-800 border-b-2 border-gray-100 pb-2">Thông tin khách hàng</h3>

              <div className="space-y-4">
                <div className="py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium block mb-1">Tên khách hàng:</span>
                  <span className="font-semibold text-gray-800">{data.order.user.name}</span>
                </div>

                <div className="py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium block mb-1">Email:</span>
                  <span className="font-semibold text-gray-800">{data.order.email_nguoi_dat}</span>
                </div>

                <div className="py-3">
                  <span className="text-gray-600 font-medium block mb-1">Địa chỉ giao hàng:</span>
                  <span className="font-semibold text-gray-800">{fullAddress}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl text-gray-800 border-b-2 border-gray-100 pb-2">Chi tiết sản phẩm</h3>

            <div className="space-y-4">
              {data.order.order_detail.map((item, index) => (
                <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start gap-4">
                    <img
                      src={item.product.hinh_anh || "/placeholder.svg"}
                      alt={item.product.ten}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{item.product.ten}</h4>
                      {parseProductAttributes(item.thuoc_tinh_bien_the) && (
                        <p className="text-sm text-gray-600 mb-2">{parseProductAttributes(item.thuoc_tinh_bien_the)}</p>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Số lượng: {item.so_luong}</span>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {formatCurrency(Number.parseFloat(item.don_gia))} VNĐ x {item.so_luong}
                          </p>
                          <p className="font-semibold text-gray-800">
                            {formatCurrency(Number.parseFloat(item.tong_tien))} VNĐ
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-400">
            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div>
                <p className="text-blue-800 font-semibold mb-1">Lưu ý bảo mật:</p>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Vui lòng lưu lại mã đơn hàng để tra cứu khi cần thiết. VNPay không bao giờ yêu cầu bạn cung cấp thông
                  tin thẻ qua email hoặc điện thoại.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Về trang chủ
            </button>

            <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-lg border-2 border-gray-200 transition-colors duration-200 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              In hóa đơn
            </button>

            <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-lg border-2 border-gray-200 transition-colors duration-200 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Tải biên lai
            </button>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t-2 border-gray-100">
            <p className="text-sm text-gray-600 mb-2">
              Được cung cấp bởi <span className="font-bold text-red-600">VNPay</span> - Giải pháp thanh toán hàng đầu
              Việt Nam
            </p>
            <p className="text-sm text-gray-500">
              Hotline: <span className="font-semibold">1900 55 55 77</span> | Email:{" "}
              <span className="font-semibold">support@vnpay.vn</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}