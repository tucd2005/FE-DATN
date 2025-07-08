import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { Spin } from "antd";
import { useProfile } from "../../../hooks/useProfile";

export default function UserButton() {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useProfile();

  const handleClick = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/thong-tin-khach-hang');
    } else {
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
    >
      {isLoading ? (
        <Spin size="small" />
      ) : profile ? (
        <>
          <img
            src={profile.anh_dai_dien || "/default-avatar.png"}
            alt="Avatar"
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm">{profile.name}</span>
        </>
      ) : (
        <User className="w-5 h-5" />
      )}
    </button>
  );
}
