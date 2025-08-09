import { useState } from "react"
import WalletHeader from "./WalletHeader"
import WalletActions from "./WalletActions"
import WalletInfo from "./WalletInfo"
import WalletStats from "./WalletStats"
import TransactionHistory from "./TransactionHistory"
import DepositModal from "./DepositModal"
import WithdrawModal from "./WithdrawModal"
import PendingTransactionAlert from "./PendingTransactionAlert"

export default function WalletTab() {
    const [depositModalVisible, setDepositModalVisible] = useState(false)
    const [withdrawModalVisible, setWithdrawModalVisible] = useState(false)

    const handleDepositSuccess = () => {
        setDepositModalVisible(false)
        // Refresh data
        window.location.reload()
    }

    const handleWithdrawSuccess = () => {
        setWithdrawModalVisible(false)
        // Refresh data
        window.location.reload()
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <WalletHeader />
            <div className="p-8">
                <PendingTransactionAlert />
                <WalletActions
                    onDepositClick={() => setDepositModalVisible(true)}
                    onWithdrawClick={() => setWithdrawModalVisible(true)}
                />
                <WalletInfo />
                <WalletStats />
                <TransactionHistory className="mt-8" />
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