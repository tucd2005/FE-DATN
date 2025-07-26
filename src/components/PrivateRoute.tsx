import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { message } from "antd";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const location = useLocation();

  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [showedMessage, setShowedMessage] = useState(false);

  useEffect(() => {
    if (!token) {
      setRedirectPath("/admin/login");
    } else if (role !== "admin" && !showedMessage) {
      message.error("Bạn không có quyền truy cập trang quản trị!");
      setShowedMessage(true);
      setTimeout(() => {
        setRedirectPath("/");
      }, 300); // Delay 300ms để message có thời gian hiển thị
    }
  }, [token, role, showedMessage]);

  if (redirectPath) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
