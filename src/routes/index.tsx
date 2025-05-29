import { createBrowserRouter } from "react-router-dom";
import HomeClient from "../pages/client/home";
import GiaoDienAdmin from "../components/admin_antd/GiaoDienAdmin";
import Products from "../components/admin_antd/Products";
import TrangChuAdmin from "../components/admin_antd/TrangChuAdmin";
import OrderTable from "../components/admin_antd/Order";
import Qlibinhluan from "../components/admin_antd/Qlibinhluan";
import Qlidanhmuc from "../components/admin_antd/Qlidanhmuc";
import Qlikichthuoc from "../components/admin_antd/Qlikichthuoc";
import Qlybanner from "../components/admin_antd/Qlybanner";
import Qlydonhang from "../components/admin_antd/Qlydonhang";
import Qlymagiamgia from "../components/admin_antd/Qlymagiamgia";
import { elements } from "chart.js";


export const router = createBrowserRouter([
    {
        path: "/",
         element: < HomeClient/>,
         children: [
            { }
         ]
    },


    {
        path: "/giaodien",
        element: <GiaoDienAdmin/>,
        children: [
            {path: "trang-chu" , element: <TrangChuAdmin/>},
            // {index:"trang-chu", elements:<TrangChuAdmin/>,  }
            {path: "products" , element: <Products/>},
            {path: "trang-order" , element: <OrderTable/>},
            {path: "trang-binhluan" , element: <Qlibinhluan/>},
            {path: "trang-danhmuc" , element: <Qlidanhmuc/>},
            {path: "trang-kichthuoc" , element: <Qlikichthuoc/>},
            {path: "trang-banner" , element: <Qlybanner/>},
            {path: "trang-donhang" , element: <Qlydonhang/>},
            {path: "trang-magiamgia" , element: <Qlymagiamgia/>},
        ]
        
    }
])