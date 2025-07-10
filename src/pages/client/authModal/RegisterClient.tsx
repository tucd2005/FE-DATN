import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { IRegisterPayload } from '../../../types/auth';
import { message } from 'antd';
import { registerApi } from '../../../api/authClientApi';

const RegisterClient = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<IRegisterPayload>();

    const onSubmit = async (data: IRegisterPayload) => {
        try {
            const res = await registerApi(data);
            console.log(res);

            message.success('Đăng ký thành công');
            navigate('/login');
            reset();
        } catch (err: unknown) {
            console.log(err);
            message.error('Đăng ký thất bại');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Họ và tên"
                        className="p-2 border rounded"
                        {...register('name')}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-2 border rounded"
                        {...register('email')}
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        className="p-2 border rounded"
                        {...register('password')}
                    />
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        className="p-2 border rounded"
                        {...register('password_confirmation')}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        disabled={isSubmitting}
                    >
                        Đăng ký
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span>Đã có tài khoản? </span>
                    <button
                        className="text-blue-600 hover:underline"
                        type="button"
                        onClick={() => navigate('/login')}
                    >
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterClient;
