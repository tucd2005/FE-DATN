import { Grid3X3, List } from "lucide-react";

interface ProductHeaderProps {
    totalProducts: number;
    viewMode: "grid" | "list";
    onViewModeChange: (viewMode: "grid" | "list") => void;
}

const ProductHeader = ({
    totalProducts,
    viewMode,
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