import { useState } from "react"
import { Minus, Plus } from "lucide-react"

export default function ProductDetails() {
  // State cho size
  const [selectedSize, setSelectedSize] = useState<string>("")
  const sizes = ["S", "M", "L", "XL"]

  // State cho màu
  const [selectedColor, setSelectedColor] = useState<string>("")
  const colors = [
    { name: "Black", value: "#222" },
    { name: "Red", value: "#e11d48" },
    { name: "Blue", value: "#2563eb" },
    { name: "Green", value: "#22c55e" },
  ]

  // State cho số lượng
  const [quantity, setQuantity] = useState<number>(1)
  const stock = 10 // hoặc lấy từ dữ liệu sản phẩm

  return (
    <div className="min-h-screen bg-white">
      <main className="w-4/5 mx-auto py-8 px-4">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-red-500 font-medium mb-2">APPAREL</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Coco X Nad Sport Sweatshirt</h1>
            <p className="text-3xl font-bold text-red-500 mb-4">$224.9</p>
            <p className="text-gray-600 leading-relaxed">The Coco x Nad Sport Sweatshirt is a stylish and versatile addition to any wardrobe. Made from high-quality fabric, it offers comfort and functionality for active individuals. The sweatshirt features a modern silhouette with a relaxed fit and ribbed cuffs.</p>
          </div>

          {/* Chọn màu */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Color</h3>
            <div className="flex space-x-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color.name ? "border-gray-800" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          {/* Chọn size */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Size</h3>
            <div className="flex space-x-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn số lượng */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Quantity</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                  disabled={quantity >= stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Stock</span>
                <span className="ml-2">{stock} Available</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3">
              ADD TO CART
            </button>
            <button className="p-3">{/* Icon yêu thích */}</button>
          </div>
        </div>
      </main>
      {/* ...footer, v.v... */}
    </div>
  )
}
