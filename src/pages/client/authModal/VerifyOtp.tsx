import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { sendOtpApi, verifyOtpApi } from "../../../api/authClientApi"
import { message } from "antd"
import { useNavigate } from "react-router-dom"

interface VerifyOtpProps {
  email: string
  onClose: () => void
}

interface OtpForm {
  otp: string
}

const  VerifyOtp = ({ email, onClose }: VerifyOtpProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<OtpForm>()

  const navigate = useNavigate()

  const [isResendDisabled, setIsResendDisabled] = useState(false)
  const [counter, setCounter] = useState(60)

  // Lấy lại thời gian đã gửi OTP gần nhất
  useEffect(() => {
    const lastSent = localStorage.getItem(`otp-timestamp-${email}`)
    if (lastSent) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSent)) / 1000)
      if (elapsed < 60) {
        setCounter(60 - elapsed)
        setIsResendDisabled(true)
      }
    }
  }, [email])

  // Bắt đầu đếm ngược khi đang bị khóa gửi lại
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
      const res = await verifyOtpApi({ email, otp: data.otp })
      if (res.data?.access_token) {
        localStorage.setItem("accessToken", res.data.access_token)
        message.success("Xác minh thành công!")
        reset()
        onClose?.()
        navigate("/")
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        message.error(err.response?.data?.message || "Lỗi xác minh")
      } else {
        message.error("Lỗi xác minh")
      }
    }
  }

  const handleResend = async () => {
    if (isResendDisabled) return
    setIsResendDisabled(true)
    localStorage.setItem(`otp-timestamp-${email}`, Date.now().toString())
    try {
      await sendOtpApi({ email })
      message.success("Mã OTP đã được gửi lại.")
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        message.error(err.response?.data?.message || "Không gửi được OTP")
      } else {
        message.error("Không gửi được OTP")
      }
      setIsResendDisabled(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm mx-auto">
      <input
        {...register("otp", { required: "Vui lòng nhập mã OTP." })}
        placeholder="Nhập mã OTP"
        className="p-2 border rounded"
      />

      <button
        type="button"
        className="text-blue-600 underline text-sm disabled:opacity-50"
        onClick={handleResend}
        disabled={isResendDisabled}
      >
        {isResendDisabled ? `Gửi lại sau ${counter}s` : "Gửi lại mã OTP"}
      </button>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Đang xác minh..." : "Xác minh"}
      </button>
    </form>
  )
}
export default  VerifyOtp