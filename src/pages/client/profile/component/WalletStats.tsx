import { useWalletTransactions } from "../../../../hooks/useWalletClient"

export default function WalletStats() {
    const { data: transactions } = useWalletTransactions()

    // Calculate stats
    const totalTransactions = transactions?.length || 0
    const successfulDeposits = transactions?.filter(t => t.type === 'deposit' && t.status === 'success').length || 0
    const pendingTransactions = transactions?.filter(t => t.status === 'pending').length || 0
    const totalDeposited = transactions
        ?.filter(t => t.type === 'deposit' && t.status === 'success')
        .reduce((sum, t) => sum + t.amount, 0) || 0

    const stats = [
        {
            label: "Tổng giao dịch",
            value: totalTransactions,
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            label: "Nạp thành công",
            value: successfulDeposits,
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            ),
            color: "text-green-600",
            bgColor: "bg-green-50"
        },
        {
            label: "Đang chờ",
            value: pendingTransactions,
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "text-orange-600",
            bgColor: "bg-orange-50"
        },

    ]

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Thống kê ví</h3>
                <div className="text-sm text-gray-500">
                    Cập nhật lần cuối: {new Date().toLocaleTimeString('vi-VN')}
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className={`${stat.bgColor} p-4 rounded-xl border`}>
                        <div className="flex items-center justify-between mb-3">
                            <div className={`${stat.color} p-2 rounded-lg bg-white/50`}>
                                {stat.icon}
                            </div>
                            <div className={`text-2xl font-bold ${stat.color}`}>
                                {stat.value}
                            </div>
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-200">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="text-sm text-teal-700">
                        <div className="font-medium">Thông tin bổ sung</div>
                        <div className="text-xs text-teal-600 mt-1">
                            • Giao dịch nạp tiền sẽ hết hạn sau 15 phút<br />
                            • Rút tiền cần admin duyệt trong vòng 24h<br />
                            • Số dư có thể dùng để thanh toán đơn hàng
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 