"use client"


import { Footer } from "./components/footer"
import { NewsletterSignup } from "./components/newsletter-signup"
import { ProductDetails } from "./components/product-details"
import { ProductImages } from "./components/product-images"
import { ProductTabs } from "./components/product-tabs"
import { RelatedProducts } from "./components/related-products"



export default function ProductdetailsPage() {
 

  const productImages = {
    main: "/placeholder.svg?height=600&width=600",
    thumbnails: [
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
    ],
  }

  const productData = {
    category: "APPAREL",
    name: "Coco X Nad Sport Sweatshirt",
    price: 224.9,
    description:
      "The Coco x Nad Sport Sweatshirt is a stylish and versatile addition to any wardrobe. Made from high-quality fabric, it offers comfort and functionality for active individuals. The sweatshirt features a modern silhouette with a relaxed fit and ribbed cuffs.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "black", value: "#000000" },
      { name: "red", value: "#DC2626" },
      { name: "white", value: "#FFFFFF" },
    ],
    stock: 125,
  }

  const productTabsData = {
    description:
      "The Coco x Nad Collaboration Sport Sweatshirt is a trendy and stylish garment that combines fashion and functionality. Made from high-quality materials, it offers superior comfort and durability for athletic activities. Its sleek design features a minimalist style, adding a touch of modernity to any outfit. With its relaxed fit and ribbed cuffs, it ensures a snug and cozy feel. Whether you're hitting the gym or running errands, this sweatshirt is the perfect choice for those who value both fashion and performance.",
    specifications: {
      size: "See Size Guide",
      style: "Oversized Loose Fit",
      material: "82% cotton, 18% recycled polyester fleece",
    },
  }

  const relatedProducts = [
    {
      id: 1,
      name: "EXA Full-Zip Hoodie",
      price: 222.69,
      category: "APPAREL",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      name: "Hi-Kick 90's Sneakers",
      price: 175.6,
      originalPrice: 219.5,
      discount: "-20%",
      category: "SHOES",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "ONE Sports Shirt",
      price: 80.27,
      category: "APPAREL",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductImages mainImage={productImages.main} thumbnails={productImages.thumbnails} alt={productData.name} />
          <ProductDetails {...productData} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <ProductTabs {...productTabsData} />
            <RelatedProducts products={relatedProducts} />
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="sticky top-8">
              <img
                src="Screenshot 2025-06-12 203404.png"
                alt="Banner"
                className="w-80  object-cover"
                style={{ maxHeight: 1200 }}
              />
            </div>
          </div>
        </div>
        <NewsletterSignup />
       
      </main>

      <Footer />
    </div>
  )
}
