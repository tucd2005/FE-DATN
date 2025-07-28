import ProductCard from "./ProductCard";
import type { Product } from "../../types/product.type";

interface ProductGridProps {
    products: Product[];
    viewMode: "grid" | "list";
    favorites: number[];
    onToggleFavorite: (productId: number) => void;
}

const ProductGrid = ({ products, viewMode, favorites, onToggleFavorite }: ProductGridProps) => {
    return (
        <div className={`grid gap-6 min-h-[600px] ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
};

export default ProductGrid; 