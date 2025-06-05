import LayoutAdmin from "../layouts/LayoutAdmin";
import QuanLyBanner from "../pages/admin/banner/QuanLyBanner";
import QuanLyBienThe from "../pages/admin/bien_the/QuanLyBienThe";
import CommentList from "../pages/admin/Binh_luan/listbinhluan";
import QuanLyDanhMuc from "../pages/admin/danh_muc/QuanLyDanhMuc";
import QuanLyDonHang from "../pages/admin/don_hang/QuanLyDonHang";
import QuanLyKichThuoc from "../pages/admin/kich_thuoc/QuanLyKichThuoc";
import QuanLyMaGiamGia from "../pages/admin/ma_giam_gia/QuanLyMaGiamGia";
import QuanLyMauSac from "../pages/admin/mau_sac/QuanLyMauSac";
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
    { path: "binh-luan", element: <CommentList /> },
    { path: "san-pham", element: <QuanLySanPham /> },
    { path: "banner", element: <QuanLyBanner /> },
    { path: "bien-the", element: <QuanLyBienThe /> },
    { path: "ma-giam-gia", element: <QuanLyMaGiamGia /> },
    { path: "don-hang", element: <QuanLyDonHang /> },
    { path: "kich-thuoc", element: <QuanLyKichThuoc /> },
    { path: "mau-sac", element: <QuanLyMauSac /> },


  ],
};
