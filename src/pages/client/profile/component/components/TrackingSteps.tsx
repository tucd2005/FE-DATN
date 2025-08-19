import { Clock, BadgeCheck, Truck, CheckCircle, X, ArrowLeft } from "lucide-react"

interface TrackingStep {
  id: string
  title: string
  icon: string
  color: string
}

interface TrackingStepsProps {
  orderStatus: string | null
  order: any
  trackingSteps: TrackingStep[]
}

export default function TrackingSteps({ orderStatus, order, trackingSteps }: TrackingStepsProps) {
  const getCurrentStepIndex = () => trackingSteps.findIndex((s) => s.id === orderStatus)
  const isStepCompleted = (idx: number) => idx <= getCurrentStepIndex()
  const isStepActive = (idx: number) => idx === getCurrentStepIndex()

  const iconMap: Record<string, any> = {
    Clock,
    BadgeCheck,
    Truck,
    CheckCircle,
    X,
    ArrowLeft
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
      <div className="p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-8 flex items-center">
          <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
          Trạng thái đơn hàng
        </h2>
        <div className="relative">
          {["yeu_cau_tra_hang", "xac_nhan_tra_hang", "tra_hang_thanh_cong", "tu_choi_tra_hang"].includes(orderStatus || "") ? (
            orderStatus === "tu_choi_tra_hang" ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 bg-gradient-to-r from-red-400 to-red-600 text-white border-white shadow-2xl scale-110 animate-pulse">
                  <X className="w-8 h-8" />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm font-semibold text-red-700">Yêu cầu trả hàng đã bị từ chối!</p>
                  <p className="text-gray-600">Lý do: {order.ly_do_tu_choi_tra_hang}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center relative z-10">
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 flex items-center justify-center rounded-full border-4
                    ${orderStatus === "yeu_cau_tra_hang" ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-white shadow-2xl scale-110 animate-pulse" : "bg-white text-gray-400 border-gray-300 shadow-md"}
                  `}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M19 7v4H5V7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 11V5a2 2 0 012-2h6a2 2 0 012 2v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 17h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 21h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="mt-4 text-center">
                    <p className={`text-sm font-semibold ${orderStatus === "yeu_cau_tra_hang" ? "text-yellow-700 scale-110" : "text-gray-400"}`}>Yêu cầu trả hàng</p>
                    {orderStatus === "yeu_cau_tra_hang" && (
                      <div className="mt-2 px-3 py-1 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-full">
                        <span className="text-xs font-medium text-yellow-700">Hiện tại</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="h-1 w-24 bg-yellow-400 rounded-full -ml-2 -mr-2" />
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 flex items-center justify-center rounded-full border-4
                    ${orderStatus === "xac_nhan_tra_hang" ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white border-white shadow-2xl scale-110 animate-pulse" : "bg-white text-gray-400 border-gray-300 shadow-md"}
                  `}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M19 7v4H5V7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 11V5a2 2 0 012-2h6a2 2 0 012 2v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 17h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 21h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="mt-4 text-center">
                    <p className={`text-sm font-semibold ${orderStatus === "xac_nhan_tra_hang" ? "text-blue-700 scale-110" : "text-gray-400"}`}>Đã xác nhận trả hàng</p>
                    {orderStatus === "xac_nhan_tra_hang" && (
                      <div className="mt-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full">
                        <span className="text-xs font-medium text-blue-700">Hiện tại</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="h-1 w-24 bg-green-400 rounded-full -ml-2 -mr-2" />
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 flex items-center justify-center rounded-full border-4
                    ${orderStatus === "tra_hang_thanh_cong" ? "bg-gradient-to-r from-green-400 to-green-600 text-white border-white shadow-2xl scale-110 animate-pulse" : "bg-white text-gray-400 border-gray-300 shadow-md"}
                  `}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="mt-4 text-center">
                    <p className={`text-sm font-semibold ${orderStatus === "tra_hang_thanh_cong" ? "text-green-700 scale-110" : "text-gray-400"}`}>Trả hàng thành công</p>
                    {orderStatus === "tra_hang_thanh_cong" && (
                      <div className="mt-2 px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 rounded-full">
                        <span className="text-xs font-medium text-green-700">Hiện tại</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          ) : (
            <>
              <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${orderStatus === "tra_hang"
                      ? 100
                      : (
                        getCurrentStepIndex() /
                        (trackingSteps.filter((s) => s.id !== "da_huy" && s.id !== "tra_hang").length - 1)
                      ) * 100
                      }%`,
                  }}
                />
              </div>
              <div className="flex justify-between relative z-10">
                {trackingSteps.map((step, index) => {
                  const Icon = iconMap[step.icon]
                  const completed = isStepCompleted(index)
                  const active = isStepActive(index)
                  const isSpecialStatus = step.id === "da_huy" || step.id === "tra_hang"

                  if (isSpecialStatus && !active) return null

                  return (
                    <div key={step.id} className="flex flex-col items-center group">
                      <div
                        className={`w-16 h-16 flex items-center justify-center rounded-full border-4 transition-all duration-500 ${active
                          ? `bg-gradient-to-r ${step.color} text-white border-white shadow-2xl scale-110 animate-pulse`
                          : completed
                            ? "bg-gradient-to-r from-teal-400 to-emerald-400 text-white border-teal-200 shadow-lg"
                            : "bg-white text-gray-400 border-gray-300 shadow-md"
                          } group-hover:scale-105`}
                      >
                        <Icon className={`w-7 h-7 transition-all duration-300 ${active ? "animate-bounce" : ""}`} />
                      </div>
                      <div className="mt-4 text-center">
                        <p
                          className={`text-sm font-semibold transition-all duration-300 ${active ? "text-teal-600 scale-110" : completed ? "text-emerald-600" : "text-gray-400"
                            }`}
                        >
                          {step.title}
                        </p>
                        {active && (
                          <div className="mt-2 px-3 py-1 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full">
                            <span className="text-xs font-medium text-teal-700">Hiện tại</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              {orderStatus === "da_huy" && (
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="text-lg font-semibold text-red-600 mb-2">Đã hủy</div>
                  {order?.ly_do_huy && (
                    <p className="text-sm text-gray-600 text-center">
                      Lý do: {order.ly_do_huy}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
          {orderStatus === "yeu_cau_tra_hang" && (
            <div className="flex flex-col items-center justify-center my-12">
              <div className="flex items-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-white shadow-2xl scale-110 animate-pulse">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 7v4H5V7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 11V5a2 2 0 012-2h6a2 2 0 012 2v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 17h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 21h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold text-yellow-700 mb-2">Đã gửi yêu cầu trả hàng</p>
                <p className="text-gray-600">Chờ xác nhận từ người bán</p>
              </div>
            </div>
          )}
          {orderStatus === "xac_nhan_tra_hang" && (
            <div className="flex flex-col items-center justify-center my-12">
              <div className="flex items-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white border-white shadow-2xl scale-110 animate-pulse">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 7v4H5V7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 11V5a2 2 0 012-2h6a2 2 0 012 2v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 17h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 21h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold text-blue-700 mb-2">Yêu cầu trả hàng đang chờ xác nhận...</p>
              </div>
            </div>
          )}
          {orderStatus === "tra_hang_thanh_cong" && (
            <div className="flex flex-col items-center justify-center my-12">
              <div className="flex items-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 bg-gradient-to-r from-green-400 to-green-600 text-white border-white shadow-2xl scale-110 animate-pulse">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold text-green-700 mb-2">Trả hàng thành công!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}