// src/routers/clientRoutes.tsx

import HomeClient from "../pages/client/home/home";
import ClientLayout from "../layouts/LayoutClient";
import ChiTietSanPham from "../pages/client/san_pham/chi_tiet_san_pham";
import CartPage from "../pages/client/gioHang/giohang";
import CheckoutPage from "../pages/client/checkout/checkout";
import OrderSuccessPage from "../pages/client/oder-succsee";
import ProductDetailclientPage from "../pages/client/chitietsanpham/chitiet";


export const clientRouter = {
  path: "/",
  element: <ClientLayout />, // Có thể thay bằng <ClientLayout /> nếu có
  children: [
    { index: true, element: < HomeClient /> },
    { path: "san-pham", element: <ChiTietSanPham /> },
    { path: "gio-hang", element: <CartPage /> },
    { path: "thanh-toan", element: <CheckoutPage /> },
    { path: "chi-tiet", element: <ProductDetailclientPage /> },
    { path: "cam-on", element: <OrderSuccessPage /> },
  

  ],
};
