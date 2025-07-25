"use client"

import { useState } from "react"
import { useOrders } from "../../../../hooks/useOrder"
import { useNavigate } from "react-router-dom"

export default function OrderHistory() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { data, isLoading, error } = useOrders(1)   // page = 1
  const navigate = useNavigate()
  const orders = data?.orders || []

  const statusOptions = [
    { value: "all", label: "Tất cả đơn hàng", count: orders.length },
    { value: "cho_xac_nhan", label: "Chờ xác nhận", count: orders.filter((o) => o.trang_thai_don_hang === "cho_xac_nhan").length },
    { value: "dang_chuan_bi", label: "Đang chuẩn bị", count: orders.filter((o) => o.trang_thai_don_hang === "dang_chuan_bi").length },
    { value: "dang_van_chuyen", label: "Đang vận chuyển", count: orders.filter((o) => o.trang_thai_don_hang === "dang_van_chuyen").length },
    { value: "da_giao", label: "Đã giao", count: orders.filter((o) => o.trang_thai_don_hang === "da_giao").length },
    { value: "da_huy", label: "Đã huỷ", count: orders.filter((o) => o.trang_thai_don_hang === "da_huy").length },
    { value: "tra_hang", label: "Trả hàng", count: orders.filter((o) => o.trang_thai_don_hang === "tra_hang").length },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cho_xac_nhan":
        return "bg-yellow-100 text-yellow-800"
      case "dang_chuan_bi":
        return "bg-blue-100 text-blue-800"
      case "dang_van_chuyen":
        return "bg-cyan-100 text-cyan-800"
      case "da_giao":
        return "bg-green-100 text-green-800"
      case "da_huy":
        return "bg-red-100 text-red-800"
      case "tra_hang":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === "all" || order.trang_thai_don_hang === selectedStatus
    const matchesSearch =
      order.ma_don_hang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.ten_san_pham.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesStatus && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lịch sử đơn hàng</h1>
          <p className="mt-2 text-gray-600">Xem chi tiết tất cả đơn hàng đã đặt</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Bộ lọc</h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
                <input
                  type="text"
                  placeholder="Mã đơn hàng, tên sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Trạng thái đơn hàng</label>
                <div className="space-y-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedStatus(option.value)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${selectedStatus === option.value
                        ? "bg-teal-50 text-teal-700 border border-teal-200"
                        : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      <span>{option.label}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{option.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-12">Đang tải...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-12">Có lỗi xảy ra</div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow">
                    {/* Order Header */}
                    <div className="px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="text-lg font-medium text-teal-600">Đơn hàng #{order.ma_don_hang}</h3>
                            <p className="text-sm text-gray-500">Đặt ngày {order.ngay_dat}</p>
                          </div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.trang_thai_don_hang)}`}
                          >
                            {order.trang_thai_don_hang}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">{order.tong_tien_thanh_toan}₫</p>
                          <p className="text-sm text-gray-500">{order.so_luong_mat_hang} sản phẩm</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="px-6 py-4 space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <img
                            src={`http://localhost:8000/storage/${item.hinh_anh}`}
                            alt={item.ten_san_pham}
                            className="w-16 h-16 rounded-md object-cover border border-gray-200"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{item.ten_san_pham}</h4>
                            <div className="text-xs text-gray-500 flex flex-wrap gap-1 mt-0.5">
                              {item.thuoc_tinh_bien_the.map((tt, i) => (
                                tt.gia_tri.startsWith("#") ? (
                                  <span key={i} className="flex items-center gap-1">
                                    {tt.ten_thuoc_tinh}:
                                    <span
                                      className="w-4 h-4 inline-block rounded border border-gray-300"
                                      style={{ backgroundColor: tt.gia_tri }}
                                      title={tt.ten_thuoc_tinh}
                                    ></span>
                                  </span>
                                ) : (
                                  <span key={i}>
                                    {tt.ten_thuoc_tinh}: {tt.gia_tri}
                                  </span>
                                )
                              ))}
                            </div>
                          </div>
                          <div className="text-sm font-medium text-gray-900">{item.don_gia}₫</div>
                        </div>
                      ))}


                    </div>

                    {/* Order Actions */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => navigate(`/chi-tiet-don-hang/${order.id}`)}
                            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                          >
                            Xem chi tiết
                          </button>
                          {order.trang_thai_don_hang === "dang_chuan_bi" && (
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Theo dõi đơn hàng</button>
                          )}
                          {order.trang_thai_don_hang === "da_giao" && (
                            <button className="text-sm text-green-600 hover:text-green-700 font-medium">Đánh giá sản phẩm</button>
                          )}
                        </div>
                        {(order.trang_thai_don_hang === "da_giao" || order.trang_thai_don_hang === "da_huy") && (
                          <button className="text-sm bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium">Mua lại</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {filteredOrders.length === 0 && (
                  <div className="bg-white rounded-lg shadow p-12 text-center">
                    <p className="text-gray-500">Không tìm thấy đơn hàng</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
