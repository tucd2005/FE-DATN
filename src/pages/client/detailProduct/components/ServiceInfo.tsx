const ServiceInfo = () => {
    const TruckIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );

    const ShieldIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
        </svg>
    );

    const RotateIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
        </svg>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
            {/* <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TruckIcon />
                </div>
                <div>
                    <p className="font-semibold text-gray-900">Miễn phí vận chuyển</p>
                    <p className="text-sm text-gray-600">Đơn hàng từ 500k</p>
                </div>
            </div> */}
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <ShieldIcon />
                </div>
                <div>
                    <p className="font-semibold text-gray-900">Bảo hành chính hãng</p>
                    <p className="text-sm text-gray-600">12 tháng</p>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <RotateIcon />
                </div>
                <div>
                    <p className="font-semibold text-gray-900">Đổi trả dễ dàng</p>
                    <p className="text-sm text-gray-600">Trong 30 ngày</p>
                </div>
            </div>
        </div>
    );
};

export default ServiceInfo; 