import { useWalletBalance } from "../../../../hooks/useWalletClient"
import { formatCurrency } from "../../../../utils/formatCurrency"

export default function WalletInfo() {
    const { data: walletBalance, isLoading: walletLoading } = useWalletBalance()

    return (
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
    )
} 