interface ReviewFormModalProps {
  item: any
  reviewForm: { so_sao: number; noi_dung: string; hinh_anh: File | null }
  handleReviewChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleReviewFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmitReview: (productId: number, variantId: number | undefined) => (e: React.FormEvent) => void
  setShowReviewForm: (index: number | null) => void
}

export default function ReviewFormModal({
  item,
  reviewForm,
  handleReviewChange,
  handleReviewFile,
  handleSubmitReview,
  setShowReviewForm
}: ReviewFormModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.571L24 9.753l-6 5.847L19.335 24 12 20.021 4.665 24 6 15.6 0 9.753l8.332-1.595z" />
          </svg>
          <h3 className="text-lg font-semibold text-white">Đánh giá sản phẩm</h3>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-gray-600">Hãy để lại ý kiến và đánh giá của bạn về sản phẩm này:</p>
          <form
            className="space-y-4"
            onSubmit={handleSubmitReview(item.san_pham_id, item.bien_the_id)}
          >
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => handleReviewChange({ target: { name: "so_sao", value: star } })}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${star <= reviewForm.so_sao ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.571L24 9.753l-6 5.847L19.335 24 12 20.021 4.665 24 6 15.6 0 9.753l8.332-1.595z" />
                </svg>
              ))}
            </div>
            <textarea
              name="noi_dung"
              value={reviewForm.noi_dung}
              onChange={handleReviewChange}
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Viết cảm nhận của bạn..."
              required
            />
            <input
              type="file"
              name="hinh_anh"
              accept="image/*"
              onChange={handleReviewFile}
              className="block w-full text-sm text-gray-500 border border-gray-200 rounded-lg cursor-pointer focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="border px-4 py-2 rounded-lg hover:bg-gray-100"
                onClick={() => setShowReviewForm(null)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Gửi đánh giá
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}