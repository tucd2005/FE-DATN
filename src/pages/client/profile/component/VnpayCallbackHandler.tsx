import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Result, Button, Spin } from "antd"
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons"
import { message } from "antd"

export default function VnpayCallbackHandler() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [messageText, setMessageText] = useState("")

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const vnpResponseCode = searchParams.get("vnp_ResponseCode")
                const vnpTxnRef = searchParams.get("vnp_TxnRef")
                const vnpAmount = searchParams.get("vnp_Amount")
                const vnpOrderInfo = searchParams.get("vnp_OrderInfo")

                if (vnpResponseCode === "00") {
                    // Thanh toán thành công
                    setStatus("success")
                    setMessageText("Nạp tiền thành công!")

                    // Lưu thông tin thanh toán vào localStorage để hiển thị thông báo
                    const paymentInfo = {
                        message: "Nạp tiền thành công!",
                        amount: vnpAmount ? parseInt(vnpAmount) / 100 : 0,
                        transaction_code: vnpTxnRef,
                        created_at: new Date().toISOString()
                    }
                    localStorage.setItem("lastPaymentSuccess", JSON.stringify(paymentInfo))

                    message.success("Nạp tiền thành công!")
                } else {
                    // Thanh toán thất bại
                    setStatus("error")
                    setMessageText("Nạp tiền thất bại!")
                    message.error("Nạp tiền thất bại!")
                }
            } catch (error) {
                console.error("Error handling VNPay callback:", error)
                setStatus("error")
                setMessageText("Có lỗi xảy ra khi xử lý thanh toán!")
                message.error("Có lỗi xảy ra khi xử lý thanh toán!")
            }
        }

        handleCallback()
    }, [searchParams])

    const handleBackToWallet = () => {
        navigate("/profile?tab=wallet")
    }

    const handleBackToHome = () => {
        navigate("/")
    }

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Spin
                        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
                        size="large"
                    />
                    <p className="mt-4 text-lg text-gray-600">Đang xử lý thanh toán...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full">
                <Result
                    status={status === "success" ? "success" : "error"}
                    icon={status === "success" ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                    title={status === "success" ? "Thanh toán thành công!" : "Thanh toán thất bại!"}
                    subTitle={messageText}
                    extra={[
                        <Button
                            type="primary"
                            key="wallet"
                            onClick={handleBackToWallet}
                            className="bg-teal-500 hover:bg-teal-600 border-teal-500"
                        >
                            Về ví điện tử
                        </Button>,
                        <Button
                            key="home"
                            onClick={handleBackToHome}
                        >
                            Về trang chủ
                        </Button>
                    ]}
                />
            </div>
        </div>
    )
} 