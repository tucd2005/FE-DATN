import { useState } from "react"
import WalletHeader from "./WalletHeader"
import WalletActions from "./WalletActions"
import WalletInfo from "./WalletInfo"
import TransactionHistory from "./TransactionHistory"
import DepositModal from "./DepositModal"
import WithdrawModal from "./WithdrawModal"

export default function WalletTab() {
    const [depositModalVisible, setDepositModalVisible] = useState(false)
    const [withdrawModalVisible, setWithdrawModalVisible] = useState(false)

    const handleDepositSuccess = () => {
        // Có thể thêm logic refresh data ở đây
        window.location.reload()
    }

    const handleWithdrawSuccess = () => {
        // Có thể thêm logic refresh data ở đây
        window.location.reload()
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <WalletHeader />
            <div className="p-8">
                <WalletActions
                    onDepositClick={() => setDepositModalVisible(true)}
                    onWithdrawClick={() => setWithdrawModalVisible(true)}
                />
                <WalletInfo />
                <TransactionHistory />
            </div>

            <DepositModal
                visible={depositModalVisible}
                onCancel={() => setDepositModalVisible(false)}
                onSuccess={handleDepositSuccess}
            />

            <WithdrawModal
                visible={withdrawModalVisible}
                onCancel={() => setWithdrawModalVisible(false)}
                onSuccess={handleWithdrawSuccess}
            />
        </div>
    )
} 