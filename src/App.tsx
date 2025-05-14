
import { useRoutes } from 'react-router-dom'
import HomeAdmin from './pages/admin/adminhome'

import EditSanPham from './pages/admin/Edit_san_pham'
import HomeClient from './pages/client/home'
import AddSanPham from './pages/admin/Add_san_pham'
import QuanLySanPham from './pages/admin/quan_ly_san_pham'
import QuanLiBanner from './pages/admin/quan_li_banner'
import SignIn from './pages/auth/sign_in'
import SignUp from './pages/auth/sign_up'



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
