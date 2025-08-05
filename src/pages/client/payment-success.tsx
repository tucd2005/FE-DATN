import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { formatCurrency } from '../../utils/formatCurrency';
import { useQueryClient } from '@tanstack/react-query';

interface PaymentSuccessData {
    transaction_code: string;
    amount: number;
    status: string;
    payment_method: string;
    created_at: string;
    message: string;
}

export default function PaymentSuccessPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const [paymentData, setPaymentData] = useState<PaymentSuccessData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lấy thông tin từ URL params
        const transactionCode = searchParams.get('vnp_TxnRef');
        const amount = searchParams.get('vnp_Amount');
        const status = searchParams.get('vnp_ResponseCode');
        const message = searchParams.get('message') || searchParams.get('vnp_Message');

        // Kiểm tra nếu thanh toán thành công
        if (transactionCode && amount && status === '00') {
            const paymentInfo = {
                transaction_code: transactionCode,
                amount: Number(amount) / 100, // VNPay trả về số tiền nhân 100
                status: 'success',
                payment_method: 'VNPay',
                created_at: new Date().toISOString(),
                message: message || 'Nạp tiền thành công'
            };

            setPaymentData(paymentInfo);

            // Lưu thông tin giao dịch vào localStorage để hiển thị
            localStorage.setItem('lastPaymentSuccess', JSON.stringify(paymentInfo));

            // Tự động refresh số dư ví và pending transaction
            queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
            queryClient.invalidateQueries({ queryKey: ["pending-transaction"] });
            queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
        } else {
            // Nếu không có params hoặc không thành công, kiểm tra localStorage
            const lastPayment = localStorage.getItem('lastPaymentSuccess');
            if (lastPayment) {
                try {
                    const paymentInfo = JSON.parse(lastPayment);
                    // Chỉ hiển thị nếu giao dịch trong vòng 1 giờ
                    const paymentTime = new Date(paymentInfo.created_at);
                    const now = new Date();
                    const diffHours = (now.getTime() - paymentTime.getTime()) / (1000 * 60 * 60);

                    if (diffHours < 1) {
                        setPaymentData(paymentInfo);
                    }
                } catch (error) {
                    console.error('Error parsing payment data:', error);
                }
            }
        }
        setLoading(false);
    }, [searchParams, queryClient]);

    const handleGoToWallet = () => {
        navigate('/profile?tab=wallet');
    };

    const handleGoHome = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                {/* Success Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-12 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                            <div className="h-12 w-12 text-white text-4xl font-bold">✓</div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {paymentData?.message || 'Nạp tiền thành công!'}
                        </h1>
                        <p className="text-green-100 text-lg">
                            Giao dịch của bạn đã được xử lý thành công
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {paymentData ? (
                            <>
                                {/* Amount Display */}
                                <div className="text-center mb-8">
                                    <div className="text-4xl font-bold text-gray-900 mb-2">
                                        {formatCurrency(paymentData.amount)}
                                    </div>
                                    <p className="text-gray-600">Số tiền đã nạp vào ví</p>
                                </div>

                                {/* Transaction Details */}
                                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Chi tiết giao dịch
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Mã giao dịch:</span>
                                            <span className="font-medium text-gray-900">
                                                {paymentData.transaction_code}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Phương thức:</span>
                                            <span className="font-medium text-gray-900">
                                                {paymentData.payment_method}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Thời gian:</span>
                                            <span className="font-medium text-gray-900">
                                                {new Date(paymentData.created_at).toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Trạng thái:</span>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Thành công
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Box */}
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-blue-800">
                                                Số dư đã được cập nhật
                                            </h3>
                                            <div className="mt-2 text-sm text-blue-700">
                                                <p>
                                                    Số tiền {formatCurrency(paymentData.amount)} đã được thêm vào ví của bạn.
                                                    Bạn có thể sử dụng để thanh toán đơn hàng ngay bây giờ.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-gray-500 mb-4">
                                    Không tìm thấy thông tin giao dịch
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleGoToWallet}
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
                            >
                                Xem ví của tôi
                            </button>
                            <button
                                onClick={handleGoHome}
                                className="flex-1 bg-white text-gray-700 border border-gray-300 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                            >
                                Về trang chủ
                            </button>
                        </div>

                        {/* Back Button */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => navigate(-1)}
                                className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <span className="mr-2">←</span>
                                Quay lại
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>
                        Nếu bạn có thắc mắc về giao dịch này, vui lòng liên hệ với chúng tôi qua email hoặc hotline.
                    </p>
                </div>
            </div>
        </div>
    );
} 