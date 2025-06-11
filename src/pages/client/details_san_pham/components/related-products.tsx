import { ArrowRight, Heart, ShoppingCart } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  discount?: string
  category: string
  image: string
}

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="flex items-center space-x-2 text-red-500 cursor-pointer">
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 rounded-lg overflow-hidden group cursor-pointer"
          >
            <div className="relative aspect-square">
              {product.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white z-10 px-2 py-1 text-xs rounded">
                  {product.discount}
                </div>
              )}
              <img
                src={product.image || "https://via.placeholder.com/300x300"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-100">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-100">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-red-500 font-medium mb-1">
                {product.category}
              </p>
              <h3 className="font-medium mb-2">{product.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through text-sm">
                    ${product.originalPrice}
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
