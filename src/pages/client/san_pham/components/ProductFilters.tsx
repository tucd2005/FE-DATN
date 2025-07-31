import { Filter, Tag, Zap } from "lucide-react";
import { useCategoriesClient } from "../../../../hooks/useCategoryClient";

interface ProductFiltersProps {
    selectedCategories: string[];
    priceRange: [number, number];
    onCategoryChange: (category: string) => void;
    onPriceRangeChange: (range: [number, number]) => void;
    onResetFilters: () => void;
}

const ProductFilters = ({
    selectedCategories,
    priceRange,
    onCategoryChange,
    onPriceRangeChange,
    onResetFilters,
}: ProductFiltersProps) => {
    const { 
        data: categories = [], 
        isLoading: categoriesLoading 
    } = useCategoriesClient();

    const formatPrice = (price?: string | number) => {
        const num = Number(price);
        if (!isNaN(num)) return num.toLocaleString("vi-VN") + "đ";
        return "0đ";
    };
    return (
        <div className="w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg">
                        <Filter className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Bộ lọc</h3>
                </div>

                {/* Categories */}
                <div className="mb-8">
                    <h4 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-teal-500" />
                        Danh mục
                    </h4>
                    <div className="space-y-3">
                        {categoriesLoading ? (
                            <div className="flex items-center justify-center py-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
                            </div>
                        ) : (
                            <>
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes("Tất cả")}
                                        onChange={() => onCategoryChange("Tất cả")}
                                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                                    />
                                    <span className="ml-3 text-gray-700 group-hover:text-teal-600 transition-colors font-medium">
                                        Tất cả
                                    </span>
                                </label>
                                {categories?.data.map((category: any) => (
                                    <label key={category.id} className="flex items-center cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category.id.toString())}
                                            onChange={() => onCategoryChange(category.id.toString())}
                                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                                        />
                                        <span className="ml-3 text-gray-700 group-hover:text-teal-600 transition-colors font-medium">
                                            {category.ten}
                                        </span>
                                    </label>
                                ))}
                            </>
                        )}
                    </div>
                </div>



                {/* Price */}
                <div className="mb-8">
                    <h4 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-teal-500" />
                        Khoảng giá
                    </h4>
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="range"
                                min="0"
                                max="4000000"
                                step="100000"
                                value={priceRange[1]}
                                onChange={(e) => onPriceRangeChange([priceRange[0], Number.parseInt(e.target.value)])}
                                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer appearance-none"
                                style={{
                                    background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${(priceRange[1] / 4000000) * 100}%, #d1d5db ${(priceRange[1] / 4000000) * 100}%, #d1d5db 100%)`
                                }}
                            />
                            <div className="flex justify-between text-sm font-medium text-gray-600 mt-3">
                                <span className="bg-gray-100 px-2 py-1 rounded-md">0đ</span>
                                <span className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-2 py-1 rounded-md">
                                    {formatPrice(priceRange[1])}
                                </span>
                            </div>
                        </div>

                        {/* Reset Filters Button */}
                        <button
                            onClick={onResetFilters}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFilters; 