import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"
import { message } from "antd"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { registerApi } from "../../../api/authClientApi"
import type { IRegisterPayload } from "../../../types/auth"
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../../../validations/authSchema'

const RegisterClient = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IRegisterPayload>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: IRegisterPayload) => {
    try {
      await registerApi(data)
      message.success("Đăng ký thành công")
      reset()
      navigate("/login")
    } catch (error) {
      console.error(error)
      message.error("Đăng ký thất bại")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="text-center p-6 border-b">
          <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h2 className="text-2xl font-bold">Đăng ký</h2>
          <p className="text-gray-500 mt-1">Đăng ký ngay để trải nghiệm dịch vụ tốt nhất</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-medium mb-1">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  id="name"
                  placeholder="Họ và tên"
                  className="pl-10 py-2 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
                  {...register("name")}
                />
              </div>
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="pl-10 py-2 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block font-medium mb-1">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="pl-10 pr-10 py-2 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="password_confirmation" className="block font-medium mb-1">Xác nhận mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  id="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  className="pl-10 pr-10 py-2 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
                  {...register("password_confirmation")}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password_confirmation && (
                <p className="text-sm text-red-500 mt-1">{errors.password_confirmation.message}</p>
              )}
            </div>

            {/* Terms */}
            {/* <div className="flex items-start space-x-2 text-sm">
              <input
                id="terms"
                type="checkbox"
                className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="terms">
                Tôi đồng ý với{" "}
                <Link to="/terms" className="text-indigo-600 hover:underline font-medium">
                  điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link to="/privacy" className="text-indigo-600 hover:underline font-medium">
                  chính sách bảo mật
                </Link>.
              </label>
            </div> */}

            {/* Submit Button */}
            <button
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:from-indigo-600 hover:to-purple-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline font-medium">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterClient
