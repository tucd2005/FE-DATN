import { useWalletBalance } from "../../../../hooks/useWalletClient"
import { formatCurrency } from "../../../../utils/formatCurrency"

export default function WalletInfo() {
    const { data: walletBalance, isLoading } = useWalletBalance()

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Số dư ví</h3>
                        <p className="text-teal-100 text-sm">Tài khoản của bạn</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold">
                        {formatCurrency(walletBalance?.balance || 0)}
                    </div>
                    <div className="text-teal-100 text-sm">VNĐ</div>
                </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="text-teal-100">Trạng thái</div>
                        <div className="font-semibold">Hoạt động</div>
                    </div>
                    <div>
                        <div className="text-teal-100">Cập nhật</div>
                        <div className="font-semibold">
                            {walletBalance?.updated_at 
                                ? new Date(walletBalance.updated_at).toLocaleDateString('vi-VN')
                                : 'Chưa có'
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 