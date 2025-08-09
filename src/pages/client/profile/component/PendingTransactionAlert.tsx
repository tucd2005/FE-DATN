import { useEffect, useState } from "react"
import { Alert, Button } from "antd"
import { useCheckPendingTransaction } from "../../../../hooks/useWalletClient"
import { formatCurrency } from "../../../../utils/formatCurrency"

export default function PendingTransactionAlert() {
    const { data: pendingData, isLoading } = useCheckPendingTransaction()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (pendingData?.status === "pending" && pendingData?.data) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }, [pendingData])

    if (!isVisible || isLoading) {
        return null
    }

    const handleContinuePayment = () => {
        if (pendingData?.data?.payment_url) {
            window.open(pendingData.data.payment_url, "_blank")
        }
    }

    const handleDismiss = () => {
        setIsVisible(false)
    }

    return (
        <Alert
            message="Giao dịch nạp tiền đang chờ"
            description={
                <div className="mt-2">
                    <p className="text-sm">
                        Bạn có giao dịch nạp tiền {formatCurrency(pendingData?.data?.amount || 0)} đang chờ xử lý.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Mã giao dịch: {pendingData?.data?.transaction_code}
                    </p>
                    <p className="text-xs text-gray-500">
                        Hết hạn: {pendingData?.data?.expires_at ?
                            new Date(pendingData.data.expires_at).toLocaleString("vi-VN") : "Không xác định"}
                    </p>
                </div>
            }
            type="warning"
            showIcon
            action={
                <div className="flex space-x-2">
                    <Button size="small" type="primary" onClick={handleContinuePayment}>
                        Tiếp tục thanh toán
                    </Button>
                    <Button size="small" onClick={handleDismiss}>
                        Bỏ qua
                    </Button>
                </div>
            }
            className="mb-4"
        />
    )
} 