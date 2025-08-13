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
import PrivacyPolicy from "../components/footer_Components/privacyPolicy";
import WarrantyPolicy from "../components/footer_Components/warantyPolicy";

export const clientRouter = {
  path: "/",
  element: <ClientLayout />, // Có thể thay bằng <ClientLayout /> nếu có
  children: [
    { index: true, element: < HomeClient /> },
    { path: "san-pham", element: <ProductsPage /> },
    { path: "lien-he", element: <ContactPage /> },


    { path: "thong-tin-khach-hang", element: <ProfilePage /> },
    { path: "thong-tin-khach-hang/edit", element: <EditProfilePage /> },
    { path: "chi-tiet-don-hang/:id", element: <OrderTracking /> },
    { path: "chi-tiet-don-hang", element: <OrderHistory /> },
    { path: "gio-hang", element: <CartPage /> },
    { path: "thanh-toan", element: <CheckoutPage /> },
    { path: "payment/result", element: <PaymentResultPage /> },
    { path: "payment/result/zalo", element: <PaymentResultZaloPage /> },

    { path: "san-pham/:id", element: <ProductDetailclientPage /> },

    { path: "bai_viet", element: <SportsNewsPage /> },
    { path: "bai_viet/:id", element: <ArticleDetailPage /> },
    { path: "payment-success", element: <PaymentSuccessPage /> },
    { path: "payment-failed", element: <PaymentFailedPage /> },

    { path: "cam-on", element: <Component /> },
    { path: "login", element: <LoginClient /> },
    { path: "register", element: <RegisterClient /> },
    { path: "/auth/forgot-password", element: <ForgotPasswordPage /> },

    // phần nhỏ ở footer
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/warranty-policy", element: <WarrantyPolicy /> }


  ],
};
