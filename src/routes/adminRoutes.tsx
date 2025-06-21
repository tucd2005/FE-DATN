import LayoutAdmin from "../layouts/LayoutAdmin";
import QuanLyBanner from "../pages/admin/banner/QuanLyBanner";
import QuanLyBienThe from "../pages/admin/bien_the/QuanLyBienThe";
// import CommentList from "../pages/admin/Binh_luan/listbinhluan";
import QuanLyDanhMuc from "../pages/admin/danh_muc/QuanLyDanhMuc";
import QuanLyDonHang from "../pages/admin/don_hang/QuanLyDonHang";
import QuanLyKichThuoc from "../pages/admin/kich_thuoc/QuanLyKichThuoc";
import QuanLyMaGiamGia from "../pages/admin/ma_giam_gia/QuanLyMaGiamGia";
import QuanLyMauSac from "../pages/admin/mau_sac/QuanLyMauSac";
import AddSanPham from "../pages/admin/san_pham/AddSanPham";
import DetailSanPham from "../pages/admin/san_pham/DetailSanPham";
import QuanLySanPham from "../pages/admin/san_pham/QuanLySanPham";
import QuanLyTaiKhoan from "../pages/admin/tai_khoan/QuanLyTaiKhoan";
import TrangChuAdmin from "../pages/admin/TrangChuAdmin";
import AdminLogin from "../pages/admin/auth/AdminLogin";
import PrivateRoute from "../components/PrivateRoute";



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
        // Route mặc định khi truy cập /admin
        { index: true, element: <TrangChuAdmin /> },

        // Route quản lý danh mục sản phẩm
        { path: "danh-muc", element: <QuanLyDanhMuc /> },

        // Route quản lý tài khoản người dùng
        { path: "tai-khoan", element: <QuanLyTaiKhoan /> },
        // Route quản lý sản phẩm
        { path: "san-pham", element: <QuanLySanPham /> },
        { path: "san-pham/add", element: <AddSanPham /> },
        { path: "san-pham/detail", element: <DetailSanPham /> },
        // Route quản lý banner
        { path: "banner", element: <QuanLyBanner /> },

        // Route quản lý biến thể sản phẩm
        { path: "bien-the", element: <QuanLyBienThe /> },

        // Route quản lý mã giảm giá
        { path: "ma-giam-gia", element: <QuanLyMaGiamGia /> },

        // Route quản lý đơn hàng
        { path: "don-hang", element: <QuanLyDonHang /> },

        // Route quản lý kích thước
        { path: "kich-thuoc", element: <QuanLyKichThuoc /> },
        // Route quản lý màu sắc
        { path: "mau-sac", element: <QuanLyMauSac /> },
        // Route quản lý bình luận
        //  { path: "binh-luan", element: <CommentList /> },
      ],
    }
  ]
};
