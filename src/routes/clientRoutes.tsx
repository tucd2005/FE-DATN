// src/routers/clientRoutes.tsx
import { Outlet } from "react-router-dom";
import ChiTietSanPham from "../pages/client/chi_tiet_san_pham/chi_tiet_san_pham";
import ProductdetailsPage from "../pages/client/details_san_pham/san_pham_detais_page";


export const clientRouter = {
  path: "/",
  element: <Outlet />, // Có thể thay bằng <ClientLayout /> nếu có
  children: [
    { index: true, element: <ChiTietSanPham /> }, 
    { path: "san-pham", element: <ChiTietSanPham /> }, 
    { path: "chi-tiet-san-pham", element: <ProductdetailsPage /> }, 
  ],
};
