import LayoutAdmin from "../layouts/LayoutAdmin";
import QuanLyBanner from "../pages/admin/banner/QuanLyBanner";
// import CommentList from "../pages/admin/Binh_luan/listbinhluan";
import QuanLyDanhMuc from "../pages/admin/danh_muc/QuanLyDanhMuc";
import DanhMucDaXoa from "../pages/admin/danh_muc/DanhMucDaXoa";
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
import EditProduct from "../pages/admin/san_pham/EditSanPham";
import PrivateRoute from "../components/PrivateRoute";
import AddDanhMuc from "../pages/admin/danh_muc/AddDanhMuc";
import EditDanhMuc from "../pages/admin/danh_muc/EditDanhMuc";
import AttributeAddPage from "../pages/admin/thuoc_tinh/AttributeAddPage";
import DetailDanhMuc from "../pages/admin/danh_muc/DetailDanhMuc";
import QuanLyBienThe from '../pages/admin/bien_the/QuanLyBienThe';
import AttributeEditPage from "../pages/admin/thuoc_tinh/AttributeEdit";
import AttributeDeletedListPage from "../pages/admin/thuoc_tinh/AttributeDeletedListPage";
import OrderListPage from "../pages/admin/oder/OrderListPage";
import OrderDetailPage from "../pages/admin/oder/OrderDetailPage";
import ReviewListPage from "../pages/admin/danh-gia/ReviewListPage";
import ReviewDetailPage from "../pages/admin/danh-gia/ReviewDetailPage";
import AttributeValueListPage from "../pages/admin/gia_tri_thuoc_tinh/AttributeValueListPage";
import AddAttributeValuePage from "../pages/admin/gia_tri_thuoc_tinh/AddAttributeValuePage";
import EditAttributeValuePage from "../pages/admin/gia_tri_thuoc_tinh/EditAttributeValuePage";
import DeletedListPage from "../pages/admin/gia_tri_thuoc_tinh/DeletedListPage";

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
        <PrivateRoute>
          <LayoutAdmin />
        </PrivateRoute>
      ),
      children: [
        { index: true, element: <TrangChuAdmin /> },

        // Tài khoản
        { path: "account_admin", element: <ListAccountAdminPage /> },
        { path: "account_user", element: <ListAccountUsePage /> },

        // Sản phẩm
        { path: "san-pham", element: <QuanLySanPham /> },
        { path: "san-pham/chi-tiet/:id", element: <ProductDetailPage /> },
        { path: "san-pham/them-san-pham", element: <AddProduct /> },
        { path: "san-pham/sua-san-pham/:id", element: <EditProduct /> },
        { path: "san-pham/thung-rac", element: <TrashProductList /> },

        // Danh mục
        { path: "danh-muc", element: <QuanLyDanhMuc /> },
        { path: "danh-muc-add", element: <AddDanhMuc /> },
        { path: "danh-muc-edit/:id", element: <EditDanhMuc /> },
        { path: "danh-muc-detail/:id", element: <DetailDanhMuc /> },
        { path: "danh-muc-thung-rac", element: <DanhMucDaXoa /> },

        // Biến thể
        { path: "bien-the", element: <QuanLyBienThe /> },
        { path: "bien-the/:productId", element: <QuanLyBienThe /> },

        // Banner
        { path: "banner", element: <QuanLyBanner /> },


        { path: "danh-gia", element: <ReviewListPage /> },
        { path: "danh-gia/:id", element: <ReviewDetailPage /> },


        // Các thuộc tính khác
        { path: "ma-giam-gia", element: <QuanLyMaGiamGia /> },
        { path: "don-hang", element: <OrderListPage /> }, 
        { path: "don-hang/:id", element: <OrderDetailPage /> }, 
      

        // Thuộc tính
        { path: "thuoc-tinh", element: <AttributeList /> },
        { path: "thuoc-tinh/add", element: <AttributeAddPage /> },
        { path: "thuoc-tinh/deleted", element: <AttributeDeletedListPage /> },
        { path: "thuoc-tinh/:id/edit", element: <AttributeEditPage /> },
        { path: "gia-tri/thuoc-tinh/:attributeId", element: <AttributeValueListPage /> },
        { path: "gia-tri/thuoc-tinh/:attributeId/add", element: <AddAttributeValuePage /> },
        { path: "gia-tri/thuoc-tinh/:id/edit", element: <EditAttributeValuePage /> },
        { path: "gia-tri/thuoc-tinh/:attributeId/deleted", element: <DeletedListPage /> }
      
        // Bình luận
        // { path: "binh-luan", element: <CommentList /> },
      ],
    },
  ],
};
