"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useOrderDetailclient } from "../../../../hooks/useOrder"
import { ArrowLeft, X, CheckCircle, Clock, BadgeCheck, Truck } from "lucide-react"

export default function OrderTracking() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { data, isLoading } = useOrderDetailclient(id as string)
    const [showCancelModal, setShowCancelModal] = useState(false)
    const [cancelReason, setCancelReason] = useState("")
    const [orderStatus, setOrderStatus] = useState<string | null>(null) // default là null

    const trackingSteps = [
        { id: "cho_xac_nhan", title: "Chờ xác nhận", icon: Clock },
        { id: "dang_chuan_bi", title: "Đang chuẩn bị", icon: BadgeCheck },
        { id: "dang_van_chuyen", title: "Đang vận chuyển", icon: Truck },
        { id: "da_giao", title: "Đã giao", icon: CheckCircle },
        { id: "da_huy", title: "Đã huỷ", icon: X },
        { id: "tra_hang", title: "Trả hàng", icon: ArrowLeft },
    ]

    const cancelReasons = [
        "Thay đổi ý định mua hàng",
        "Tìm được sản phẩm tốt hơn",
        "Giá cả không phù hợp",
        "Thời gian giao hàng quá lâu",
        "Lý do khác",
    ]

    useEffect(() => {
        if (data?.order?.trang_thai_don_hang) {
            setOrderStatus(data.order.trang_thai_don_hang)
        }
    }, [data])

    const getCurrentStepIndex = () => trackingSteps.findIndex((s) => s.id === orderStatus)
    const isStepCompleted = (idx: number) => idx <= getCurrentStepIndex()
    const isStepActive = (idx: number) => idx === getCurrentStepIndex()

    const handleCancelOrder = () => {
        console.log("Cancel with reason:", cancelReason)
        setShowCancelModal(false)
        // TODO: call API cancel here
    }

    if (isLoading) return <div className="p-8">Đang tải...</div>
    if (!data?.order) return <div className="p-8">Không tìm thấy đơn hàng</div>

    const order = data.order
    const firstItem = order.items[0]

    const formatPrice = (price: number | string) =>
        Number(price).toLocaleString("vi-VN") + "đ"

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">


            {/* Main content */}
            <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Back */}
                <button
                    onClick={() => navigate("/chi-tiet-don-hang")}
                    className="flex items-center text-teal-600 hover:text-teal-700 font-medium mb-6"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại danh sách đơn hàng
                </button>

                {/* Order Card */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
                    {/* Order Info */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-lg font-semibold">Mã đơn: <span className="text-blue-600">{order.ma_don_hang}</span></h1>
                            <p className="text-gray-500 text-sm">Ngày đặt: {new Date(order.created_at).toLocaleString()}</p>
                        </div>
                        {orderStatus === "cho_xac_nhan" && (
                            <button
                                onClick={() => setShowCancelModal(true)}
                                className="flex items-center px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-full shadow"
                            >
                                <X className="w-4 h-4 mr-1" /> Hủy đơn hàng
                            </button>
                        )}
                    </div>

                    {/* Tracking */}
                    <div className="relative">
                        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded transition-all duration-700"
                                style={{ width: `${(getCurrentStepIndex() / (trackingSteps.length - 1)) * 100}%` }}
                            />
                        </div>
                        <div className="flex justify-between relative z-10">
                            {trackingSteps.map((step, index) => {
                                const Icon = step.icon
                                const completed = isStepCompleted(index)
                                const active = isStepActive(index)
                                return (
                                    <div key={step.id} className="flex flex-col items-center group">
                                        <div
                                            className={
                                                `w-12 h-12 flex items-center justify-center rounded-full border-2 font-medium transition-all duration-500
                                                ${active
                                                    ? "bg-gradient-to-tr from-blue-500 to-teal-400 text-white border-blue-500 shadow-lg scale-110 animate-bounce"
                                                    : completed
                                                        ? "bg-gradient-to-tr from-blue-400 to-green-400 text-white border-green-500 shadow"
                                                        : "bg-white text-gray-400 border-gray-300"
                                                }
                                                group-hover:scale-105`
                                            }
                                        >
                                            <Icon className={`w-6 h-6 transition-all duration-300 ${active ? "animate-pulse" : ""}`} />
                                        </div>
                                        <p className={`mt-2 text-xs font-semibold text-center transition-all duration-300
                                            ${active ? "text-blue-600 scale-110" : completed ? "text-green-700" : "text-gray-400"}`}>
                                            {step.title}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Địa chỉ nhận hàng</h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-1 text-sm text-gray-700">
                            <p className="font-medium text-gray-800">
                                {order.user.ten}
                                {order.sdt_nguoi_dat && ` - ${order.sdt_nguoi_dat}`}
                            </p>
                            <p>Email: <span className="font-medium">{order.email_nguoi_dat}</span></p>
                            <p>Địa chỉ: <span className="font-medium">{order.dia_chi}</span></p>
                            <p>Thanh toán: <span className="font-medium">{order.phuong_thuc_thanh_toan}</span></p>
                        </div>
                    </div>


                    {/* Product */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-800">Sản phẩm</h3>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <img
                                src={`http://localhost:8000/storage/${firstItem.san_pham_id}.jpg`}
                                alt={firstItem.ten_san_pham}
                                className="w-20 h-20 rounded object-cover border"
                            />
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{firstItem.ten_san_pham}</p>
                                <div className="flex gap-2 mt-1 flex-wrap">
                                    {firstItem.thuoc_tinh_bien_the.map((attr, idx) =>
                                        attr.gia_tri.startsWith("#") ? (
                                            <div
                                                key={idx}
                                                className="w-5 h-5 rounded-full border"
                                                style={{ backgroundColor: attr.gia_tri }}
                                                title={attr.ten_thuoc_tinh}
                                            />
                                        ) : (
                                            <span
                                                key={idx}
                                                className="px-2 py-0.5 bg-white border text-xs rounded"
                                            >
                                                {attr.ten_thuoc_tinh}: {attr.gia_tri}
                                            </span>
                                        )
                                    )}
                                </div>
                                <div className="flex gap-4 mt-1 text-sm text-gray-700">
                                    <span>Số lượng: {firstItem.so_luong}</span>
                                    <span className="text-blue-600 font-semibold">
                                        Đơn giá: {formatPrice(firstItem.don_gia)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Order summary */}
                        <div className="border-t pt-4 space-y-2 text-gray-800 text-sm">
                            <div className="flex justify-between">
                                <span>Tổng tiền hàng:</span>
                                <span className="font-medium">{formatPrice(order.tong_tien || order.so_tien_thanh_toan)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phí vận chuyển:</span>
                                <span className="text-green-600 font-medium">Miễn phí</span>
                            </div>
                            <div className="flex justify-between font-semibold text-base border-t pt-2">
                                <span>Tổng thanh toán:</span>
                                <span className="text-blue-600">{formatPrice(order.so_tien_thanh_toan)}</span>
                            </div>
                        </div>
                    </div>


                </div>
            </main>

            {/* Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-800">Hủy đơn hàng</h3>
                            <button onClick={() => setShowCancelModal(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
                        </div>
                        <p className="text-gray-600 text-sm">Bạn chắc chắn muốn hủy đơn hàng này?</p>
                        <div className="space-y-2">
                            {cancelReasons.map((reason) => (
                                <label key={reason} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="cancelReason"
                                        value={reason}
                                        checked={cancelReason === reason}
                                        onChange={(e) => setCancelReason(e.target.value)}
                                        className="mr-2 text-red-600"
                                    />
                                    <span className="text-sm">{reason}</span>
                                </label>
                            ))}
                        </div>
                        {cancelReason === "Lý do khác" && (
                            <textarea className="w-full p-2 border rounded mt-2 resize-none focus:border-red-500" rows={3} placeholder="Nhập lý do cụ thể..." />
                        )}
                        <div className="flex gap-2">
                            <button onClick={() => setShowCancelModal(false)} className="flex-1 py-2 border rounded text-gray-700 hover:bg-gray-50">Không hủy</button>
                            <button
                                onClick={handleCancelOrder}
                                disabled={!cancelReason}
                                className="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                            >
                                Xác nhận hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
