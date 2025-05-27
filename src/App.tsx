import { useRoutes } from 'react-router-dom'
import HomeAdmin from './pages/admin/Admin_home'
import EditSanPham from './pages/admin/san_pham/Edit_san_pham'
import HomeClient from './pages/client/home'
import AddSanPham from './pages/admin/san_pham/Add_san_pham'
import QuanLySanPham from './pages/admin/san_pham/quan_ly_san_pham'

import QuanLyDanhMuc from './pages/admin/danh_muc/quan_ly_danh_muc'
import AddDanhMuc from './pages/admin/danh_muc/add_danh_muc'
import EditDanhMuc from './pages/admin/danh_muc/edit_danh_muc'

import QuanLiBanner from './pages/admin/Quan_li_banner'
import SignIn from './pages/auth/sign_in'
import SignUp from './pages/auth/sign_up'
import Thong_bao from './components/admin/thongbao/thong_bao_thanh_cong'
import Thong_bao_error from './components/admin/thongbao/thong_bao_k_thanh_cong'
import SizeListPage from './pages/admin/size/size_page'
import SizeAddPage from './pages/admin/size/add_size'
import ProductDetailPage from './pages/admin/san_pham/chi_tiet_san_pham'
import CommentList from './pages/admin/binh_luan/CommentList'
import NhanVien from './pages/admin/NhanVien'




function App() {

      const router = useRoutes([
            {
                  path: "/admin/home",
                  element: < HomeAdmin />,
            },
            {
                  path: "/admin/quan-ly-san-pham",
                  element: < QuanLySanPham />,
            },
            {
                  path: "/admin/quan-ly-banner",
                  element: < QuanLiBanner />,
            },
            {
                  path: "/admin/edit-san-pham",
                  element: < EditSanPham />,
            },
            {
                  path: "/admin/add-san-pham",
                  element: < AddSanPham />,
            },
            {
                  path: "/admin/chi-tiet-san-pham",
                  element: < ProductDetailPage />,
            },
            {
                  path: "/admin/quan-ly-binh-luan",
                  element: < CommentList />,
            },
            {
                  path: "/admin/add-danh-muc",
                  element: < AddDanhMuc />,
            },
            {
                  path: "/admin/nhanvien",
                  element: <NhanVien />
            },
            {
                  path: "/admin/quan-ly-danh-muc",
                  element: < QuanLyDanhMuc />,
            },
            {
                  path: "/admin/edit-danh-muc",
                  element: < EditDanhMuc />,
            },
            {
                  path: "/admin/size",
                  element: < SizeListPage />,
            },
            {
                  path: "/admin/size/add",
                  element: < SizeAddPage />,
            },

            {
                  path: "/admin/a",
                  element: < Thong_bao_error />,
            },
            {
                  path: "/admin/auth/sign_in",
                  element: < SignIn />,
            },
            {
                  path: "admin/auth/sign_up",
                  element: < SignUp />,
            },
            {
                  path: "/",
                  element: < HomeClient />,
            },


      ])
      return (
            <>
                  {router}
            </>
      )
}

export default App
