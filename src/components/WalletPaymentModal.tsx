import React, { useState } from "react";
import { usePayWithWallet } from "../hooks/useWalletPayment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { X, Wallet, AlertCircle, CheckCircle } from "lucide-react";

interface WalletPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: number | string;
    orderCode: string;
    amount: number;
    orderDetails?: any;
}

export const WalletPaymentModal: React.FC<WalletPaymentModalProps> = ({
    isOpen,
    onClose,
    orderId,
    orderCode,
    amount,
    orderDetails,
}) => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const { mutate: payWithWallet } = usePayWithWallet();

    const handleWalletPayment = () => {
        setIsProcessing(true);

        payWithWallet(orderId, {
            onSuccess: (data) => {
                setIsProcessing(false);
                toast.success(data.message || "Thanh toán bằng ví thành công!");

                // Close modal
                onClose();

                // Navigate to success page
                navigate("/cam-on", {
                    state: { orderCode: orderCode }
                });
            },
            onError: (error: any) => {
                setIsProcessing(false);
                if (error?.response?.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Thanh toán ví thất bại! Vui lòng thử lại.");
                }
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-purple-600" />
                        Thanh toán bằng ví
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="mb-4">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center gap-2 text-purple-700 mb-2">
                                <CheckCircle className="w-4 h-4" />
                                <span className="font-medium">Thông tin đơn hàng</span>
                            </div>
                            <p className="text-sm text-purple-600">
                                Mã đơn hàng: <span className="font-mono font-medium">{orderCode}</span>
                            </p>
                            <p className="text-sm text-purple-600">
                                Số tiền: <span className="font-semibold">{amount.toLocaleString('vi-VN')}đ</span>
                            </p>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-yellow-700 mb-2">
                                <AlertCircle className="w-4 h-4" />
                                <span className="font-medium">Lưu ý</span>
                            </div>
                            <ul className="text-sm text-yellow-600 space-y-1">
                                <li>• Số tiền sẽ được trừ trực tiếp từ ví của bạn</li>
                                <li>• Giao dịch sẽ được xử lý ngay lập tức</li>
                                <li>• Đơn hàng sẽ được cập nhật trạng thái "Đã thanh toán"</li>
                            </ul>
                        </div>
                    </div>

                    {orderDetails && (
                        <div className="mb-4">
                            <h3 className="font-medium text-gray-900 mb-2">Chi tiết sản phẩm:</h3>
                            <div className="space-y-2">
                                {orderDetails.items?.map((item: any, index: number) => (
                                    <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                                        <img
                                            src={item.hinh_anh}
                                            alt={item.ten_san_pham}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{item.ten_san_pham}</p>
                                            <p className="text-xs text-gray-600">
                                                Số lượng: {item.so_luong} x {item.don_gia?.toLocaleString('vi-VN')}đ
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-4 border-t">
                    <button
                        onClick={onClose}
                        disabled={isProcessing}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleWalletPayment}
                        disabled={isProcessing}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        {isProcessing ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Đang xử lý...
                            </div>
                        ) : (
                            `Xác nhận thanh toán ${amount.toLocaleString('vi-VN')}đ`
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}; 