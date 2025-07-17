"use client"

import { useState } from "react"
import { useProfile } from "../../../hooks/useProfile"
import OrderHistory from "./component/list-don-hang"
import { useNavigate } from "react-router-dom"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const navigate = useNavigate()
  const { data: profile, isLoading } = useProfile()

  const tabs = [
    {
      id: "personal",
      label: "Thông tin cá nhân",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      id: "security",
      label: "Đơn hàng đã đặt",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
    },
    {
      id: "notifications",
      label: "Thông báo",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-5 5v-5zM10.07 2.82l3.12 3.12M7.05 5.84L10.17 8.96"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            Quản lý tài khoản
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật thông tin cá nhân và quản lý cài đặt tài khoản của bạn
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-2">
            <nav className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                >
                  <span className={activeTab === tab.id ? "text-white" : "text-gray-400"}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Profile Content */}
        {activeTab === "personal" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
                <p className="text-gray-500 text-lg">Đang tải thông tin...</p>
              </div>
            ) : (
              <>
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      <h2 className="text-2xl font-bold text-white">Thông tin cá nhân</h2>
                    </div>
                    <button
                      onClick={() => navigate("/thong-tin-khach-hang/edit")}
                      className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/30 focus:outline-none focus:ring-4 focus:ring-white/25 transition-all duration-200 border border-white/20"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                </div>

                {/* Profile Info */}
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 space-y-6 lg:space-y-0">
                    {/* Avatar Section */}
                    <div className="flex-shrink-0 text-center lg:text-left">
                      {profile?.anh_dai_dien ? (
                        <img
                          src={profile.anh_dai_dien || "/placeholder.svg"}
                          alt="Avatar"
                          className="w-32 h-32 rounded-full object-cover mx-auto lg:mx-0 shadow-xl ring-4 ring-teal-100"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto lg:mx-0 shadow-xl ring-4 ring-teal-100">
                          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                      )}
                      <div className="mt-4">
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span className="text-sm font-medium text-teal-700">Đang hoạt động</span>
                        </div>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="text-center lg:text-left mb-6">
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{profile?.name || "Chưa có tên"}</h3>
                        <p className="text-xl text-gray-600 mb-2">{profile?.email}</p>
                        <p className="text-sm text-gray-500 flex items-center justify-center lg:justify-start">
                       
                        
                        </p>
                      </div>

                      {/* Stats Cards */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl text-center">
                          <div className="text-2xl font-bold text-blue-600">12</div>
                          <div className="text-sm text-blue-500">Đơn hàng</div>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl text-center">
                          <div className="text-2xl font-bold text-green-600">5</div>
                          <div className="text-sm text-green-500">Đánh giá</div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl text-center">
                          <div className="text-2xl font-bold text-purple-600">3</div>
                          <div className="text-sm text-purple-500">Yêu thích</div>
                        </div>
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl text-center">
                          <div className="text-2xl font-bold text-orange-600">VIP</div>
                          <div className="text-sm text-orange-500">Hạng</div>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-center mb-3">
                            <svg
                              className="w-5 h-5 text-teal-500 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            <label className="text-sm font-semibold text-gray-700">Số điện thoại</label>
                          </div>
                          <p className="text-gray-900 font-medium">{profile?.phone || "Chưa cập nhật"}</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-center mb-3">
                            <svg
                              className="w-5 h-5 text-teal-500 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1M8 7h8m-8 0v10a2 2 0 002 2h4a2 2 0 002-2V7"
                              />
                            </svg>
                            <label className="text-sm font-semibold text-gray-700">Ngày sinh</label>
                          </div>
                          <p className="text-gray-900 font-medium">
                            {profile?.ngay_sinh
                              ? new Date(profile.ngay_sinh).toLocaleDateString("vi-VN")
                              : "Chưa cập nhật"}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-center mb-3">
                            <svg
                              className="w-5 h-5 text-teal-500 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <label className="text-sm font-semibold text-gray-700">Giới tính</label>
                          </div>
                          <p className="text-gray-900 font-medium">{profile?.gioi_tinh || "Chưa cập nhật"}</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-center mb-3">
                            <svg
                              className="w-5 h-5 text-teal-500 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
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
                            <label className="text-sm font-semibold text-gray-700">Địa chỉ</label>
                          </div>
                          <p className="text-gray-900 font-medium">
                            {profile?.address
                              ? `${profile.address.chiTiet}, ${profile.address.phuongXa}, ${profile.address.quanHuyen}, ${profile.address.tinhThanh}`
                              : "Chưa cập nhật"}
                          </p>
                        </div>

                        <div className="lg:col-span-2 bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-xl border border-teal-100">
                          <div className="flex items-center mb-3">
                            <svg
                              className="w-5 h-5 text-teal-500 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                              />
                            </svg>
                            <label className="text-sm font-semibold text-teal-700">Giới thiệu</label>
                          </div>
                          <p className="text-teal-800 font-medium leading-relaxed">
                            Yêu thích thể thao, đặc biệt là chạy bộ và bơi lội. Luôn tìm kiếm những sản phẩm thể thao
                            chất lượng cao để nâng cao hiệu suất tập luyện.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab đơn hàng */}
        {activeTab === "security" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-6">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">Lịch sử đơn hàng</h2>
              </div>
            </div>
            <OrderHistory />
          </div>
        )}

        {/* Tab thông báo */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-6">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">Thông báo</h2>
              </div>
            </div>
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM10.07 2.82l3.12 3.12M7.05 5.84L10.17 8.96"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có thông báo</h3>
              <p className="text-gray-500">Các thông báo mới sẽ xuất hiện tại đây</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
