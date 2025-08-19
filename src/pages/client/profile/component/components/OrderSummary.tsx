
interface OrderSummaryProps {
  order: any
  formatPrice: (price: number | string) => string
}

export default function OrderSummary({ order, formatPrice }: OrderSummaryProps) {
  return (
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
            {formatPrice(
              order.items?.reduce((total: number, item: any) => {
                const donGia = Number(item.don_gia || 0)
                const soLuong = Number(item.so_luong || 1)
                return total + donGia * soLuong
              }, 0) || 0
            )}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600">Phí vận chuyển:</span>
          <span className="font-semibold text-red-600">
            {formatPrice(Number(order.phi_ship || 0))}
          </span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600">Số tiền được giảm:</span>
          <span className="font-semibold text-green-600">
            -{formatPrice(Number(order.so_tien_duoc_giam || 0))}
          </span>
        </div>
        <div className="flex justify-between items-center py-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl px-4 border border-teal-100">
          <span className="font-semibold text-gray-800">Tổng thanh toán:</span>
          <span className="text-xl font-bold text-teal-600">{formatPrice(order.so_tien_thanh_toan)}</span>
        </div>
      </div>
    </div>
  )
}
