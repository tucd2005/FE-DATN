import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Email khong hop le")
    .min(6, "Email phai co toi thieu 6 ky tu"),
  password: z
    .string({ required_error: "required !" })
    .min(6, "Mat khau phai co toi thieu 6 ky tu")
    .max(20, "Mat khau khong duoc qua dai"),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, "Ten phai co toi thieu 3 ky tu"),
    email: z
      .string()
      .email("Email khong hop le")
      .min(6, "Email phai co toi thieu 6 ky tu"),
    password: z
      .string()
      .min(6, "Mat khau phai co toi thieu 6 ky tu")
      .max(20, "Mat khau khong duoc qua dai"),
    password_confirmation: z
      .string()
      .min(6, "Mat khau xac nhan phai co toi thieu 6 ky tu")
      .max(20, "Mat khau xac nhan khong duoc qua dai"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Mat khau khong khop",
    path: ["password_confirmation"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
