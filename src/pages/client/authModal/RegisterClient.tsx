import { useState } from "react"
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-6 relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 opacity-20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 opacity-15 rounded-full blur-2xl animate-spin-slow"></div>
      </div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-purple-100/50">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
            <span className="text-white font-extrabold text-3xl">S</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Đăng Ký Sportigo</h2>
          <p className="text-gray-600 mt-2 text-sm">Khám phá phong cách thể thao đỉnh cao!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Họ và tên
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-blue-500 transition-colors duration-300" />
              <input
                id="name"
                placeholder="Họ và tên"
                className="pl-12 w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 py-3 px-4 transition-all duration-300 hover:bg-white hover:shadow-lg"
                {...register("name")}
              />
            </div>
            {errors.name && <p className="text-sm text-red-500 mt-1 animate-slide-in">{errors.name.message}</p>}
          </div>


          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-blue-500 transition-colors duration-300" />
              <input
                id="email"
                type="email"
                placeholder="Nhập email của bạn"
                className="pl-12 w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 py-3 px-4 transition-all duration-300 hover:bg-white hover:shadow-lg"
                {...register("email")}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500 mt-1 animate-slide-in">{errors.email.message}</p>}
          </div>


          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Mật khẩu
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-blue-500 transition-colors duration-300" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                className="pl-12 pr-12 w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 py-3 px-4 transition-all duration-300 hover:bg-white hover:shadow-lg"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1 animate-slide-in">{errors.password.message}</p>}
          </div>


          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-semibold text-gray-700">
              Xác nhận mật khẩu
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-blue-500 transition-colors duration-300" />
              <input
                id="password_confirmation"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                className="pl-12 pr-12 w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 py-3 px-4 transition-all duration-300 hover:bg-white hover:shadow-lg"
                {...register("password_confirmation")}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="text-sm text-red-500 mt-1 animate-slide-in">{errors.password_confirmation.message}</p>
            )}
          </div>


          <button
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-6 flex justify-between">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200">
              Đăng nhập ngay
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterClient