import { useWalletBalance } from "../../../../hooks/useWalletClient"
import { formatCurrency } from "../../../../utils/formatCurrency"

export default function WalletHeader() {
    const { data: walletBalance, isLoading: walletLoading } = useWalletBalance()

    return (
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
    )
} 