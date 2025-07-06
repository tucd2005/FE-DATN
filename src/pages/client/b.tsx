"use client"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"

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

interface PaymentResult {
  code: string
  message: string
  order?: Order | null
  transaction_id?: string
  transaction_time?: string
}

export default function AAAAAA() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<PaymentResult>({
    code: "",
    message: "",
    order: null,
  })

  useEffect(() => {
    const fetchResult = async () => {
      try {
        // Lấy query vnp_* từ URL
        const query = location.search
        const res = await axios.get(`/api/payment/vnpay/return${query}`)
        setResult(res.data)
      } catch (error: any) {
        setResult({
          code: "99",
          message: "Đã xảy ra lỗi khi xử lý kết quả",
          order: null,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchResult()
  }, [location.search])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const getCurrentTime = () => {
    return new Date().toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang xử lý kết quả thanh toán...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 overflow-hidden">
        {/* Header với logo VNPay */}
        <div className="bg-white px-8 py-6 border-b border-gray-200">
          <div className="flex justify-center">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-l font-bold text-sm">CÔNG TY THANH TOÁN</div>
              <div className="bg-red-600 text-white px-3 py-1 rounded-r font-bold text-sm">VNPAY</div>
            </div>
          </div>
        </div>

        {result.code === "00" ? (
          // Giao diện thành công
          <div className="px-8 py-12">
            {/* Icon thành công */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-green-600 mb-2">Thanh toán thành công</h1>
              <p className="text-gray-600">Cảm ơn bạn đã sử dụng dịch vụ thanh toán VNPay</p>
            </div>

            {/* Thông tin giao dịch */}
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-gray-600 mb-1">Số tiền đã thanh toán</p>
                <p className="text-3xl font-bold text-green-600">
                  {result.order ? formatCurrency(result.order.so_tien_thanh_toan) : "0"} VNĐ
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <span className="font-semibold">{result.order?.ma_don_hang || "N/A"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Thời gian giao dịch:</span>
                <span className="font-semibold">
                  {result.order?.created_at ? formatDate(result.order.created_at) : getCurrentTime()}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Trạng thái:</span>
                <span className="font-semibold text-green-600">Thành công</span>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="/"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
              >
                Về trang chủ
              </a>
              <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border-2 border-gray-200 transition-colors">
                In hóa đơn
              </button>
            </div>
          </div>
        ) : (
          // Giao diện thất bại (theo thiết kế từ hình ảnh)
          <div className="px-8 py-12">
            {/* Icon cảnh báo */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Thông báo</h1>
              <p className="text-gray-700 text-lg">{result.message || "Đơn hàng không tồn tại hoặc đã được xử lý"}</p>
            </div>

            {/* Thông tin chi tiết */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã tra cứu:</span>
                  <span className="font-semibold">{result.transaction_id || "xzlQZeGHuu"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian giao dịch:</span>
                  <span className="font-semibold">{result.transaction_time || getCurrentTime()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="/"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
              >
                Về trang chủ
              </a>
              <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border-2 border-gray-200 transition-colors">
                Thử lại
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a href="tel:19005555.77" className="text-blue-600 hover:underline">
                  1900.5555.77
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href="mailto:hotrovnpay@vnpay.vn" className="text-blue-600 hover:underline">
                  hotrovnpay@vnpay.vn
                </a>
              </div>
            </div>

            {/* Security badges */}
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">SSL SECURE</div>
              <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">VERIFIED</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
