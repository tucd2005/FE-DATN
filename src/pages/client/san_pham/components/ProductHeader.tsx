import { Grid3X3, List, ChevronDown } from "lucide-react";

interface ProductHeaderProps {
    totalProducts: number;
    sortBy: string;
    sortOrder: string;
    viewMode: "grid" | "list";
    onSort: (sortBy: string, sortOrder: string) => void;
    onViewModeChange: (viewMode: "grid" | "list") => void;
}

const ProductHeader = ({
    totalProducts,
    sortBy,
    sortOrder,
    viewMode,
    onSort,
    onViewModeChange,
}: ProductHeaderProps) => {
    const handleSortChange = (value: string) => {
        let newSortBy = "created_at";
        let newSortOrder = "desc";

        switch (value) {
            case "Phổ biến nhất":
                newSortBy = "created_at";
                newSortOrder = "desc";
                break;
            case "Giá thấp đến cao":
                newSortBy = "variants_min_gia";
                newSortOrder = "asc";
                break;
            case "Giá cao đến thấp":
                newSortBy = "variants_min_gia";
                newSortOrder = "desc";
                break;
            case "Mới nhất":
                newSortBy = "created_at";
                newSortOrder = "desc";
                break;
            case "Tên A-Z":
                newSortBy = "ten";
                newSortOrder = "asc";
                break;
            case "Tên Z-A":
                newSortBy = "ten";
                newSortOrder = "desc";
                break;
        }

        onSort(newSortBy, newSortOrder);
    };

    const getDisplayValue = () => {
        if (sortBy === "created_at" && sortOrder === "desc") return "Phổ biến nhất";
        if (sortBy === "variants_min_gia" && sortOrder === "asc") return "Giá thấp đến cao";
        if (sortBy === "variants_min_gia" && sortOrder === "desc") return "Giá cao đến thấp";
        if (sortBy === "ten" && sortOrder === "asc") return "Tên A-Z";
        if (sortBy === "ten" && sortOrder === "desc") return "Tên Z-A";
        return "Phổ biến nhất";
    };

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
                        value={getDisplayValue()}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 shadow-sm font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                        <option>Phổ biến nhất</option>
                        <option>Giá thấp đến cao</option>
                        <option>Giá cao đến thấp</option>
                        <option>Tên A-Z</option>
                        <option>Tên Z-A</option>
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