// src/routers/clientRoutes.tsx

import HomeClient from "../pages/client/home/home";
import ClientLayout from "../layouts/LayoutClient";
import ChiTietSanPham from "../pages/client/san_pham/chi_tiet_san_pham";
import CartPage from "../pages/client/gioHang/giohang";
import CheckoutPage from "../pages/client/checkout/checkout";
import OrderSuccessPage from "../pages/client/oder-succsee";
import ProductDetailclientPage from "../pages/client/chitietsanpham/chitiet";
import LoginClient from "../pages/client/authModal/LoginClient";
import RegisterClient from "../pages/client/authModal/RegisterClient";
import Component from "../pages/client/thành_cong";


export const clientRouter = {
  path: "/",
  element: <ClientLayout />, // Có thể thay bằng <ClientLayout /> nếu có
  children: [
    { index: true, element: < HomeClient /> },
    { path: "san-pham", element: <ChiTietSanPham /> },
    { path: "gio-hang", element: <CartPage /> },
    { path: "thanh-toan", element: <CheckoutPage /> },
    { path: "san-pham/:id", element: <ProductDetailclientPage /> },
    { path: "cam-on", element: <Component /> },
    { path: "login", element: <LoginClient /> },
    { path: "register", element: <RegisterClient /> },


  ],
};
