import { useEffect, useState } from "react"
import { useProfile } from "../../../hooks/useProfile"
import OrderHistory from "./component/list-don-hang"
import { useNavigate, useSearchParams } from "react-router-dom"
import ChangePasswordForm from "./component/ChangePasswordForm"
import instanceAxios from "../../../utils/axios"
import { useWalletBalance, useCheckPendingTransaction, useWalletDeposit, useWalletWithdraw, useWalletTransactions } from "../../../hooks/useWalletClient"
import { formatCurrency } from "../../../utils/formatCurrency"
import { Modal, Form, Input, Button, message } from "antd"

type TUserProfile = {
  orders: number
  reviews: number
  Wishlist: number
  rank: string
}

export default function ProfilePage() {
  const [dataProfile, setDataProfile] = useState<TUserProfile>({
    orders: 0,
    reviews: 0,
    Wishlist: 0,
    rank: "Chưa có hạng",
  })
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    // Tự động chuyển tab ví nếu có query parameter
    return searchParams.get('tab') || "personal";
  })
  const [depositModalVisible, setDepositModalVisible] = useState(false)
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false)
  const [depositForm] = Form.useForm()
  const [withdrawForm] = Form.useForm()

  const navigate = useNavigate()
  const { data: profile, isLoading } = useProfile()
  const { data: walletBalance, isLoading: walletLoading } = useWalletBalance()
  const { data: pendingTransaction } = useCheckPendingTransaction()
  const { data: transactions, isLoading: transactionsLoading } = useWalletTransactions()

  const depositMutation = useWalletDeposit()
  const withdrawMutation = useWalletWithdraw()

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await instanceAxios.get("/client/overview")
        setDataProfile(response.data)
      } catch (error) {
        console.error("Error fetching profile data:", error)
      }
    }
    getProfileData();

    // Kiểm tra nếu có thông báo nạp tiền thành công từ localStorage
    const lastPayment = localStorage.getItem('lastPaymentSuccess');
    if (lastPayment && activeTab === 'wallet') {
      try {
        const paymentInfo = JSON.parse(lastPayment);
        const paymentTime = new Date(paymentInfo.created_at);
        const now = new Date();
        const diffHours = (now.getTime() - paymentTime.getTime()) / (1000 * 60 * 60);

        // Chỉ hiển thị thông báo nếu giao dịch trong vòng 1 giờ
        if (diffHours < 1) {
          message.success(`${paymentInfo.message || 'Nạp tiền thành công!'} Số tiền: ${formatCurrency(paymentInfo.amount)}`);
          // Xóa thông tin sau khi hiển thị
          localStorage.removeItem('lastPaymentSuccess');
        }
      } catch (error) {
        console.error('Error parsing payment data:', error);
      }
    }
  }, [activeTab])

  const handleDeposit = async (values: { amount: string | number }) => {
    try {
      const amount = Number(values.amount)
      const result = await depositMutation.mutateAsync({ amount })
      if (result?.data?.payment_url) {
        window.open(result.data.payment_url, '_blank')
        message.success('Đã tạo giao dịch nạp tiền thành công!')
      }
      setDepositModalVisible(false)
      depositForm.resetFields()
    } catch (error: unknown) {
      console.error('Deposit error:', error)
      const errorMessage = error && typeof error === 'object' && 'response' in error
        ? (error.response as any)?.data?.message
        : 'Có lỗi xảy ra khi nạp tiền!'
      message.error(errorMessage)
    }
  }

  const handleWithdraw = async (values: {
    amount: string | number
    bank_name: string
    bank_account: string
    acc_name: string
  }) => {
    try {
      const amount = Number(values.amount)
      await withdrawMutation.mutateAsync({ ...values, amount })
      message.success('Yêu cầu rút tiền đã được gửi!')
      setWithdrawModalVisible(false)
      withdrawForm.resetFields()
    } catch (error: unknown) {
      console.error('Withdraw error:', error)
      const errorMessage = error && typeof error === 'object' && 'response' in error
        ? (error.response as any)?.data?.message
        : 'Có lỗi xảy ra khi rút tiền!'
      message.error(errorMessage)
    }
  }

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
      id: "wallet",
      label: "Ví điện tử",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
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
      id: "password",
      label: "Đổi mật khẩu",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 11c1.1 0 2 .9 2 2v1h-4v-1c0-1.1.9-2 2-2zm6 0V9a6 6 0 10-12 0v2H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2h-1zM8 9a4 4 0 118 0v2H8V9z"
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
                  className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-xl font-medium text-sm transition-all duration-200 ${activeTab === tab.id
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
                          <div className="text-2xl font-bold text-blue-600">{dataProfile.orders}</div>
                          <div className="text-sm text-blue-500">Đơn hàng</div>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl text-center">
                          <div className="text-2xl font-bold text-green-600">{dataProfile.reviews}</div>
                          <div className="text-sm text-green-500">Đánh giá</div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl text-center">
                          <div className="text-2xl font-bold text-purple-600">{dataProfile.Wishlist}</div>
                          <div className="text-sm text-purple-500">Yêu thích</div>
                        </div>
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl text-center">
                          <div className="text-sm text-orange-500">Hạng</div>
                          <div className="text-2xl font-bold text-orange-600">{dataProfile.rank}</div>
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

        {/* Tab ví điện tử */}
        {activeTab === "wallet" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">Ví điện tử</h2>
                </div>
                <div className="text-right text-white">
                  {walletLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span className="text-sm">Đang tải...</span>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">
                        {walletBalance ? formatCurrency(walletBalance.balance) : "0 VNĐ"}
                      </div>
                      <div className="text-sm opacity-90">Số dư hiện tại</div>
                      <button
                        onClick={() => window.location.reload()}
                        className="text-xs underline opacity-75 hover:opacity-100 mt-1"
                      >
                        Làm mới
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="p-8">
              {/* Thông báo giao dịch đang chờ */}
              {pendingTransaction?.status === 'pending' && pendingTransaction?.data && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Giao dịch nạp tiền đang chờ
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>Mã giao dịch: {pendingTransaction.data.transaction_code}</p>
                        <p>Số tiền: {formatCurrency(pendingTransaction.data.amount)}</p>
                        <p>Hết hạn: {new Date(pendingTransaction.data.expires_at).toLocaleString('vi-VN')}</p>
                        <button
                          onClick={() => window.open(pendingTransaction.data?.payment_url, '_blank')}
                          className="mt-2 inline-flex items-center px-3 py-1 border border-yellow-300 rounded-md text-xs font-medium text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                        >
                          Tiếp tục thanh toán
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Chức năng ví */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-xl border border-teal-100">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-teal-900">Nạp tiền</h3>
                      <p className="text-sm text-teal-700">Nạp tiền vào ví để thanh toán đơn hàng</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDepositModalVisible(true)}
                    className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg hover:bg-teal-600 transition-colors font-medium"
                    disabled={depositMutation.isPending}
                  >
                    {depositMutation.isPending ? "Đang xử lý..." : "Nạp tiền ngay"}
                  </button>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-blue-900">Rút tiền</h3>
                      <p className="text-sm text-blue-700">Rút tiền về tài khoản ngân hàng</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setWithdrawModalVisible(true)}
                    className="w-full bg-white text-blue-500 border border-blue-500 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                    disabled={!walletBalance || walletBalance.balance <= 0 || withdrawMutation.isPending}
                  >
                    {withdrawMutation.isPending ? "Đang xử lý..." : "Rút tiền"}
                  </button>
                </div>
              </div>

              {/* Debug Info - Tạm thời để kiểm tra
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-6">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">Debug Info:</h4>
                <div className="text-xs text-yellow-700 space-y-1">
                  <div>Wallet Loading: {walletLoading ? 'true' : 'false'}</div>
                  <div>Wallet Balance: {walletBalance ? JSON.stringify(walletBalance) : 'null'}</div>
                  <div>Balance Amount: {walletBalance?.balance || 'N/A'}</div>
                </div>
              </div> */}

              {/* Thông tin chi tiết */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin ví</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">10,000 VNĐ</div>
                    <div className="text-sm text-gray-600">Nạp tiền tối thiểu</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">50,000 VNĐ</div>
                    <div className="text-sm text-gray-600">Rút tiền tối thiểu</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">15 phút</div>
                    <div className="text-sm text-gray-600">Thời gian hết hạn giao dịch</div>
                  </div>
                </div>
              </div>

              {/* Lịch sử giao dịch */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Lịch sử giao dịch</h3>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Làm mới →
                  </button>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  {transactionsLoading ? (
                    <div className="text-center text-gray-500 py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
                      <p className="text-sm">Đang tải lịch sử giao dịch...</p>
                    </div>
                  ) : transactions && transactions.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {transactions.slice(0, 5).map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${transaction.status === 'success' ? 'bg-green-500' :
                                transaction.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}></div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {transaction.type === 'deposit' ? 'Nạp tiền' : 'Rút tiền'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {transaction.description}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {new Date(transaction.created_at).toLocaleString('vi-VN')}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                              }`}>
                              {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                            </div>
                            <div className={`text-xs px-2 py-1 rounded-full ${transaction.status === 'success' ? 'bg-green-100 text-green-800' :
                              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                              }`}>
                              {transaction.status === 'success' ? 'Thành công' :
                                transaction.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <svg className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm">Chưa có giao dịch nào</p>
                      <p className="text-xs text-gray-400 mt-1">Các giao dịch sẽ hiển thị ở đây</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "password" && <ChangePasswordForm />}

        {/* Modal Nạp tiền */}
        <Modal
          title="Nạp tiền vào ví"
          open={depositModalVisible}
          onCancel={() => setDepositModalVisible(false)}
          footer={null}
          width={500}
        >
          <Form
            form={depositForm}
            onFinish={handleDeposit}
            layout="vertical"
            className="mt-4"
          >
            <Form.Item
              label="Số tiền nạp"
              name="amount"
              rules={[
                { required: true, message: 'Vui lòng nhập số tiền!' },
                {
                  validator: (_, value) => {
                    const amount = Number(value)
                    if (isNaN(amount) || amount < 10000) {
                      return Promise.reject(new Error('Số tiền tối thiểu là 10,000 VNĐ!'))
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <Input
                type="number"
                placeholder="Nhập số tiền (VNĐ)"
                className="w-full"
                min="10000"
              />
            </Form.Item>
            <div className="flex justify-end space-x-3">
              <Button onClick={() => setDepositModalVisible(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={depositMutation.isPending}
                className="bg-teal-500 hover:bg-teal-600"
              >
                Nạp tiền
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Modal Rút tiền */}
        <Modal
          title="Rút tiền từ ví"
          open={withdrawModalVisible}
          onCancel={() => setWithdrawModalVisible(false)}
          footer={null}
          width={500}
        >
          <Form
            form={withdrawForm}
            onFinish={handleWithdraw}
            layout="vertical"
            className="mt-4"
          >
            <Form.Item
              label="Số tiền rút"
              name="amount"
              rules={[
                { required: true, message: 'Vui lòng nhập số tiền!' },
                {
                  validator: (_, value) => {
                    const amount = Number(value)
                    if (isNaN(amount) || amount < 50000) {
                      return Promise.reject(new Error('Số tiền tối thiểu là 50,000 VNĐ!'))
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <Input
                type="number"
                placeholder="Nhập số tiền (VNĐ)"
                className="w-full"
                min="50000"
              />
            </Form.Item>
            <Form.Item
              label="Tên ngân hàng"
              name="bank_name"
              rules={[{ required: true, message: 'Vui lòng nhập tên ngân hàng!' }]}
            >
              <Input placeholder="VD: Vietcombank, Techcombank..." />
            </Form.Item>
            <Form.Item
              label="Số tài khoản"
              name="bank_account"
              rules={[{ required: true, message: 'Vui lòng nhập số tài khoản!' }]}
            >
              <Input placeholder="Nhập số tài khoản ngân hàng" />
            </Form.Item>
            <Form.Item
              label="Tên chủ tài khoản"
              name="acc_name"
              rules={[{ required: true, message: 'Vui lòng nhập tên chủ tài khoản!' }]}
            >
              <Input placeholder="Nhập tên chủ tài khoản" />
            </Form.Item>
            <div className="flex justify-end space-x-3">
              <Button onClick={() => setWithdrawModalVisible(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={withdrawMutation.isPending}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Rút tiền
              </Button>
            </div>
          </Form>
        </Modal>

      </main>
    </div>
  )
}
