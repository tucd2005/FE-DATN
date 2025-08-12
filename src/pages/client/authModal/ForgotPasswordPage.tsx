import { useForm } from "react-hook-form"
import { sendForgotOtpApi } from "../../../api/authClientApi"
import { message } from "antd"
import { useState } from "react"
import { Mail } from "lucide-react"
import { Link } from "react-router-dom"
import VerifyForgotOtp from "./VerifyForgotOtp"

export default function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm<{ email: string }>()
  const [email, setEmail] = useState("")
  const [showVerify, setShowVerify] = useState(false)

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      await sendForgotOtpApi({ email })
      message.success("Mã OTP đã được gửi đến email.")
      setEmail(email)
      setShowVerify(true)
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Không gửi được OTP.")
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
        {!showVerify ? (
          <>
            <div className="text-center mb-8">
              <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                <span className="text-white font-extrabold text-3xl">S</span>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Quên Mật Khẩu</h2>
              <p className="text-gray-600 mt-2 text-sm">Nhập email để nhận mã OTP và đặt lại mật khẩu!</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Gửi mã OTP
              </button>

              <p className="text-center text-sm text-gray-500 mt-6 flex justify-between">
                Đã có tài khoản?{' '}
                <Link to="/login" className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200">
                  Đăng nhập ngay
                </Link>
              </p>
            </form>
          </>
        ) : (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-8 relative border border-purple-100/50">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold transition-colors duration-200"
              onClick={() => setShowVerify(false)}
            >
              ×
            </button>
            <VerifyForgotOtp email={email} />
          </div>
        )}
      </div>
    </div>
  )
}