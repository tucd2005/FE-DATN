import React, { useState } from "react";
import { message } from "antd";
import { loginApi } from "../../../api/authApi"; // 👈 thay bằng đúng path của bạn

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const res = await loginApi(formData); // 👈 API gọi lên BE
      console.log(res);
      
      if (res.data?.access_token) {
        localStorage.setItem("accessToken", res.data.access_token);
        message.success("Đăng nhập thành công!");
        // chuyển hướng hoặc gọi setTab("home") nếu cần
      }
    } catch (err: any) {
      message.error(err.response?.data?.message || "Lỗi đăng nhập");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col gap-4"
    >
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Mật khẩu"
        value={formData.password}
        onChange={handleChange}
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
};

export default Login;
