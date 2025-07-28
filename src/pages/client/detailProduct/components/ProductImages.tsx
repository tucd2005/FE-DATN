import type { Variant } from "../../../../types/product.type";

interface ProductImagesProps {
    productImages: string[];
    variantThumbnails: Variant[];
    selectedImage: number;
    setSelectedImage: (index: number) => void;
    handleSelectVariantImage: (variant: Variant, index: number) => void;
    getVariantImage: (hinh_anh: string | string[] | undefined | null) => string;
    selectedVariant: Variant | null;
}

const ProductImages = ({
    productImages,
    variantThumbnails,
    selectedImage,
    setSelectedImage,
    handleSelectVariantImage,
    getVariantImage,
    selectedVariant,
}: ProductImagesProps) => {
    const ChevronLeftIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
    );

    const ChevronRightIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    );

    const mainImage =
        selectedVariant?.hinh_anh
            ? getVariantImage(selectedVariant.hinh_anh)
            : productImages[selectedImage ?? 0] || "/placeholder.svg";

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gray-50 rounded-lg overflow-hidden">
                <img
                    src={mainImage}
                    alt="Product"
                    className="aspect-[4/3] object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    -25%
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : productImages.length - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                >
                    <ChevronLeftIcon />
                </button>
                <button
                    onClick={() => setSelectedImage(selectedImage < productImages.length - 1 ? selectedImage + 1 : 0)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                >
                    <ChevronRightIcon />
                </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
                {variantThumbnails.map((variant, idx) => {
                    const img = getVariantImage(variant.hinh_anh);
                    const color = variant.thuoc_tinh.find(a => a.ten === "Màu sắc")?.gia_tri || "";
                    const size = variant.thuoc_tinh.find(a => a.ten === "Kích cỡ")?.gia_tri || "";
                    const isActive = selectedVariant?.id === variant.id;
                    return (
                        <button
                            key={variant.id}
                            onClick={() => handleSelectVariantImage(variant, idx)}
                            className={`border-2 rounded-lg overflow-hidden transition-colors ${isActive ? "border-blue-500" : "border-gray-200 hover:border-gray-300"}`}
                            title={`Màu: ${color}, Size: ${size}`}
                        >
                            <img src={img} alt={`Variant ${idx + 1}`} className="aspect-square w-full object-cover rounded" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductImages; 