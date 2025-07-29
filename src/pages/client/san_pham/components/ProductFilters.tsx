import { Filter, Tag, Search } from "lucide-react";

interface ProductFiltersProps {
    keyword: string;
    selectedCategoryId: number | null;
    onSearch: (keyword: string) => void;
    onCategoryFilter: (categoryId: number | null) => void;
    priceRange: [number, number];
    onPriceRangeChange: (range: [number, number]) => void;
}

const ProductFilters = ({
    keyword,
    selectedCategoryId,
    onSearch,
    onCategoryFilter,
    priceRange,
    onPriceRangeChange,
}: ProductFiltersProps) => {
    const categories = [
        { id: null, name: "Tất cả" },
        { id: 1, name: "Áo thể thao" },
        { id: 2, name: "Giày thể thao" },
        { id: 3, name: "Quần thể thao" },
        { id: 4, name: "Áo khoác" },
        { id: 5, name: "Đồ yoga" },
        { id: 6, name: "Phụ kiện" },
    ];

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

                {/* Search */}
                <div className="mb-6">
                    <h4 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Search className="w-4 h-4 text-blue-500" />
                        Tìm kiếm
                    </h4>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder="Tìm kiếm sản phẩm..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                </div>

                {/* Categories */}
                <div className="mb-8">
                    <h4 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-teal-500" />
                        Danh mục
                    </h4>
                    <div className="space-y-3">
                        {categories.map((category) => (
                            <label key={category.id || 'all'} className="flex items-center cursor-pointer group">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategoryId === category.id}
                                    onChange={() => onCategoryFilter(category.id)}
                                    className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500 focus:ring-2"
                                />
                                <span className="ml-3 text-gray-700 group-hover:text-teal-600 transition-colors font-medium">
                                    {category.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-4">Khoảng giá</h4>
                    <div className="relative">
                        <input
                            type="range"
                            min="0"
                            max="4000000"
                            step="100000"
                            value={priceRange[1]}
                            onChange={(e) => onPriceRangeChange([priceRange[0], Number.parseInt(e.target.value)])}
                            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
                        />
                        <div className="flex justify-between text-sm font-medium text-gray-600 mt-3">
                            <span className="bg-gray-100 px-2 py-1 rounded-md">0đ</span>
                            <span className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-2 py-1 rounded-md">
                                {formatPrice(priceRange[1])}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFilters; 