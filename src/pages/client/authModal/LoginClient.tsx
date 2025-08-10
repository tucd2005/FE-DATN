import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginApi } from '../../../api/authClientApi';
import VerifyOtp from './VerifyOtp';
import { useNavigate, Link } from 'react-router-dom';
import { message } from 'antd';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../validations/authSchema';

interface ILoginPayload {
  email: string;
  password: string;
}

const LoginClient: React.FC = () => {
  const [showVerify, setShowVerify] = useState(false);
  const [emailToVerify, setEmailToVerify] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginPayload>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: ILoginPayload) => {
    try {
      const res = await loginApi(data);
      console.log(res);

      if (res.data?.access_token) {
        localStorage.setItem('accessToken', res.data.access_token);
        message.success('Đăng nhập thành công!');
        navigate('/');
      } else if (res.data?.status === 'need_verification') {
        setEmailToVerify(data.email);
        setShowVerify(true);
        message.info('Vui lòng xác minh OTP được gửi về email.');
      }
    } catch (err: any) {
      console.log('Login error:', err);
      if (err?.response?.status === 422 && err.response.data?.errors) {
        const errors = Object.values(err.response.data.errors).flat();
        message.error(errors[0] as string);
      } else if (err?.response?.data?.message) {
        message.error(err.response.data.message);
      } else {
        message.error('Đăng nhập thất bại, vui lòng thử lại.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
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
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Đăng Nhập Sportigo</h2>
          <p className="text-gray-600 mt-2 text-sm">Chào mừng bạn quay trở lại!</p>
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
                {...register('email')}
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
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                className="pl-12 pr-12 w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 py-3 px-4 transition-all duration-300 hover:bg-white hover:shadow-lg"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-300"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1 animate-slide-in">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-end">
            <Link to="/auth/forgot-password" className="text-sm text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200">
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-gray-600 font-medium">Hoặc</span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 flex justify-between">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200">
              Đăng ký ngay
            </Link>
          </p>
        </form>

        {showVerify && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-8 relative border border-purple-100/50">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold transition-colors duration-200"
                onClick={() => setShowVerify(false)}
              >
                ×
              </button>
              <VerifyOtp email={emailToVerify} onClose={() => setShowVerify(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginClient;