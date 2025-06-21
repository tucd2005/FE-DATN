import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerApi } from '../../../api/authClientApi';
import { message } from 'antd';
import { registerSchema, type RegisterSchema } from '../../../validations/authSchema';

type RegisterProps = {
  setTab: (tab: "login" | "register" | "verify") => void
  onSuccess: (email: string) => void;
}

const Register = ({ setTab, onSuccess }: RegisterProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await registerApi(data);
      message.success("Register successfully!");
      setTab("login")
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Register failed!");
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
        placeholder="name"
        {...register('name')}
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <input
        type="email"
        placeholder="Email"
        {...register('email')}
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        {...register('password')}
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      <input
        type="password"
        placeholder="Confirm Password"
        {...register('password_confirmation')}
        className="p-3 border rounded focus:outline-none focus:border-blue-500"
      />
      {errors.password_confirmation && (
        <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>
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
