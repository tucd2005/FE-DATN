import React from "react";
import { usePayWithWallet } from "../hooks/useWalletPayment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface WalletPaymentButtonProps {
    orderId: number | string;
    orderCode: string;
    amount: number;
    className?: string;
    children?: React.ReactNode;
}

export const WalletPaymentButton: React.FC<WalletPaymentButtonProps> = ({
    orderId,
    orderCode,
    amount,
    className = "",
    children,
}) => {
    const navigate = useNavigate();
    const { mutate: payWithWallet, isPending } = usePayWithWallet();

    const handleWalletPayment = () => {
        payWithWallet(orderId, {
            onSuccess: (data) => {
                toast.success(data.message || "Thanh toán bằng ví thành công!");
                // Invalidate wallet balance queries
                // queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
                // queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });

                // Navigate to success page
                navigate("/cam-on", {
                    state: { orderCode: orderCode }
                });
            },
            onError: (error: any) => {
                if (error?.response?.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Thanh toán ví thất bại! Vui lòng thử lại.");
                }
            },
        });
    };

    return (
        <button
            onClick={handleWalletPayment}
            disabled={isPending}
            className={`bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg transition-colors ${className}`}
        >
            {isPending ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang xử lý...
                </div>
            ) : (
                children || `Thanh toán ${amount.toLocaleString('vi-VN')}đ bằng ví`
            )}
        </button>
    );
}; 