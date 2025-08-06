// ForgotPasswordPage.tsx (UI updated to match modern style)
import { useForm } from "react-hook-form"
import { sendForgotOtpApi } from "../../../api/authClientApi"
import { message } from "antd"
import { useState } from "react"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {!showVerify ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-6 text-center">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h2 className="text-2xl font-bold">Quên mật khẩu</h2>
              <p className="text-gray-500 mt-1">Nhập địa chỉ email của bạn để nhận mã xác thực.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("email")}
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
              >
                Gửi mã OTP
              </button>
            </form>

            <div className="text-center mt-4">
              <a
                href="/login"
                className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center"
              >
                &larr; Quay lại đăng nhập
              </a>
            </div>
          </div>
        ) : (
          <VerifyForgotOtp email={email} />
        )}
      </div>
    </div>
  )
}
