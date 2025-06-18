import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerSchema } from '../../validations/authSchema';

type FormData = z.infer<typeof registerSchema>; // ✅ Lấy kiểu từ zod

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { username, email, password } = data;

      const res = await axios.post('http://localhost:3000/users', {
        username,
        email,
        password,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success('Register successfully!');
        reset();
      } else {
        toast.error('Register failed. Please try again.');
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong!');
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
