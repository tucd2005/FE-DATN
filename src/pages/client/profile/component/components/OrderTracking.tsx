
"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { message } from 'antd';
import OrderHeader from "./OrderHeader"
import TrackingSteps from "./TrackingSteps"
import DeliveryInfo from "./DeliveryInfo"
import ProductDetails from "./ProductDetails"
import OrderSummary from "./OrderSummary"
import CancelModal from "./CancelModal"
import ReturnModal from "./ReturnModal"
import ReviewFormModal from "./ReviewFormModal"
import { useCancelOrder, useMarkOrderAsDelivered, useOrderDetailclient, useReturnOrder } from "../../../../../hooks/useOrder";
import { useProfile } from "../../../../../hooks";
import { useSubmitReview } from "../../../../../hooks/useReview";
import { X } from "lucide-react";

// Cập nhật interface để phù hợp với cấu trúc dữ liệu thực tế
interface OrderItem {
  id: number
  san_pham_id: number
  bien_the_id: number
  so_luong: number
  don_gia: string
  tong_tien: string
  so_tien_duoc_giam: string
  thuoc_tinh_bien_the: string
  created_at: string
  updated_at: string
  product: {
    id: number
    ten: string
    hinh_anh: string
    mo_ta: string
    so_luong: number
    so_luong_da_ban: number
    created_at: string
    updated_at: string
  }
  variant: {
    id: number
    san_pham_id: number
    so_luong: number
    hinh_anh: string
    so_luong_da_ban: number
    gia: string
    gia_khuyen_mai: string
    created_at: string
    updated_at: string
  }
}

export default function OrderTracking() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, isLoading } = useOrderDetailclient(id as string)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const [returnReason, setReturnReason] = useState("")
  const [showReturnModal, setShowReturnModal] = useState(false)
  const [customCancelReason, setCustomCancelReason] = useState("")
  const [customReturnReason, setCustomReturnReason] = useState("")
  const [orderStatus, setOrderStatus] = useState<string | null>(null)
  const { mutate: returnOrder, isPending: isReturning } = useReturnOrder()
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder()
  const { mutate: markAsDelivered, isPending } = useMarkOrderAsDelivered()
  const [isRequestingCancel, setIsRequestingCancel] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState<number | null>(null)
  const [returnImages, setReturnImages] = useState<File[]>([])
  const { data: profile } = useProfile()
  const submitReview = useSubmitReview()

  const [reviewForm, setReviewForm] = useState({
    so_sao: 5,
    noi_dung: '',
    hinh_anh: null as File | null,
  })

  const PAYMENT_STATUS_MAP: Record<string, { color: string; label: string }> = {
    da_thanh_toan: { color: "green", label: "Đã thanh toán" },
    cho_xu_ly: { color: "orange", label: "Chờ xử lý" },
    that_bai: { color: "red", label: "Thất bại" },
    hoan_tien: { color: "blue", label: "Hoàn tiền" },
    da_huy: { color: "red", label: "Đã huỷ" },
    cho_hoan_tien: { color: "gold", label: "Chờ hoàn tiền" },
  }

  const trackingSteps = [
    { id: "cho_xac_nhan", title: "Chờ xác nhận", icon: "Clock", color: "from-amber-400 to-orange-500" },
    { id: "dang_chuan_bi", title: "Đang chuẩn bị", icon: "BadgeCheck", color: "from-blue-400 to-blue-600" },
    { id: "dang_van_chuyen", title: "Đang vận chuyển", icon: "Truck", color: "from-purple-400 to-purple-600" },
    { id: "da_giao", title: "Đã giao", icon: "CheckCircle", color: "from-green-400 to-green-600" },
    { id: "yeu_cau_huy_hang", title: "Yêu cầu hủy", icon: "X", color: "from-red-400 to-red-600" },
    { id: "yeu_cau_tra_hang", title: "Yêu cầu trả hàng", icon: "ArrowLeft", color: "from-gray-400 to-gray-600" },
    { id: "da_huy", title: "Đã huỷ", icon: "X", color: "from-red-400 to-red-600" },
    { id: "tra_hang", title: "Trả hàng", icon: "ArrowLeft", color: "from-gray-400 to-gray-600" },
  ]

  useEffect(() => {
    if (data?.order?.trang_thai_don_hang) {
      setOrderStatus(data.order.trang_thai_don_hang)
    }
  }, [data])

  const handleReturnImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setReturnImages(prev => [...prev, ...files])
    }
  }

  const removeReturnImage = (index: number) => {
    setReturnImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value })
  }

  const handleReviewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewForm({ ...reviewForm, hinh_anh: e.target.files?.[0] || null })
  }

  const handleSubmitReview = (productId: number, variantId: number | undefined) => (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) {
      message.error('Bạn cần đăng nhập để đánh giá!')
      return
    }
    const formData = new FormData()
    formData.append('san_pham_id', String(productId))
    formData.append('bien_the_id', variantId ? String(variantId) : '')
    formData.append('so_sao', String(reviewForm.so_sao))
    formData.append('noi_dung', reviewForm.noi_dung)
    if (reviewForm.hinh_anh) formData.append('hinh_anh', reviewForm.hinh_anh)
    submitReview.mutate(formData, {
      onSuccess: () => {
        setShowReviewForm(null)
        setReviewForm({ so_sao: 5, noi_dung: '', hinh_anh: null })
        message.success('Đánh giá thành công!')
      },
      onError: (err: any) => {
        message.error(err.response?.data?.message || 'Có lỗi xảy ra')
      }
    })
  }

  const handleCancelOrder = () => {
    if (!data?.order?.id) return
    if (!cancelReason || (cancelReason === "Khác" && !customCancelReason)) return
    setIsRequestingCancel(true)
    cancelOrder({
      id: data.order.id,
      ly_do_huy: cancelReason === "Khác" ? customCancelReason : cancelReason
    }, {
      onSuccess: () => {
        setIsRequestingCancel(false)
        setOrderStatus("da_huy")
        setShowCancelModal(false)
        setCancelReason("")
        setCustomCancelReason("")
      },
      onError: () => {
        setIsRequestingCancel(false)
      }
    })
  }

  const handleReturnOrder = () => {
    if (!data?.order?.id) return
    setShowReturnModal(true)
  }

  const confirmReturnOrder = () => {
    if (!data?.order?.id) return
    if (!returnReason || (returnReason === "Khác" && !customReturnReason)) return

    const formData = new FormData()
    formData.append("ly_do_tra_hang", returnReason === "Khác" ? customReturnReason : returnReason)
    returnImages.forEach((file) => {
      formData.append("hinh_anh_tra_hang[]", file)
    })

    returnOrder(
      { id: data.order.id, data: formData },
      {
        onSuccess: () => {
          setShowReturnModal(false)
          setReturnReason("")
          setCustomReturnReason("")
          setReturnImages([])
        }
      }
    )
  }

  const formatPrice = (price: number | string) => Number(price).toLocaleString("vi-VN") + "đ"

  const getImageUrl = (hinh_anh: string | string[] | undefined): string => {
    if (!hinh_anh) return "/placeholder.svg"

    if (Array.isArray(hinh_anh)) {
      if (hinh_anh.length > 0) {
        return `http://127.0.0.1:8000/storage/${hinh_anh[0]}`
      }
      return "/placeholder.svg"
    }

    if (typeof hinh_anh === 'string') {
      try {
        const parsed = JSON.parse(hinh_anh)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return `http://127.0.0.1:8000/storage/${parsed[0]}`
        }
      } catch {
        if (hinh_anh.startsWith("http")) {
          return hinh_anh
        }
        return `http://127.0.0.1:8000/storage/${hinh_anh}`
      }
    }

    return "/placeholder.svg"
  }

  const canReturnOrder = () => {
    if (orderStatus !== "da_nhan") return false
    if (!data?.order?.thoi_gian_nhan) return false
    const nhanDate = new Date(data.order.thoi_gian_nhan)
    const now = new Date()
    return now.getTime() - nhanDate.getTime() <= 3 * 24 * 60 * 60 * 1000
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-lg text-gray-600">Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    )
  }

  if (!data?.order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <X className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-lg text-gray-600">Không tìm thấy đơn hàng</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
      <OrderHeader
        order={data.order}
        orderStatus={orderStatus}
        isRequestingCancel={isRequestingCancel}
        setShowCancelModal={setShowCancelModal}
        markAsDelivered={markAsDelivered}
        isPending={isPending}
        handleReturnOrder={handleReturnOrder}
        isReturning={isReturning}
        canReturnOrder={canReturnOrder}
        navigate={navigate}
      />
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <TrackingSteps
          orderStatus={orderStatus}
          order={data.order}
          trackingSteps={trackingSteps}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DeliveryInfo order={data.order} PAYMENT_STATUS_MAP={PAYMENT_STATUS_MAP} />
            <ProductDetails
              order={data.order}
              orderStatus={orderStatus}
              getImageUrl={getImageUrl}
              formatPrice={formatPrice}
              showReviewForm={showReviewForm}
              setShowReviewForm={setShowReviewForm}
            />
          </div>
          <OrderSummary order={data.order} formatPrice={formatPrice} />
        </div>
      </main>
      <CancelModal
        showCancelModal={showCancelModal}
        setShowCancelModal={setShowCancelModal}
        cancelReason={cancelReason}
        setCancelReason={setCancelReason}
        customCancelReason={customCancelReason}
        setCustomCancelReason={setCustomCancelReason}
        handleCancelOrder={handleCancelOrder}
        isCancelling={isCancelling}
        isRequestingCancel={isRequestingCancel}
      />
      <ReturnModal
        showReturnModal={showReturnModal}
        setShowReturnModal={setShowReturnModal}
        returnReason={returnReason}
        setReturnReason={setReturnReason}
        customReturnReason={customReturnReason}
        setCustomReturnReason={setCustomReturnReason}
        returnImages={returnImages}
        handleReturnImagesChange={handleReturnImagesChange}
        removeReturnImage={removeReturnImage}
        confirmReturnOrder={confirmReturnOrder}
        isReturning={isReturning}
      />
      {showReviewForm !== null && (
        <ReviewFormModal
          item={data.order.items[showReviewForm]}
          reviewForm={reviewForm}
          handleReviewChange={handleReviewChange}
          handleReviewFile={handleReviewFile}
          handleSubmitReview={handleSubmitReview}
          setShowReviewForm={setShowReviewForm}
        />
      )}
    </div>
  )
}