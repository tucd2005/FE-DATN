import { ArrowLeft, X, CheckCircle, ArrowLeft as ArrowLeftIcon } from "lucide-react"

interface OrderHeaderProps {
  order: any
  orderStatus: string | null
  isRequestingCancel: boolean
  setShowCancelModal: (show: boolean) => void
  markAsDelivered: (id: number) => void
  isPending: boolean
  handleReturnOrder: () => void
  isReturning: boolean
  canReturnOrder: () => boolean
  navigate: (path: string) => void
}

export default function OrderHeader({
  order,
  orderStatus,
  isRequestingCancel,
  setShowCancelModal,
  markAsDelivered,
  isPending,
  handleReturnOrder,
  isReturning,
  canReturnOrder,
  navigate
}: OrderHeaderProps) {
  return (
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
            <div className="flex items-center gap-3">
              {(orderStatus === "cho_xac_nhan" || orderStatus === "dang_chuan_bi") && !isRequestingCancel && (
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
                  onClick={() => markAsDelivered(order.id)}
                  disabled={isPending}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-medium rounded-xl hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-200 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isPending ? "Đang xác nhận..." : "Xác nhận đã nhận hàng"}
                </button>
              )}
              {orderStatus === "da_nhan" && canReturnOrder() && (
                <button
                  onClick={handleReturnOrder}
                  disabled={isReturning}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  {isReturning ? "Đang xử lý..." : "Trả hàng"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}