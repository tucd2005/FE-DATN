// src/router/adminRoutes.tsx
// import HomeAdmin from '../pages/admin/adminhome'
// import QuanLiSanPham from '../pages/admin/quan_li_san_pham'
// import EditSanPham from '../pages/admin/Edit_san_pham'
// import AddSanPham from '../pages/admin/Add_san_pham'
import { Children } from 'react';
import HomeAdmin from '../pages/admin/Admin_home';
import EditSanPham from '../pages/admin/san_pham/Edit_san_pham';
import AddSanPham from '../pages/admin/san_pham/Add_san_pham';

const adminRoutes = [
  {
    path: "/admin/home",

    element: <HomeAdmin />,
  },
//   {
//     path: "/admin/quan-li-san-pham",
//     element: <QuanLiSanPham />,
//   },
  {
    path: "/admin/edit-san-pham",
    element: <EditSanPham />,
  },
  {
    path: "/admin/add-san-pham",
    element: <AddSanPham  />,
  },
];

export default adminRoutes;
