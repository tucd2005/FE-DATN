// src/routers/clientRoutes.tsx
import { Outlet } from "react-router-dom";
import ProductdetailsPage from "../pages/client/details_san_pham/san_pham_detais_page";
import ChiTietSanPham from "../pages/client/san_pham/chi_tiet_san_pham";


export const clientRouter = {
  path: "/",
  element: <Outlet />, // Có thể thay bằng <ClientLayout /> nếu có
  children: [
    { index: true, element: <ChiTietSanPham /> }, 
    { path: "san-pham", element: <ChiTietSanPham /> }, 
    { path: "chi-tiet-san-pham", element: <ProductdetailsPage /> }, 
  ],
};
