import { useForm } from "react-hook-form";
import { verifyOtpApi } from "../../../api/authApi";
import { message } from "antd";

export default function VerifyOtp({ email, setTab }: { email: string; setTab: (tab: string) => void }) {
    const { register, handleSubmit , reset,formState: { isSubmitting },} = useForm();
  
    const onSubmit = async (data: any) => {
        try {
          const res = await verifyOtpApi({ email, otp: data.otp });
          console.log("RESPONSE:", res);
      
          if (res.data?.access_token) {
            localStorage.setItem("accessToken", res.data.access_token);
            message.success("Xác minh thành công!");
            reset();
            console.log("Chuyển tab");
            setTab("login");
          }
        } catch (err: any) {
          message.error(err.response?.data?.message || "Lỗi xác minh");
          console.log("❌ Bắt lỗi:", err); 
        }
      };
      
      
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm mx-auto">
       <input
  {...register("otp", { required: "Vui lòng nhập mã OTP." })}
  placeholder="Nhập mã OTP"
  className="p-2 border rounded"
/>
<button
  type="submit"
  className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
  disabled={isSubmitting}
>
  {isSubmitting ? "Đang xác minh..." : "Xác minh"}
</button>
      </form>
    );
  }
  
