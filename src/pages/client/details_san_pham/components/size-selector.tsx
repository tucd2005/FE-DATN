"use client"

interface SizeSelectorProps {
  sizes: string[]
  selectedSize: string
  onSizeChange: (size: string) => void
}

export function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Size</h3>
      <div className="flex space-x-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-4 py-2 border rounded-md ${
              selectedSize === size ? "border-black bg-black text-white" : "border-gray-300 hover:border-gray-400"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
