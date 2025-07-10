// src/components/PrivateRoute.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: ReactNode }) {

  const token = localStorage.getItem("accessToken"); // 👈 Kiểm tra token

  return token ? children : <Navigate to="/admin/login" replace />;
}
// token đủ dk thì chả về children không thì vào lại token ok 



