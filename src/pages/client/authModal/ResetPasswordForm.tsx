import { useForm } from "react-hook-form"
import { resetPasswordApi } from "../../../api/authClientApi"
import { message } from "antd"
import { useNavigate } from "react-router-dom"

export default function ResetPasswordForm({ email }: { email: string }) {
  const { register, handleSubmit } = useForm<{ new_password: string; new_password_confirmation: string }>()
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    try {
      await resetPasswordApi({ ...data, email })
      message.success("Đặt lại mật khẩu thành công.")
      navigate("/login")
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Đặt lại mật khẩu thất bại.")
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-900">Đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("new_password")}
          type="password"
          placeholder="Mật khẩu mới"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <input
          {...register("new_password_confirmation")}
          type="password"
          placeholder="Xác nhận mật khẩu"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium"
        >
          Đặt lại mật khẩu
        </button>
      </form>
    </div>
  )
}
