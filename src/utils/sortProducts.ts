import type { Product } from "../types/product.type";

/**
 * Lấy giá hiển thị của sản phẩm (ưu tiên giá khuyến mãi nếu có)
 */
export const getDisplayPrice = (product: Product): number => {
  // Nếu có giá khuyến mãi và nhỏ hơn giá gốc, sử dụng giá khuyến mãi
  const giaGoc = Number(product.gia) || 0;
  const giaKhuyenMai = Number(product.gia_khuyen_mai) || 0;

  // Nếu có variants, lấy giá thấp nhất từ variants
  if (product.variants && product.variants.length > 0) {
    const minVariantPrice = Math.min(
      ...product.variants.map((variant) => {
        const variantGiaGoc = Number(variant.gia) || 0;
        const variantGiaKhuyenMai = Number(variant.gia_khuyen_mai) || 0;
        return variantGiaKhuyenMai > 0 && variantGiaKhuyenMai < variantGiaGoc
          ? variantGiaKhuyenMai
          : variantGiaGoc;
      })
    );
    return minVariantPrice;
  }

  // Nếu không có variants, sử dụng giá sản phẩm chính
  return giaKhuyenMai > 0 && giaKhuyenMai < giaGoc ? giaKhuyenMai : giaGoc;
};

/**
 * Sort sản phẩm theo giá (tăng dần)
 */
export const sortProductsByPriceAsc = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => {
    const priceA = getDisplayPrice(a);
    const priceB = getDisplayPrice(b);
    return priceA - priceB;
  });
};

/**
 * Sort sản phẩm theo giá (giảm dần)
 */
export const sortProductsByPriceDesc = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => {
    const priceA = getDisplayPrice(a);
    const priceB = getDisplayPrice(b);
    return priceB - priceA;
  });
};

/**
 * Sort sản phẩm theo tên (A-Z)
 */
export const sortProductsByNameAsc = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => {
    return a.ten.localeCompare(b.ten, "vi");
  });
};

/**
 * Sort sản phẩm theo tên (Z-A)
 */
export const sortProductsByNameDesc = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => {
    return b.ten.localeCompare(a.ten, "vi");
  });
};

/**
 * Sort sản phẩm theo thời gian tạo (mới nhất)
 */
export const sortProductsByDateDesc = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
};

/**
 * Sort sản phẩm theo thời gian tạo (cũ nhất)
 */
export const sortProductsByDateAsc = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
};

/**
 * Sort sản phẩm theo nhiều tiêu chí
 */
export const sortProducts = (
  products: Product[],
  sortType: string
): Product[] => {
  switch (sortType) {
    case "Giá thấp đến cao":
      return sortProductsByPriceAsc(products);
    case "Giá cao đến thấp":
      return sortProductsByPriceDesc(products);
    case "Tên A-Z":
      return sortProductsByNameAsc(products);
    case "Tên Z-A":
      return sortProductsByNameDesc(products);
    case "Mới nhất":
    case "Phổ biến nhất":
      return sortProductsByDateDesc(products);
    default:
      return products;
  }
};
