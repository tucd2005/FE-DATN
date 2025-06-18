import { Heart, Share2 } from "lucide-react"
import { useProducts } from "../../../../hooks/client/useproduct"
import { Link } from "react-router-dom"


export default function ProductGrid() {
  const { data: products = [], isLoading, isError } = useProducts()

  if (isLoading) return <div className="text-center py-10">Loading products...</div>
  if (isError) return <div className="text-center text-red-500 py-10">Failed to load products.</div>

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="text-sm text-gray-500 mb-4 sm:mb-0">
          Showing {products.length} of {products.length} results
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">Sort by:</div>
          <select className="border rounded p-1 text-sm">
            <option>Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
          <div className="flex gap-2">
            <button className="p-1 border rounded">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </button>
            <button className="p-1 border rounded bg-red-500 text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a1 1 0 011-1h8a1 1 0 011 1v1H5V4zm4 3V6h2v1h-2zm-3 0V6h2v1H6zm7 0V6h1v1h-1zm-4 3V9h2v1h-2zm-3 0V9h2v1H6zm7 0V9h1v1h-1zm-4 3v-1h2v1h-2zm-3 0v-1h2v1H6zm7 0v-1h1v1h-1z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-md overflow-hidden shadow-sm border"
          >
            {/* Image */}
            <div className="relative aspect-square bg-gray-100">
              <img
                src={
                  product.image && product.image.startsWith("http")
                    ? product.image
                    : "/placeholder.jpg"
                }
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />

              {/* Discount badge */}
              {product.discount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.discount}
                </div>
              )}

              {/* Hover actions */}
              <div className="absolute top-2 left-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* Add to cart */}
              <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-center py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Link
                  to={`/product-detail/${product.id}`}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300 ease-in-out"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="text-xs text-red-600 font-semibold mb-1">{product.category}</div>
              <h3 className="font-medium mb-1">{product.name}</h3>
              <div className="flex items-center gap-2">
                <span className="font-bold">
                  ${Number(product.price).toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through text-sm">
                    ${Number(product.originalPrice).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
