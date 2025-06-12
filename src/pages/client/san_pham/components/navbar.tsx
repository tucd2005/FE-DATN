import { Phone } from "lucide-react"

export default function Navbar() {
  return (
    <div className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button className="flex items-center gap-2 bg-red-600 px-4 py-3">
              <span className="sr-only">Menu</span>
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Browse Categories</span>
            </button>

            <nav className="hidden md:flex">
              <a href="#" className="px-4 py-3 hover:bg-gray-700">
                PRODUCTS
              </a>
              <a href="#" className="px-4 py-3 hover:bg-gray-700">
                BLOG
              </a>
              <a href="#" className="px-4 py-3 hover:bg-gray-700">
                CONTACT
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2 py-3">
            <Phone className="h-4 w-4" />
            <span>Customer Care: +1 (123) 456-7890</span>
          </div>
        </div>
      </div>
    </div>
  )
}
