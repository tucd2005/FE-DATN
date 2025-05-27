import { createBrowserRouter } from "react-router-dom";
import HomeClient from "../pages/client/home";
import GiaoDienAdmin from "../components/admin_antd/GiaoDienAdmin";
import Products from "../components/admin_antd/Products";


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
            {path: "products" , element: <Products/>}
        ]
        
    }
])