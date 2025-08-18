import { X } from "lucide-react"

interface ReturnModalProps {
  showReturnModal: boolean
  setShowReturnModal: (show: boolean) => void
  returnReason: string
  setReturnReason: (reason: string) => void
  customReturnReason: string
  setCustomReturnReason: (reason: string) => void
  returnImages: File[]
  handleReturnImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  removeReturnImage: (index: number) => void
  confirmReturnOrder: () => void
  isReturning: boolean
}

export default function ReturnModal({
  showReturnModal,
  setShowReturnModal,
  returnReason,
  setReturnReason,
  customReturnReason,
  setCustomReturnReason,
  returnImages,
  handleReturnImagesChange,
  removeReturnImage,
  confirmReturnOrder,
  isReturning
}: ReturnModalProps) {
  const returnReasons = [
    "Sản phẩm bị lỗi/hỏng",
    "Sản phẩm không đúng mô tả",
    "Tôi không còn nhu cầu sử dụng",
    "Khác"
  ]

  if (!showReturnModal) return null

  return (
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
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Hình ảnh minh họa (nếu có)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleReturnImagesChange}
              className="w-full"
            />
            {returnImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {returnImages.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Ảnh ${idx + 1}`}
                      className="w-full h-full object-cover rounded-lg border"
                    />
                    <button
                      onClick={() => removeReturnImage(idx)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
                      type="button"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
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
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {isReturning ? "Đang xử lý..." : "Xác nhận trả hàng"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}