import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginApi } from '../../../api/authClientApi'
import VerifyOtp from './VerifyOtp'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { Mail, Lock } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../../validations/authSchema'

interface ILoginPayload {
  email: string
  password: string
}

const LoginClient = () => {
  const [showVerify, setShowVerify] = useState(false)
  const [emailToVerify, setEmailToVerify] = useState('')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginPayload>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: ILoginPayload) => {
    try {
      const res = await loginApi(data)
      if (res.data?.access_token) {
        localStorage.setItem('accessToken', res.data.access_token)
        message.success('Đăng nhập thành công!')
        navigate('/')
      } else if (res.data?.status === 'need_verification') {
        setEmailToVerify(data.email)
        setShowVerify(true)
        message.info('Vui lòng xác minh OTP được gửi về email.')
      }
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'response' in err) {
        // @ts-expect-error: err có thể là AxiosError với thuộc tính response
        message.error(err.response?.data?.message || 'Đăng nhập thất bại')
      } else {
        message.error('Đăng nhập thất bại')
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                id="email"
                type="email"
                placeholder="Email"
                {...register('email')}
                className="pl-10 py-2 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
              />
            </div>
            {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block font-medium mb-1">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                id="password"
                type="password"
                placeholder="Mật khẩu"
                {...register('password')}
                className="pl-10 py-2 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
              />
            </div>
            {errors.password && <span className="text-red-500 text-sm mt-1 block">{errors.password.message}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:from-indigo-600 hover:to-purple-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Bạn chưa có tài khoản?{' '}
          <button
            className="text-indigo-600 hover:underline font-medium"
            onClick={() => navigate('/register')}
            type="button"
          >
            Đăng ký
          </button>
        </div>
      </div>

      {showVerify && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg relative w-full max-w-sm">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setShowVerify(false)}>
              ×
            </button>
            <VerifyOtp email={emailToVerify} onClose={() => setShowVerify(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginClient
