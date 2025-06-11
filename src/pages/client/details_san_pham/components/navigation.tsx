"use client"

import { ChevronDown, Search, ShoppingCart, User } from "lucide-react"


export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold">SPORTZY</div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-1 cursor-pointer">
              <span>BROWSE CATEGORIES</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer">
              <span>PRODUCTS</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <span className="cursor-pointer">BLOG</span>
            <span className="cursor-pointer">CONTACT</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 cursor-pointer">
            <User className="w-5 h-5" />
            <span className="hidden md:inline">SIGN IN</span>
          </div>
          <div className="relative cursor-pointer">
            <ShoppingCart className="w-5 h-5" />
            
          </div>
          <Search className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
    </nav>
  )
}
