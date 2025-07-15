import { z } from "zod";

// Regex: Cho phép chữ cái có dấu, khoảng trắng, dấu nháy, chấm, gạch nối
const nameWithVietnameseRegex = /^[\p{L}\p{M}\s'.-]+$/u;

export const loginSchema = z.object({
  email: z
    .string()
    .email("Email không hợp lệ")
    .min(6, "Email phải có tối thiểu 6 ký tự"),
  password: z
    .string({ required_error: "Vui lòng nhập mật khẩu" })
    .min(6, "Mật khẩu phải có tối thiểu 6 ký tự")
    .max(20, "Mật khẩu không được quá dài"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Tên phải có tối thiểu 3 ký tự")
      .regex(
        nameWithVietnameseRegex,
        "Tên chỉ được chứa chữ cái và khoảng trắng"
      ),
    email: z
      .string()
      .email("Email không hợp lệ")
      .min(6, "Email phải có tối thiểu 6 ký tự"),
    password: z
      .string()
      .min(6, "Mật khẩu phải có tối thiểu 6 ký tự")
      .max(20, "Mật khẩu không được quá dài"),
    password_confirmation: z
      .string()
      .min(6, "Mật khẩu xác nhận phải có tối thiểu 6 ký tự")
      .max(20, "Mật khẩu xác nhận không được quá dài"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Mật khẩu không khớp",
    path: ["password_confirmation"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
