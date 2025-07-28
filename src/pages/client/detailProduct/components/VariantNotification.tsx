import { useEffect, useState } from "react";
import type { Variant } from "../../../../types/product.type";

interface VariantNotificationProps {
    selectedVariant: Variant | null;
    previousVariant: Variant | null;
    isAutoChange: boolean;
}

const VariantNotification = ({ selectedVariant, previousVariant, isAutoChange }: VariantNotificationProps) => {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    useEffect(() => {
        if (isAutoChange && selectedVariant && previousVariant && selectedVariant.id !== previousVariant.id) {
            if (selectedVariant.so_luong > 0) {
                setNotificationMessage("Đã tự động chuyển sang biến thể còn hàng!");
            } else {
                setNotificationMessage("Sản phẩm hiện tại đã hết hàng, đã chọn biến thể khác!");
            }
            setShowNotification(true);

            // Tự động ẩn thông báo sau 3 giây
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
    }, [selectedVariant, previousVariant, isAutoChange]);

    if (!showNotification) return null;

    return (
        <div className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in">
            <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{notificationMessage}</span>
                <button
                    onClick={() => setShowNotification(false)}
                    className="ml-2 text-white hover:text-gray-200"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default VariantNotification; 