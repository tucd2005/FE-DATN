import { Footer } from "antd/es/layout/layout";
import Breadcrumb from "./components/breadcrumb";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Pagination from "./components/pagination";
import ProductGrid from "./components/product-grid";
import Sidebar from "./components/sidebar";

export default function ChiTietSanPham() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      {/* <Navbar /> */}
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb />
        <h1 className="text-3xl font-bold mb-6">Products</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar />
          <div className="flex-1">
       
            <ProductGrid />
            <Pagination />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}
