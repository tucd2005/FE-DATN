import LayoutAdmin from "../layouts/LayoutAdmin";
import QuanLyDanhMuc from "../pages/admin/danh_muc/QuanLyDanhMuc";
import DanhMucDaXoa from "../pages/admin/danh_muc/DanhMucDaXoa";
import QuanLyMaGiamGia from "../pages/admin/ma_giam_gia/DiscountCodeList";
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
import StaffManagementPage from "../pages/admin/tai_khoan/liststuff";
import StaffAddPage from "../pages/admin/tai_khoan/Formadd";
import AddDiscountCodePage from "../pages/admin/ma_giam_gia/AddDiscountCodePage";
import EditDiscountCodePage from "../pages/admin/ma_giam_gia/EditDiscountCodePage";
import DeletedDiscountCodeList from "../pages/admin/ma_giam_gia/DeletedDiscountCodeList";
import BannerListPage from "../pages/admin/banner/QuanLyBanner";
import BannerAddForm from "../pages/admin/banner/AddBanner";
import BannerEditForm from "../pages/admin/banner/BannerEditForm";
import AddVariant from "../pages/admin/bien_the/AddVariantPage";
import EditVariantPage from "../pages/admin/bien_the/EditVariantPage";
import Deletelistpage from "../pages/admin/bien_the/Deletelistpage";
import WalletListPage from "../pages/admin/vi_tien/WalletListPage";
import PostListPage from "../pages/admin/bai_viet/PostListPage";
import PostCreatePage from "../pages/admin/bai_viet/PostCreatePage";
import PostDetailPage from "../pages/admin/bai_viet/PostDetailPage";
import PostEditPage from "../pages/admin/bai_viet/PostEditPage";

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
        { path: "account_staff", element: <StaffManagementPage /> },
        { path: "accounts/add", element: <StaffAddPage /> },

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


        { path: "bien-the/add/:productId", element: <AddVariant /> },
        { path: "bien-the/edit/:id", element: <EditVariantPage /> },
        { path: "bien-the/deleted/:productId", element: <Deletelistpage /> },

        // Banner
        { path: "banners", element: <BannerListPage /> },
        { path: "banners/add", element: <BannerAddForm /> },
        { path: "banners/edit/:id", element: <BannerEditForm /> },


        { path: "danh-gia", element: <ReviewListPage /> },
        { path: "danh-gia/:id", element: <ReviewDetailPage /> },


        // Các thuộc tính khác
        { path: "ma-giam-gia", element: <QuanLyMaGiamGia /> },
        { path: "ma-giam-gia/add", element: <AddDiscountCodePage /> },
        { path: "ma-giam-gia/edit/:id", element: <EditDiscountCodePage /> },
        { path: "ma-giam-gia/list/delete", element: <DeletedDiscountCodeList /> },

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
        { path: "gia-tri/thuoc-tinh/:attributeId/deleted", element: <DeletedListPage /> },


        { path: "vi_tien", element: <WalletListPage /> },

        { path: "bai_viet", element: <PostListPage /> },
        { path: "bai_viet/add", element: <PostCreatePage /> },
        { path: "bai_viet/chi_tiet/:id", element: <PostDetailPage /> },
        { path: "bai_viet/edit/:id", element: <PostEditPage /> },

        // Bình luận
        // { path: "binh-luan", element: <CommentList /> },
      ],
    },
  ],
};
