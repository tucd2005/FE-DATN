// src/components/PrivateRoute.tsx
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { message } from "antd";

let warned = false; // Đảm bảo chỉ hiện 1 lần khi chuyển trang

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (role !== "admin") {
    if (!warned) {
      message.error("Bạn không có quyền truy cập trang quản trị!");
      warned = true;
      setTimeout(() => { warned = false; }, 2000); // reset sau 2s
    }
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}



