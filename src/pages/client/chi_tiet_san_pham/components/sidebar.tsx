export default function Sidebar() {
    return (
      <div className="w-full md:w-64 flex-shrink-0">
        {/* Categories */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Categories</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="new-in-closet" className="mr-2" />
              <label htmlFor="new-in-closet" className="text-sm">
                New in Closet (50)
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="featured-items" className="mr-2" />
              <label htmlFor="featured-items" className="text-sm">
                Featured Items (100)
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="mens-wear" className="mr-2" />
              <label htmlFor="mens-wear" className="text-sm">
                Men's Wear (230)
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="womens-wear" className="mr-2" />
              <label htmlFor="womens-wear" className="text-sm">
                Women's Wear (150)
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="kids-wear" className="mr-2" />
              <label htmlFor="kids-wear" className="text-sm">
                Kids' Wear (100)
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="sports-shoes" className="mr-2" />
              <label htmlFor="sports-shoes" className="text-sm">
                Sports Shoes (80)
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="sports-equipment" className="mr-2" />
              <label htmlFor="sports-equipment" className="text-sm">
                Sports Equipment (75)
              </label>
            </div>
          </div>
        </div>
  
        {/* Brands */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Brands</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="nike" className="mr-2" />
              <label htmlFor="nike" className="text-sm">
                Nike (430)
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="puma" className="mr-2" />
              <label htmlFor="puma" className="text-sm">
                Puma (320)
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="adidas" className="mr-2" />
              <label htmlFor="adidas" className="text-sm">
                Adidas (300)
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="reebok" className="mr-2" />
              <label htmlFor="reebok" className="text-sm">
                Reebok (280)
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="new-balance" className="mr-2" />
              <label htmlFor="new-balance" className="text-sm">
                New Balance (250)
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="skechers" className="mr-2" />
              <label htmlFor="skechers" className="text-sm">
                Skechers (120)
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="others" className="mr-2" />
              <label htmlFor="others" className="text-sm">
                Others (90)
              </label>
            </div>
          </div>
        </div>
  
        {/* Size */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Size</h3>
          <div className="grid grid-cols-4 gap-2">
            <button className="border rounded py-1 px-2 text-sm hover:border-red-500">XS</button>
            <button className="border rounded py-1 px-2 text-sm hover:border-red-500">S</button>
            <button className="border rounded py-1 px-2 text-sm bg-red-600 text-white">M</button>
            <button className="border rounded py-1 px-2 text-sm hover:border-red-500">L</button>
            <button className="border rounded py-1 px-2 text-sm hover:border-red-500">XL</button>
            <button className="border rounded py-1 px-2 text-sm hover:border-red-500">2XL</button>
          </div>
        </div>
  
        {/* Price */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Price</h3>
          <div className="mb-4">
            <input type="range" min="0" max="1000" className="w-full accent-red-600" />
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <label className="block text-gray-500 mb-1">Min. Price</label>
              <input type="text" value="$ 100" className="border rounded p-1 w-20" readOnly />
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Max. Price</label>
              <input type="text" value="$ 1000" className="border rounded p-1 w-20" readOnly />
            </div>
          </div>
        </div>
  
        {/* Clear filters */}
        <button className="flex items-center text-red-600 text-sm font-medium mb-4">
          <svg
            className="h-4 w-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          CLEAR ALL FILTER
        </button>
  
        {/* Banner image */}
        <img
          src="Screenshot 2025-06-11 211406.png"
          alt="Sportzy Banner"
          className="w-full rounded-lg object-cover"
          style={{ maxHeight: 2000 }}
        />
        
      </div>
    )
}
