import HomeClient from "../pages/client/home/home";
import ClientLayout from "../layouts/LayoutClient";
import CartPage from "../pages/client/Cart/CartPage";
import CheckoutPage from "../pages/client/checkout/checkout";

import ProductDetailclientPage from "../pages/client/detailProduct/DetailPage";
import LoginClient from "../pages/client/authModal/LoginClient";
import RegisterClient from "../pages/client/authModal/RegisterClient";
import Component from "../pages/client/thành_cong";
import PaymentResultPage from "../pages/client/oder-succsee";
import ProfilePage from "../pages/client/profile/profile";
import OrderTracking from "../pages/client/profile/component/chi-tiet-don-hang";
import OrderHistory from "../pages/client/profile/component/list-don-hang";
import EditProfilePage from "../pages/client/profile/EditProfilePage";
import PaymentResultZaloPage from "../pages/client/thanh-cong-zalo";
import ForgotPasswordPage from "../pages/client/authModal/ForgotPasswordPage";
import ContactPage from "../pages/client/contact/ContactPage";
import SportsNewsPage from "../pages/client/bai_viet/postsClient";
import ArticleDetailPage from "../pages/client/bai_viet/detailposts";
import ProductsPage from "../pages/client/san_pham/ProductsPage";
import PaymentSuccessPage from "../pages/client/payment-success";
import PaymentFailedPage from "../pages/client/payment-failed";



export const clientRouter = {
  path: "/",
  element: <ClientLayout />, // Có thể thay bằng <ClientLayout /> nếu có
  children: [
    { index: true, element: < HomeClient /> },
    { path: "products", element: <ProductsPage /> },
    { path: "contact", element: <ContactPage /> },
    { path: "info-user", element: <ProfilePage /> },
    { path: "info-user/edit", element: <EditProfilePage /> },
    { path: "detail-product/:id", element: <OrderTracking /> },
    { path: "order-history", element: <OrderHistory /> },
    { path: "cart", element: <CartPage /> },
    { path: "checkout", element: <CheckoutPage /> },
    { path: "payment/result", element: <PaymentResultPage /> },
    { path: "payment/result/zalo", element: <PaymentResultZaloPage /> },
    { path: "products/:id", element: <ProductDetailclientPage /> },
    { path: "news", element: <SportsNewsPage /> },
    { path: "news/:id", element: <ArticleDetailPage /> },
    { path: "payment-success", element: <PaymentSuccessPage /> },
    { path: "payment-failed", element: <PaymentFailedPage /> },
    { path: "success", element: <Component /> },
    { path: "login", element: <LoginClient /> },
    { path: "register", element: <RegisterClient /> },
    { path: "forgot-password", element: <ForgotPasswordPage /> }

  ],
};
