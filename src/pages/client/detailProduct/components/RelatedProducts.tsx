import { useParams, Link } from "react-router-dom";
import { useRelatedProducts } from "../../../../hooks/useProduct";

const RelatedProducts = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { data: relatedProducts, isLoading } = useRelatedProducts(productId);

  const StarIcon = ({ filled = true, className = "" }) => (
    <svg
      className={`w-4 h-4 ${filled ? "text-yellow-400 fill-current" : "text-gray-300"} ${className}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  if (isLoading) return <div className="mt-8 text-center text-gray-500">Đang tải sản phẩm liên quan...</div>;
  if (!relatedProducts || relatedProducts.length === 0) return null;
console.log(relatedProducts);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Sản phẩm liên quan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => {
          const firstVariant = product.variants?.[0];
          const image = firstVariant?.hinh_anh?.[0]
            ? `http://localhost:8000/storage/${firstVariant.hinh_anh}`
            : "/placeholder.svg";
          const price = firstVariant?.gia_khuyen_mai || firstVariant?.gia || "0";
          const originalPrice = firstVariant?.gia_khuyen_mai ? firstVariant?.gia : null;

          const discount =
            firstVariant?.gia_khuyen_mai && firstVariant?.gia
              ? `-${Math.round(
                  (1 - parseFloat(firstVariant.gia_khuyen_mai) / parseFloat(firstVariant.gia)) * 100
                )}%`
              : null;

          return (
            <Link
              to={`/san-pham/${product.id}`}
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group block"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={image}
                  alt={product.ten}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    {discount}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.ten}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-blue-600">
                      {parseFloat(price).toLocaleString()}đ
                    </span>
                    {originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {parseFloat(originalPrice).toLocaleString()}đ
                      </span>
                    )}
                  </div>
                  <div className="flex">
                    
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
