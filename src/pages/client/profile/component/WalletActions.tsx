import { useWalletBalance, useWalletWithdraw } from "../../../../hooks/useWalletClient"
import { formatCurrency } from "../../../../utils/formatCurrency"

interface WalletActionsProps {
    onDepositClick: () => void
    onWithdrawClick: () => void
}

export default function WalletActions({ onDepositClick, onWithdrawClick }: WalletActionsProps) {
    const { data: walletBalance, isLoading: walletLoading } = useWalletBalance()
    const { isPending: withdrawPending } = useWalletWithdraw()

    return (
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
                    onClick={onDepositClick}
                    className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg hover:bg-teal-600 transition-colors font-medium"
                >
                    Nạp tiền ngay
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
                    onClick={onWithdrawClick}
                    className="w-full bg-white text-blue-500 border border-blue-500 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                    disabled={!walletBalance || walletBalance.balance <= 0 || withdrawPending}
                >
                    {withdrawPending ? "Đang xử lý..." : "Rút tiền"}
                </button>
            </div>
        </div>
    )
} 