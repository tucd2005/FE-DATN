import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';


interface PaymentFailedData {
    transaction_code: string;
    response_code: string;
    message: string;
}

export default function PaymentFailedPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [paymentData, setPaymentData] = useState<PaymentFailedData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const transactionCode = searchParams.get('vnp_TxnRef');
        const responseCode = searchParams.get('vnp_ResponseCode');
        const message = searchParams.get('message') || searchParams.get('vnp_Message');

        if (transactionCode) {
            const failedData = {
                transaction_code: transactionCode,
                response_code: responseCode || 'Unknown',
                message: message || 'Giao dịch thất bại'
            };

            setPaymentData(failedData);

            // Lưu thông tin lỗi vào localStorage
            localStorage.setItem('lastPaymentFailed', JSON.stringify({
                ...failedData,
                timestamp: new Date().toISOString()
            }));
        } else {
            // Kiểm tra localStorage nếu không có params
            const lastFailed = localStorage.getItem('lastPaymentFailed');
            if (lastFailed) {
                try {
                    const failedInfo = JSON.parse(lastFailed);
                    const failedTime = new Date(failedInfo.timestamp);
                    const now = new Date();
                    const diffHours = (now.getTime() - failedTime.getTime()) / (1000 * 60 * 60);

                    if (diffHours < 1) {
                        setPaymentData(failedInfo);
                    }
                } catch (error) {
                    console.error('Error parsing failed payment data:', error);
                }
            }
        }
        setLoading(false);
    }, [searchParams]);

    const handleRetryPayment = () => {
        navigate('/profile?tab=wallet');
    };

    const handleGoHome = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                {/* Failed Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 px-8 py-12 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                            <div className="h-12 w-12 text-white text-4xl font-bold">✕</div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {paymentData?.message || 'Thanh toán thất bại'}
                        </h1>
                        <p className="text-red-100 text-lg">
                            Giao dịch của bạn không thể hoàn thành
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {paymentData ? (
                            <>
                                {/* Error Message */}
                                <div className="text-center mb-8">
                                    <div className="text-2xl font-bold text-gray-900 mb-2">
                                        {paymentData.message}
                                    </div>
                                    <p className="text-gray-600">
                                        Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục
                                    </p>
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
                                            <span className="text-gray-600">Mã lỗi:</span>
                                            <span className="font-medium text-gray-900">
                                                {paymentData.response_code}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Thời gian:</span>
                                            <span className="font-medium text-gray-900">
                                                {new Date().toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Trạng thái:</span>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                Thất bại
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Help Box */}
                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-yellow-800">
                                                Có thể do các nguyên nhân sau:
                                            </h3>
                                            <div className="mt-2 text-sm text-yellow-700">
                                                <ul className="list-disc list-inside space-y-1">
                                                    <li>Số dư tài khoản ngân hàng không đủ</li>
                                                    <li>Thông tin thẻ không chính xác</li>
                                                    <li>Giao dịch bị từ chối bởi ngân hàng</li>
                                                    <li>Kết nối mạng không ổn định</li>
                                                </ul>
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
                                onClick={handleRetryPayment}
                                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
                            >
                                Thử lại
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
                        Nếu bạn cần hỗ trợ, vui lòng liên hệ với chúng tôi qua email hoặc hotline.
                    </p>
                </div>
            </div>
        </div>
    );
} 