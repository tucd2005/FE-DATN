import { Home } from "lucide-react"

export default function Breadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm mb-6">
      <a href="#" className="flex items-center text-gray-500 hover:text-red-600">
        <Home className="h-4 w-4" />
      </a>
      <span className="text-gray-400">/</span>
      <a href="#" className="text-gray-500 hover:text-red-600">
        Products  
      </a>
    </div>  
  )
}
