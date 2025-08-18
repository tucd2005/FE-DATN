import { X } from "lucide-react"

interface CancelModalProps {
  showCancelModal: boolean
  setShowCancelModal: (show: boolean) => void
  cancelReason: string
  setCancelReason: (reason: string) => void
  customCancelReason: string
  setCustomCancelReason: (reason: string) => void
  handleCancelOrder: () => void
  isCancelling: boolean
  isRequestingCancel: boolean
}

export default function CancelModal({
  showCancelModal,
  setShowCancelModal,
  cancelReason,
  setCancelReason,
  customCancelReason,
  setCustomCancelReason,
  handleCancelOrder,
  isCancelling,
  isRequestingCancel
}: CancelModalProps) {
  const cancelReasons = [
    "Tôi đặt nhầm đơn hàng",
    "Tôi muốn thay đổi sản phẩm",
    "Tôi tìm thấy giá tốt hơn ở nơi khác",
    "Thời gian giao hàng quá lâu",
    "Khác"
  ]

  if (!showCancelModal) return null

  return (
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
  )
}