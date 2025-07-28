const LoadingSpinner = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
                <p className="text-gray-600 font-semibold">Đang tải sản phẩm...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner; 