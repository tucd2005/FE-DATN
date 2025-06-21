import { message } from "antd";
import { loginApi } from "../../../api/authClientApi"; // 👈 thay bằng đúng path của bạn
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../../validations/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginProps = {
  setTab: (tab: "login" | "register" | "verify") => void;
  setEmail: (email: string) => void;
};

const Login = ({ setTab, setEmail }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await loginApi(data);
      if (res.data?.status === "need_verification"){
        message.info("Tài khoản chưa xác minh. Vui lòng nhập mã OTP.")
        setEmail(data.email);
        setTab("verify")
        return;
      }

      if(res.data?.access_token){
        localStorage.setItem("accessToken", res.data.access_token);
        message.success("Đăng nhập thành công");
      }
    } catch (err) {
      message.error(err?.response?.data?.message || "Lỗi đăng nhập")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="p-3 border rounded w-full"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Mật khẩu"
          {...register("password")}
          className="p-3 border rounded w-full"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
      >
        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
};

export default Login;
