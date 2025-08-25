import ProductCard from "./ProductCard";
import type { Product } from "../../../../types/product.type";

interface ProductGridProps {
    products: Product[];
    viewMode: "grid" | "list";
    favorites: number[];
    onToggleFavorite: (productId: number) => void;
}

const ProductGrid = ({ products, viewMode, favorites, onToggleFavorite }: ProductGridProps) => {
    if (products?.length === 0) {
        return (
            <div className="min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Không tìm thấy sản phẩm</h3>
                    <p className="text-gray-600">Thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`grid gap-6 min-h-[600px] ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {products?.map((product) => (
                <ProductCard
                    key={product?.id}
                    product={product}
                    isFavorite={favorites?.includes(product?.id)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
};

export default ProductGrid; 