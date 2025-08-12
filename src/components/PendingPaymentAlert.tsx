import React from "react";
import { useCheckPendingPayment } from "../hooks/useWalletPayment";
import { WalletPaymentButton } from "./WalletPaymentButton";
import { AlertTriangle, Clock, CreditCard } from "lucide-react";

export const PendingPaymentAlert: React.FC = () => {
    const { data: pendingPayment, isLoading, error } = useCheckPendingPayment();

    if (isLoading) {
        return (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-blue-700">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    Đang kiểm tra đơn hàng...
                </div>
            </div>
        );
    }

    if (error || !pendingPayment || pendingPayment.status === "ok") {
        return null;
    }

    if (pendingPayment.status === "need_payment") {
        const expiresAt = pendingPayment.expires_at ? new Date(pendingPayment.expires_at) : null;
        const isExpired = expiresAt && expiresAt < new Date();

        if (isExpired) {
            return (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-red-700">
                        <AlertTriangle className="w-5 h-5" />
                        <div>
                            <p className="font-medium">Đơn hàng {pendingPayment.ma_don_hang} đã hết hạn thanh toán!</p>
                            <p className="text-sm">Vui lòng đặt hàng lại hoặc liên hệ hỗ trợ.</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-yellow-800">
                                Đơn hàng {pendingPayment.ma_don_hang} cần thanh toán
                            </h3>
                            {expiresAt && (
                                <span className="text-sm text-yellow-600">
                                    Hết hạn: {expiresAt.toLocaleString('vi-VN')}
                                </span>
                            )}
                        </div>
                        <p className="text-yellow-700 mb-3">
                            Số tiền cần thanh toán: <span className="font-semibold">
                                {pendingPayment.amount?.toLocaleString('vi-VN')}đ
                            </span>
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {pendingPayment.payment_link && (
                                <a
                                    href={pendingPayment.payment_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
                                >
                                    <CreditCard className="w-4 h-4" />
                                    Thanh toán online
                                </a>
                            )}

                            <WalletPaymentButton
                                orderId={pendingPayment.order_id || 0}
                                orderCode={pendingPayment.ma_don_hang || ""}
                                amount={pendingPayment.amount || 0}
                                className="text-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <CreditCard className="w-4 h-4" />
                                    Thanh toán bằng ví
                                </div>
                            </WalletPaymentButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}; 