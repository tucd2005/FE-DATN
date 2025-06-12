import { Heart, Share2 } from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  discount?: string
  image: string
}

// Product data
const products: Product[] = [
  {
    id: 1,
    name: "Pegasus Running Shoes",
    category: "SHOES",
    price: 133.52,
    image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p1714553.jpg?v=1694064432850",
  },
  {
    id: 2,
    name: "La Rough Tracking Jacket",
    category: "APPAREL",
    price: 159.71,
    image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p2132064.jpg?v=1694051951010",
    discount: "20%",
  },
  {
    id: 3,
    name: "Swedish Duffel Bag",
    category: "EQUIPMENT",
    price: 32.5,
    originalPrice: 40.7,
    image: "https://bizweb.dktcdn.net/thumb/large/100/490/431/products/p2155510.jpg?v=1694054425827",
  },
  {
    id: 4,
    name: "Hi-Lite Running Shoes",
    category: "SHOES",
    price: 141.75,
    image: "",
  },
  {
    id: 5,
    name: "LSFM Crop Hoodie",
    category: "APPAREL",
    price: 222.69,
    originalPrice: 240.0,
    discount: "10%",
    image: "e",
  },
  {
    id: 6,
    name: "Sports Duffel Bag",
    category: "EQUIPMENT",
    price: 36.4,
    image: "",
  },
  {
    id: 7,
    name: "Neos Trucker Cap",
    category: "APPAREL",
    price: 27.96,
    originalPrice: 34.95,
    discount: "20%",
    image: "",
  },
  {
    id: 8,
    name: "Yoga Training Mat",
    category: "EQUIPMENT",
    price: 15.08,
    image: "",
  },
  {
    id: 9,
    name: "Kiddos Outdoor Hoodie",
    category: "APPAREL",
    price: 52.01,
    image: "",
  },
  {
    id: 10,
    name: "Essentials Sport Shirt",
    category: "APPAREL",
    price: 50.27,
    image: "",
  },
  {
    id: 11,
    name: "Hi-Kick 90's Sneakers",
    category: "SHOES",
    price: 171.6,
    originalPrice: 190.65,
    discount: "20%",
    image: "",
  },
  {
    id: 12,
    name: "ONE Sports Shirt",
    category: "APPAREL",
    price: 50.27,
    image: "",
  },
]

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-white rounded-md overflow-hidden">
      {/* Product image */}
      <div className="relative aspect-square bg-gray-100">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-cover rounded-lg transition-transform duration-300 hover:scale-105 w-full h-full"
        />

        {/* Discount tag */}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-300 text-white text-xs font-bold px-2 py-1 rounded">
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

        {/* Add to cart button */}
        <div className="absolute bottom-0 left-0 right-0 bg-red-300 text-white text-center py-2 translate-y-full group-hover:translate-y-0 transition-transform">
          ADD TO CART
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <div className="text-xs text-red-600 font-medium mb-1">{product.category}</div>
        <h3 className="font-medium mb-1">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-sm line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProductGrid() {
  return (
    <div>
      {/* Product header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="text-sm text-gray-500 mb-4 sm:mb-0">Showing 1-12 of 150 results</div>
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
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="p-1 border rounded bg-red-300 text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M5 4a1 1 0 011-1h8a1 1 0 011 1v1H5V4zm4 3V6h2v1h-2zm-3 0V6h2v1H6zm7 0V6h1v1h-1zm-4 3V9h2v1h-2zm-3 0V9h2v1H6zm7 0V9h1v1h-1zm-4 3v-1h2v1h-2zm-3 0v-1h2v1H6zm7 0v-1h1v1h-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
