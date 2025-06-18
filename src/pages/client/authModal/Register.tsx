import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerApi } from '../../../api/authApi';
import { message } from 'antd';
import { registerSchema, type RegisterSchema } from '../../../validations/authSchema';

type RegisterProps = { setTab: (tab: string) => void }
const Register = ({ setTab }: RegisterProps) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data:RegisterSchema) => {
    try {
      const payLoad = {username: data.username,
        password: data.password,
        email: data.email
      }
      const res = await registerApi(payLoad);
      console.log(res);
      reset();
      setTab('login') // ! cái này dùng để chuyển trag từ 
      message.success("Register successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data || "Register failed!");
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto mt-8"
    >
      <input
        type="text"
        placeholder="Username"
        {...register('username')}
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
      />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username.message}</p>
      )}

      <input
        type="email"
        placeholder="Email"
        {...register('email')}
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register('password')}
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <input
        type="password"
        placeholder="Confirm Password"
        {...register('confirmPassword')}
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition duration-300"
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default Register;
