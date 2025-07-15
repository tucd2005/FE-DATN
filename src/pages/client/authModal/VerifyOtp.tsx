import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { sendOtpApi, verifyOtpApi } from "../../../api/authClientApi";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

interface VerifyOtpProps {
  email: string;
  onClose: () => void;
}

interface OtpForm {
  otp: string;
}

export default function VerifyOtp({ email, onClose }: VerifyOtpProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<OtpForm>();

  const navigate = useNavigate()

  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [counter, setCounter] = useState(60);

  // Đồng hồ đếm ngược 60s
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isResendDisabled) {
      timer = setInterval(() => {
        setCounter((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsResendDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResendDisabled]);

  const onSubmit = async (data: OtpForm) => {
    try {
      const res = await verifyOtpApi({ email, otp: data.otp });
      if (res.data?.access_token) {
        localStorage.setItem("accessToken", res.data.access_token);
        message.success("Xác minh thành công!");
        reset();
        onClose?.();
        navigate("/")
      }
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'response' in err) {
        message.error(err.response?.data?.message || "Lỗi xác minh");
      } else {
        message.error("Lỗi xác minh");
      }
    }
  };

  const handleResend = async () => {
    if (isResendDisabled) return; // Chặn nếu đã disable (phòng trường hợp double click cực nhanh)
    setIsResendDisabled(true); // Chặn ngay lập tức
    try {
      await sendOtpApi({ email });
      message.success("Mã OTP đã được gửi lại.");
      // setIsResendDisabled(true); // Đã set ở trên
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'response' in err) {
        message.error(err.response?.data?.message || "Không gửi được OTP");
      } else {
        message.error("Không gửi được OTP");
      }
      setIsResendDisabled(false); // Nếu lỗi thì mở lại nút
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
        type="button"
        className="text-blue-600 underline text-sm disabled:opacity-50"
        onClick={handleResend}
        disabled={isResendDisabled}
      >
        {isResendDisabled ? `Gửi lại sau ${counter}s` : "Gửi lại mã OTP"}
      </button>

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
