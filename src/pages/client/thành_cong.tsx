"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Component() {
  const [showNotification, setShowNotification] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Tự động ẩn thông báo sau 5 giây và quay về trang chủ
    const timer = setTimeout(() => {
      setShowNotification(false)
      navigate("/")  // 👈 quay về trang chủ
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-white">
      {showNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full relative transform transition-all duration-300 scale-100 opacity-100">
            <button
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              onClick={() => {
                setShowNotification(false)
                navigate("/")  // 👈 bấm nút đóng cũng quay về trang chủ
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-600 mb-2">Đặt hàng thành công!</h3>
              <p className="text-gray-600">Cảm ơn bạn đã đặt hàng. Chúng tôi đã nhận được đơn hàng của bạn.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
