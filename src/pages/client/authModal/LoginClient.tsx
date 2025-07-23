import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginApi } from '../../../api/authClientApi';
import VerifyOtp from './VerifyOtp';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../validations/authSchema';
import { Link } from 'react-router-dom';

interface ILoginPayload {
  email: string;
  password: string;
}

const LoginClient: React.FC = () => {
  const [showVerify, setShowVerify] = useState(false);
  const [emailToVerify, setEmailToVerify] = useState('');
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="text-center p-6">
          <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h2 className="text-2xl font-bold">Đăng nhập</h2>
          <p className="text-gray-500 mt-1">Chào mừng bạn quay trở lại Sportigo</p>
        </div>

        <div className="p-6 space-y-4">
          {errors.email && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {errors.email.message}
            </div>
          )}
          {errors.password && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {errors.password.message}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="pl-10 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 px-3"
                  {...register('email')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="pl-10 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 px-3"
                  {...register('password')}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link to="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>

            <button
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Hoặc</span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>

      {showVerify && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowVerify(false)}
            >
              ×
            </button>
            <VerifyOtp email={emailToVerify} onClose={() => setShowVerify(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginClient;
