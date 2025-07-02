import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginApi } from '../../../api/authClientApi';
import VerifyOtp from './VerifyOtp';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

interface ILoginPayload {
    email: string;
    password: string;
}

const LoginClient = () => {
    const [showVerify, setShowVerify] = useState(false);
    const [emailToVerify, setEmailToVerify] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ILoginPayload>();

    const onSubmit = async (data: ILoginPayload) => {
        try {
            const res = await loginApi(data);
            if (res.data?.access_token) {
                localStorage.setItem('accessToken', res.data.access_token);
                message.success('Đăng nhập thành công!');
                navigate('/');
            } else if (res.data?.status === 'need_verification') {
                setEmailToVerify(data.email);
                setShowVerify(true);
                message.info('Vui lòng xác minh OTP được gửi về email.');
            }
        } catch (err: unknown) {
            if (typeof err === 'object' && err !== null && 'response' in err) {
                // @ts-expect-error: err có thể là AxiosError với thuộc tính response
                message.error(err.response?.data?.message || 'Đăng nhập thất bại');
            } else {
                message.error('Đăng nhập thất bại');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', { required: 'Vui lòng nhập email.' })}
                        className="p-2 border rounded"
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        {...register('password', { required: 'Vui lòng nhập mật khẩu.' })}
                        className="p-2 border rounded"
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span>Bạn chưa có tài khoản? </span>
                    <button
                        className="text-blue-600 hover:underline"
                        onClick={() => navigate('/register')}
                        type="button"
                    >
                        Đăng ký
                    </button>
                </div>
            </div>
            {showVerify && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow-lg relative">
                        <button className="absolute top-2 right-2 text-gray-500" onClick={() => setShowVerify(false)}>×</button>
                        <VerifyOtp email={emailToVerify} onClose={() => setShowVerify(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginClient;
