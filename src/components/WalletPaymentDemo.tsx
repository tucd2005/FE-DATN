import React, { useState } from "react";
import { WalletPaymentButton } from "./WalletPaymentButton";
import { PendingPaymentAlert } from "./PendingPaymentAlert";
import { WalletPaymentModal } from "./WalletPaymentModal";

export const WalletPaymentDemo: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Demo data
    const demoOrder = {
        id: 123,
        ma_don_hang: "DH123456",
        amount: 500000,
        items: [
            {
                ten_san_pham: "Áo thun thể thao",
                hinh_anh: "https://via.placeholder.com/100x100",
                so_luong: 2,
                don_gia: 250000
            }
        ]
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Demo Wallet Payment Components
            </h1>

            {/* Pending Payment Alert */}
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold mb-4">1. Pending Payment Alert</h2>
                <PendingPaymentAlert />
            </div>

            {/* Wallet Payment Button */}
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold mb-4">2. Wallet Payment Button</h2>
                <div className="space-y-3">
                    <WalletPaymentButton
                        orderId={demoOrder.id}
                        orderCode={demoOrder.ma_don_hang}
                        amount={demoOrder.amount}
                    />

                    <WalletPaymentButton
                        orderId={demoOrder.id}
                        orderCode={demoOrder.ma_don_hang}
                        amount={demoOrder.amount}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        Thanh toán nhanh bằng ví
                    </WalletPaymentButton>
                </div>
            </div>

            {/* Wallet Payment Modal */}
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold mb-4">3. Wallet Payment Modal</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                    Mở Modal Thanh Toán Ví
                </button>
            </div>

            {/* Usage Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Hướng dẫn sử dụng:</h3>
                <div className="text-blue-700 space-y-2">
                    <p>• <strong>PendingPaymentAlert:</strong> Tự động hiển thị khi có đơn hàng chờ thanh toán</p>
                    <p>• <strong>WalletPaymentButton:</strong> Có thể tùy chỉnh style và text</p>
                    <p>• <strong>WalletPaymentModal:</strong> Modal xác nhận thanh toán với thông tin chi tiết</p>
                    <p>• Tất cả components đều sử dụng hooks mới từ <code>useWalletPayment</code></p>
                </div>
            </div>

            {/* Modal */}
            <WalletPaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                orderId={demoOrder.id}
                orderCode={demoOrder.ma_don_hang}
                amount={demoOrder.amount}
                orderDetails={demoOrder}
            />
        </div>
    );
}; 