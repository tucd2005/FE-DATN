"use client"

import { useState } from "react"

interface ProductImagesProps {
  mainImage: string
  thumbnails: string[]
  alt: string
}

export function ProductImages({ mainImage, thumbnails, alt }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage)

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={selectedImage || "https://via.placeholder.com/600x600"}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {thumbnails.map((thumbnail, index) => (
          <div
            key={index}
            className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(thumbnail)}
          >
            <img
              src={thumbnail || "https://via.placeholder.com/150x150"}
              alt={`${alt} view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
