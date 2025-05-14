import { useRoutes } from 'react-router-dom'
import HomeAdmin from './pages/admin/adminhome'
import EditSanPham from './pages/admin/Edit_san_pham'
import HomeClient from './pages/client/home'
import AddSanPham from './pages/admin/Add_san_pham'
import QuanLySanPham from './pages/admin/quan_ly_san_pham'
import QuanLyDanhMuc from './pages/admin/quan_ly_danh_muc'
import AddDanhMuc from './pages/admin/add_danh_muc'
import EditDanhMuc from './pages/admin/edit_danh_muc'
function App() {
  const router=useRoutes([
    {
          path: "/admin/home",
          element: < HomeAdmin/>,
    },
    {
          path: "/admin/quan-ly-san-pham",
          element: < QuanLySanPham/>,
    },
    {
          path: "/admin/edit-san-pham",
          element: < EditSanPham/>,
    },
    {
          path: "/admin/add-san-pham",
          element: < AddSanPham/>,
    },
    {
          path: "/admin/add-danh-muc",
          element: < AddDanhMuc/>,
    },
    {
          path: "/admin/quan-ly-danh-muc",
          element: < QuanLyDanhMuc/>,
    },
    {
          path: "/admin/edit-danh-muc",
          element: < EditDanhMuc/>,
    },


    {
          path: "/",
          element: < HomeClient/>,
    },
    

   ])
  return (
    <>
     {router}
    </>
  )
}

export default App
