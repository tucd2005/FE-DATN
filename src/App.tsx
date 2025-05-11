
import { useRoutes } from 'react-router-dom'
import HomeAdmin from './pages/admin/adminhome'
import QuanLiSanPham from './pages/admin/quan_li_san_pham'
import EditSanPham from './pages/admin/Edit_san_pham'
import HomeClient from './pages/client/home'



function App() {
  const router=useRoutes([
    {
          path: "/admin/home",
          element: < HomeAdmin/>,
    },
    {
          path: "/admin/quan-li-san-pham",
          element: < QuanLiSanPham/>,
    },
    {
          path: "/admin/edit-san-pham",
          element: < EditSanPham/>,
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
