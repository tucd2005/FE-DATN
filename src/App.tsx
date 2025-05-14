
import { useRoutes } from 'react-router-dom'
import HomeAdmin from './pages/admin/adminhome'

import EditSanPham from './pages/admin/Edit_san_pham'
import HomeClient from './pages/client/home'
import AddSanPham from './pages/admin/Add_san_pham'
import QuanLySanPham from './pages/admin/quan_ly_san_pham'
import QuanLiBanner from './pages/admin/quan_li_banner'



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
          path: "/admin/quan-ly-banner",
          element: < QuanLiBanner/>,
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
