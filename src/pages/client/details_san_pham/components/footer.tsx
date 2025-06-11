"use client"

import { Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  const footerSections = [
    {
      title: "Products",
      links: ["Men's Section", "Women's Section", "Kids Section", "Shoes", "Apparel", "Equipments"],
    },
    {
      title: "Company",
      links: ["About Us", "Testimonials", "Best Seller", "New Arrivals", "Terms & Condition", "Latest Update"],
    },
    {
      title: "Account",
      links: ["Orders", "Wishlist", "Payment Info", "Addresses", "Personal Info"],
    },
    {
      title: "Support",
      links: ["Size Charts", "Payment Guide", "Help Centre", "Privacy Policy", "Return Policy", "FAQs"],
    },
  ]

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>1234 Sports Avenue, Building B, 2600 United States</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 555-1234</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@sportzy.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex justify-between items-center text-sm text-gray-400">
          <div className="flex space-x-4">
            <span>Privacy Policy</span>
            <span>Terms & Condition</span>
            <span>Sitemap</span>
          </div>
          <div className="flex space-x-4">
            <span>VS</span>
            <span>MC</span>
            <span>AP</span>
            <span>PP</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
