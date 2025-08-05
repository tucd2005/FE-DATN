import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { message } from "antd"
import { useNavigate } from "react-router-dom"
import { sendForgotOtpApi, verifyForgotOtpApi } from "../../../api/authClientApi"
import ResetPasswordForm from "./ResetPasswordForm"

interface VerifyForgotOtpProps {
  email: string
}

interface OtpForm {
  otp: string
}

export default function VerifyForgotOtp({ email }: VerifyForgotOtpProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<OtpForm>()

  const [isResendDisabled, setIsResendDisabled] = useState(false)
  const [counter, setCounter] = useState(60)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    const lastSent = localStorage.getItem(`otp-forgot-timestamp-${email}`)
    if (lastSent) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSent)) / 1000)
      if (elapsed < 60) {
        setCounter(60 - elapsed)
        setIsResendDisabled(true)
      }
    }
  }, [email])

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    if (isResendDisabled) {
      timer = setInterval(() => {
        setCounter((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setIsResendDisabled(false)
            return 60
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isResendDisabled])

  const onSubmit = async (data: OtpForm) => {
    try {
      await verifyForgotOtpApi({ email, otp: data.otp })
      message.success("Xác minh OTP thành công!")
      setIsVerified(true)
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Mã OTP không hợp lệ hoặc đã hết hạn.")
    }
  }

  const handleResend = async () => {
    if (isResendDisabled) return
    setIsResendDisabled(true)
    localStorage.setItem(`otp-forgot-timestamp-${email}`, Date.now().toString())
    try {
      await sendForgotOtpApi({ email })
      message.success("Mã OTP đã được gửi lại.")
    } catch (err) {
      message.error("Không gửi lại được mã OTP.")
      setIsResendDisabled(false)
    }
  }

  if (isVerified) return <ResetPasswordForm email={email} />

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-900">Xác minh mã OTP</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("otp", { required: "Vui lòng nhập mã OTP." })}
          placeholder="Nhập mã OTP"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between items-center text-sm">
          <button
            type="button"
            className="text-blue-600 hover:underline disabled:opacity-50"
            onClick={handleResend}
            disabled={isResendDisabled}
          >
            {isResendDisabled ? `Gửi lại sau ${counter}s` : "Gửi lại mã OTP"}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang xác minh..." : "Xác minh"}
        </button>
      </form>
    </div>
  )
}
