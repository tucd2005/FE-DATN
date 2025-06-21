// src/components/PrivateRoute.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("adminToken"); // 👈 Kiểm tra token

  return token ? children : <Navigate to="/admin/login" replace />;
}
// 