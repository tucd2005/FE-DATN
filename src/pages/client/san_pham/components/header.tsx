import { Search, User, ShoppingBag } from "lucide-react"

export default function Header() {
  return (
    <div className="border-b">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex justify-between items-center py-2 text-sm text-gray-600">
          <div>123 Main Street Chicago IL 60601 United States</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>USD</span>
              <span>▼</span>
            </div>
            <div className="flex items-center gap-2">
              <span>EN</span>
              <span>▼</span>
            </div>
            <div>
              <a href="#" className="hover:underline">
                Track Your Order
              </a>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter your search keywords..."
              className="pl-10 pr-4 py-2 w-full border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* Logo */}
          <div className="text-3xl font-bold">
            SPORT<span className="text-red-600">Z</span>Y
          </div>

          {/* User actions */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-1 text-sm font-medium">
              <User className="h-5 w-5" />
              <span>SIGN IN</span>
            </a>
            <a href="#" className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
