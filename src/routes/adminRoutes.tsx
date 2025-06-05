import LayoutAdmin from "../layouts/LayoutAdmin";
import QuanLyBanner from "../pages/admin/banner/QuanLyBanner";
import QuanLyBienThe from "../pages/admin/bien_the/QuanLyBienThe";
import QuanLyDanhMuc from "../pages/admin/danh_muc/QuanLyDanhMuc";
import QuanLyDonHang from "../pages/admin/don_hang/QuanLyDonHang";
import QuanLyKichThuoc from "../pages/admin/kich_thuoc/QuanLyKichThuoc";
import QuanLyMaGiamGia from "../pages/admin/ma_giam_gia/QuanLyMaGiamGia";
import QuanLyMauSac from "../pages/admin/mau_sac/QuanLyMauSac";
import AddSanPham from "../pages/admin/san_pham/AddSanPham";
import QuanLySanPham from "../pages/admin/san_pham/QuanLySanPham";
import QuanLyTaiKhoan from "../pages/admin/tai_khoan/QuanLyTaiKhoan";
import TrangChuAdmin from "../pages/admin/TrangChuAdmin";



export const adminRouter = {
  path: "/admin",
  element: <LayoutAdmin />,
  children: [
    { index: true, element: <TrangChuAdmin /> },

    { path: "danh-muc", element: <QuanLyDanhMuc /> },

    { path: "tai-khoan", element: <QuanLyTaiKhoan /> },

    // Route Sản phẩm
    { path: "san-pham", element: <QuanLySanPham /> },
    { path: "san-pham/add", element: <AddSanPham /> },

    { path: "banner", element: <QuanLyBanner /> },
    { path: "bien-the", element: <QuanLyBienThe /> },
    { path: "ma-giam-gia", element: <QuanLyMaGiamGia /> },
    { path: "don-hang", element: <QuanLyDonHang /> },
    { path: "kich-thuoc", element: <QuanLyKichThuoc /> },
    { path: "mau-sac", element: <QuanLyMauSac /> },


  ],
};
