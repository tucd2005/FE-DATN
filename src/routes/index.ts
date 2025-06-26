// src/routers/index.tsx
import { createBrowserRouter } from "react-router-dom";
import { clientRouter } from "./clientRoutes";
import { adminRouter } from "./adminRoutes";
import NotFound from "./../pages/404NotFound";
import React from "react";
export const router = createBrowserRouter([
  clientRouter,
  adminRouter,
  {
    path: "*",
    element: React.createElement(NotFound),
  },
]);
