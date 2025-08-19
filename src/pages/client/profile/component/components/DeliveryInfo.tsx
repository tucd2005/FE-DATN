interface DeliveryInfoProps {
  order: any
  PAYMENT_STATUS_MAP: Record<string, { color: string; label: string }>
}

export default function DeliveryInfo({ order, PAYMENT_STATUS_MAP }: DeliveryInfoProps) {
  return (
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
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
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-600">Trạng thái thanh toán</p>
              {(() => {
                const status = order.trang_thai_thanh_toan
                const map = PAYMENT_STATUS_MAP[status as keyof typeof PAYMENT_STATUS_MAP]
                return map ? (
                  <span className={`font-medium text-${map.color}-600`}>
                    {map.label}
                  </span>
                ) : (
                  <span className="font-medium text-gray-800">
                    {status || "Chưa xác định"}
                  </span>
                )
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}