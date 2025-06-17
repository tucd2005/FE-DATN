// src/routers/clientRoutes.tsx
import ProductdetailsPage from "../pages/client/details_san_pham/san_pham_detais_page";
import HomeClient from "../pages/client/home";
import ClientLayout from "../layouts/LayoutClient";
import ChiTietSanPham from "../pages/client/san_pham/chi_tiet_san_pham";


export const clientRouter = {
  path: "/",
  element: <ClientLayout />, // Có thể thay bằng <ClientLayout /> nếu có
  children: [
    { index: true, element: < HomeClient/> }, 
    { path: "san-pham", element: <ChiTietSanPham /> }, 
    { path: "product-detail/:id", element: <ProductdetailsPage /> }, 
  ],
};
