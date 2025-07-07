"use client"

import { useState } from "react"
import { useProfile } from "../../../hooks/useProfile"
import OrderHistory from "./component/list-don-hang"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")

  const { data: profile, isLoading } = useProfile()

  const tabs = [
    { id: "personal", label: "Thông tin cá nhân" },
    { id: "security", label: "thông tin đơn hàng đã đặt " },
    { id: "notifications", label: "Thông báo" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý tài khoản</h1>
          <p className="mt-2 text-gray-600">Cập nhật thông tin cá nhân và cài đặt tài khoản</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Profile Content */}
        {activeTab === "personal" && (
          <div className="bg-white rounded-lg shadow">
            {isLoading ? (
              <div className="p-6 text-center text-gray-500">Đang tải thông tin...</div>
            ) : (
              <>
                {/* Profile Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Thông tin cá nhân</h2>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Chỉnh sửa
                  </button>
                </div>

                {/* Profile Info */}
                <div className="px-6 py-6">
                  <div className="flex items-start space-x-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {profile?.anh_dai_dien ? (
                        <img
                          src={profile.anh_dai_dien}
                          alt="Avatar"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center">
                          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{profile?.name || "Chưa có tên"}</h3>
                      <p className="text-gray-600">{profile?.email}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Thành viên từ {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long' }) : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                      <p className="text-gray-600">{profile?.so_dien_thoai || "Chưa cập nhật"}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                      <p className="text-gray-600">
                        {profile?.ngay_sinh ? new Date(profile.ngay_sinh).toLocaleDateString('vi-VN') : "Chưa cập nhật"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                      <p className="text-gray-600">{profile?.gioi_tinh || "Chưa cập nhật"}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Thành viên từ</label>
                      <p className="text-gray-600">
                        {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long' }) : "N/A"}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Giới thiệu</label>
                      <p className="text-gray-600">
                        Yêu thích thể thao, đặc biệt là chạy bộ và bơi lội. Luôn tìm kiếm những sản phẩm thể thao chất lượng cao.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab bảo mật */}
        {activeTab === "security" && <OrderHistory />}

        {/* Tab thông báo */}
        {/* {activeTab === "notifications" && <NotificationsTab />} */}
      </main>
    </div>
  )
}
