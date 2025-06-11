"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

import { SizeSelector } from "./size-selector"
import { ColorSelector } from "./color-selector"


interface Color {
  name: string
  value: string
}

interface ProductDetailsProps {
  category: string
  name: string
  price: number
  description: string
  sizes: string[]
  colors: Color[]
  stock: number
}

export function ProductDetails({ category, name, price, description, sizes, colors }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[2] || sizes[0])
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || "")


  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-red-500 font-medium mb-2">{category}</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{name}</h1>
        <p className="text-3xl font-bold text-red-500 mb-4">${price}</p>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      <SizeSelector sizes={sizes} selectedSize={selectedSize} onSizeChange={setSelectedSize} />

      <ColorSelector colors={colors} selectedColor={selectedColor} onColorChange={setSelectedColor} />



      <div className="flex space-x-4">
        <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3">ADD TO CART</button>
        <button  className="p-3">
          <Heart className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
