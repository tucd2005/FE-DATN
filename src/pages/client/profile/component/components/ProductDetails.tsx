interface ProductDetailsProps {
  order: any
  orderStatus: string | null
  getImageUrl: (hinh_anh: string | string[] | undefined) => string
  formatPrice: (price: number | string) => string
  showReviewForm: number | null
  setShowReviewForm: (index: number | null) => void
}

export default function ProductDetails({ order, orderStatus, getImageUrl, formatPrice, showReviewForm, setShowReviewForm }: ProductDetailsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <div className="w-2 h-2 bg-white/30 rounded-full mr-3"></div>
          Chi tiết sản phẩm
        </h3>
      </div>
      <div className="p-6">
        {order.items.map((item: any, idx: number) => {
          const variantImage = getImageUrl(item.variant?.hinh_anh)
          const productImage = getImageUrl(item.product?.hinh_anh)
          const imgSrc = variantImage !== "/placeholder.svg" ? variantImage : productImage
          const productName = item.product?.ten || order.ten_san_pham || "Sản phẩm không xác định"
          let attributes: { thuoc_tinh: string; gia_tri: string }[] = []
          if (typeof item.thuoc_tinh_bien_the === "string") {
            try {
              attributes = JSON.parse(item.thuoc_tinh_bien_the)
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
                    const target = e.target as HTMLImageElement
                    if (!target.src.endsWith('/placeholder.svg')) {
                      target.src = '/placeholder.svg'
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
                  {order.gia_tri_bien_the &&
                    order.gia_tri_bien_the.split(",").map((val: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white border border-gray-300 text-sm rounded-full font-medium text-gray-700"
                      >
                        {val.trim()}
                      </span>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Số lượng: {item.so_luong}</span>
                  <span className="text-lg font-bold text-teal-600">{formatPrice(item.don_gia)}</span>
                </div>
                {(orderStatus === "da_nhan" || orderStatus === "da_giao") && (
                  <div className="mt-2">
                    <button
                      className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-blue-600"
                      onClick={() => setShowReviewForm(idx)}
                    >
                      Đánh giá
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}