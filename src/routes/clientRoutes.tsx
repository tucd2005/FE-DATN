// src/routers/clientRoutes.tsx

import HomeClient from "../pages/client/home/home";
import ClientLayout from "../layouts/LayoutClient";
import ChiTietSanPham from "../pages/client/san_pham/chi_tiet_san_pham";
import CartPage from "../pages/client/gioHang/giohang";
import CheckoutPage from "../pages/client/checkout/checkout";

import ProductDetailclientPage from "../pages/client/detailProduct/DetailPage";
import LoginClient from "../pages/client/authModal/LoginClient";
import RegisterClient from "../pages/client/authModal/RegisterClient";
import Component from "../pages/client/thành_cong";
import PaymentResultPage from "../pages/client/oder-succsee";
import ProfilePage from "../pages/client/profile/profile";
import OrderTracking from "../pages/client/profile/component/chi-tiet-don-hang";
import OrderHistory from "../pages/client/profile/component/list-don-hang";
import EditProfilePage from "../pages/client/profile/EditProfilePage";
import PaymentResultZaloPage from "../pages/client/thanh-cong-xalo";



export const clientRouter = {
  path: "/",
  element: <ClientLayout />, // Có thể thay bằng <ClientLayout /> nếu có
  children: [
    { index: true, element: < HomeClient /> },
    { path: "san-pham", element: <ChiTietSanPham /> },
    { path: "thong-tin-khach-hang", element: <ProfilePage /> },
    { path: "thong-tin-khach-hang/edit", element: <EditProfilePage /> },
    { path: "chi-tiet-don-hang/:id", element: <OrderTracking /> },
    { path: "chi-tiet-don-hang", element: <OrderHistory /> },
    { path: "gio-hang", element: <CartPage /> },
    { path: "thanh-toan", element: <CheckoutPage /> },
    { path: "payment/result", element: <PaymentResultPage /> },
    { path: "payment/result/zalo", element: <PaymentResultZaloPage /> },


    { path: "san-pham/:id", element: <ProductDetailclientPage /> },
    { path: "cam-on", element: <Component /> },
    { path: "login", element: <LoginClient /> },
    { path: "register", element: <RegisterClient /> },


  ],
};
