// src/routers/index.tsx
import { createBrowserRouter } from "react-router-dom";
// import { clientRouter } from "./clientRoutes";
import { adminRouter } from "./adminRoutes";
// import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  // clientRouter,
  adminRouter,
  // {
  //   path: "*",
  //   element: <NotFoundPage />, // hoặc <div>404 Not Found</div>
  // },
]);
