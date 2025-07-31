interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, lastPage, onPageChange }: PaginationProps) => {
    if (lastPage <= 1) return null;

    return (
        <div className="flex justify-end mt-10 px-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow border border-gray-200">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold border border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500 disabled:opacity-40"
                >
                    &lt;
                </button>

                {/* Page Numbers */}
                {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200
              ${page === currentPage
                                ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow"
                                : "border border-gray-300 text-gray-700 hover:border-teal-500 hover:text-teal-600"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(Math.min(lastPage, currentPage + 1))}
                    disabled={currentPage === lastPage}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold border border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500 disabled:opacity-40"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Pagination; 