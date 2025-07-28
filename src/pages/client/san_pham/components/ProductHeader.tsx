import { Grid3X3, List, ChevronDown } from "lucide-react";

interface ProductHeaderProps {
    totalProducts: number;
    sortBy: string;
    viewMode: "grid" | "list";
    onSortChange: (sortBy: string) => void;
    onViewModeChange: (viewMode: "grid" | "list") => void;
}

const ProductHeader = ({
    totalProducts,
    sortBy,
    viewMode,
    onSortChange,
    onViewModeChange,
}: ProductHeaderProps) => {
    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Sản phẩm thể thao</h1>
                <p className="text-gray-600 font-medium">
                    <span className="text-teal-600 font-bold">{totalProducts}</span> sản phẩm được tìm thấy
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 shadow-sm font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                        <option>Phổ biến nhất</option>
                        <option>Giá thấp đến cao</option>
                        <option>Giá cao đến thấp</option>
                        <option>Mới nhất</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
                    <button
                        onClick={() => onViewModeChange("grid")}
                        className={`p-3 transition-colors duration-200 ${viewMode === "grid"
                                ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white"
                                : "bg-transparent text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        <Grid3X3 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onViewModeChange("list")}
                        className={`p-3 transition-colors duration-200 ${viewMode === "list"
                                ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white"
                                : "bg-transparent text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductHeader; 