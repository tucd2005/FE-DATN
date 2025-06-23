import LayoutAdmin from "../layouts/LayoutAdmin";
import QuanLyBanner from "../pages/admin/banner/QuanLyBanner";
// import CommentList from "../pages/admin/Binh_luan/listbinhluan";
import QuanLyDanhMuc from "../pages/admin/danh_muc/QuanLyDanhMuc";
import QuanLyDonHang from "../pages/admin/don_hang/QuanLyDonHang";
import QuanLyKichThuoc from "../pages/admin/kich_thuoc/QuanLyKichThuoc";
import QuanLyMaGiamGia from "../pages/admin/ma_giam_gia/QuanLyMaGiamGia";
import QuanLyMauSac from "../pages/admin/mau_sac/QuanLyMauSac";

import QuanLySanPham from "../pages/admin/san_pham/QuanLySanPham";
import ListAccountAdminPage from "../pages/admin/tai_khoan/ListAdminAccount";
import ListAccountUsePage from "../pages/admin/tai_khoan/ListUserAccountPage";
import TrangChuAdmin from "../pages/admin/TrangChuAdmin";
import AdminLogin from "../pages/admin/auth/AdminLogin";

import ProductDetailPage from "../pages/admin/san_pham/DetailSanPham";
import AddProduct from "../pages/admin/san_pham/AddSanPham";
import TrashProductList from "../pages/admin/san_pham/sanPhamDaXoa";
import AttributeList from "../pages/admin/thuoc_tinh/AttributeList";
// import QuanLyBienThe from './../pages/admin/bien_the/QuanLyBienThe';

export const adminRouter = {
  path: "/admin",
  children: [
    {
      path: "login",
      element: <AdminLogin />,
    },
    {
      path: "",
      element: (
          <LayoutAdmin />
      ),
      children: [
        { index: true, element: <TrangChuAdmin /> },

        // Tài khoản
        { path: "account_admin", element: <ListAccountAdminPage /> },
        { path: "account_user", element: <ListAccountUsePage /> },
        { path: "tai-khoan", element: <ListAccountUsePage /> }, // hoặc xoá nếu không dùng

        // Sản phẩm
        { path: "san-pham", element: <QuanLySanPham /> },
        { path: "san-pham/chi-tiet/:id", element: <ProductDetailPage /> },
        { path: "san-pham/them-san-pham", element: <AddProduct /> },
         { path:"/admin/san-pham/thung-rac",element:<TrashProductList /> },
   

        // Danh mục, biến thể, banner...
        { path: "danh-muc", element: <QuanLyDanhMuc /> },
        // { path: "bien-the", element: <QuanLyBienThe /> },
        { path: "banner", element: <QuanLyBanner /> },

        // Các thuộc tính khác
        { path: "ma-giam-gia", element: <QuanLyMaGiamGia /> },
        { path: "don-hang", element: <QuanLyDonHang /> },
        { path: "kich-thuoc", element: <QuanLyKichThuoc /> },
        { path: "mau-sac", element: <QuanLyMauSac /> },

        { path: "thuoc-tinh", element: <AttributeList /> },

        // Bình luận
        // { path: "binh-luan", element: <CommentList /> },
      ],
    },
  ],
};
