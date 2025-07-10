import { useForm, type FieldErrors } from "react-hook-form"
import Dialog from "../../../components/Dialog";
import { Button, Form } from "antd";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Field from "../../../components/Field";
import api from "../../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSendMessage from "../../../hooks/useSendMessage";

type TBannerPayload = {
    tieu_de: string;
    mo_ta?: string;
    hinh_anh: string;
    lien_ket?: string;
}

const bannerSchema = z.object({
    tieu_de: z
        .string({ required_error: "Tiêu đề không được để trống" })
        .min(1, "Tiêu đề không được để trống"),
    mo_ta: z.string().optional(),
    hinh_anh: z
        .string({ required_error: "Tiêu đề không được để trống" })
        .min(1, "Tiêu đề không được để trống"),
    lien_ket: z.string().optional()
})

const AddBanner = () => {
    const queryClient = useQueryClient();
    const { sendMessage } = useSendMessage();

    const { handleSubmit, control, formState: { errors }, reset } = useForm<TBannerPayload>({
        resolver: zodResolver(bannerSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: TBannerPayload) => api.post("/admin/banner", data),
        onSuccess: () => {
            sendMessage("success", "Thêm banner thành công");
            queryClient.invalidateQueries({ queryKey: ["banners"] });
            reset();
        },
        onError: () => {
            sendMessage("error", "Thêm banner thất bại");

        }

    })

    const onSubmit = async (data: TBannerPayload) => {
        mutate(data);
    }

    const onError = (error: FieldErrors) => {
        console.log("Form errors:", error);
    }

    return (
        <Dialog
            title="Thêm Banner"
            openButton={
                <Button type="primary">
                    Thêm Banner
                </Button>
            }
            onClose={reset}
            okButton="Thêm mới"
            onConfirm={handleSubmit(onSubmit, onError)}
            loading={isPending}
        >
            <Form className="flex flex-col gap-2">
                <Field<TBannerPayload>
                    name="tieu_de"
                    control={control}
                    label="Tiêu đề"
                    message={errors.tieu_de?.message}
                    isInvalid={!!errors.tieu_de}
                />
                <Field<TBannerPayload>
                    name="mo_ta"
                    control={control}
                    label="Mô tả"
                    message={errors.mo_ta?.message}
                    isInvalid={!!errors.mo_ta}
                />
                <Field<TBannerPayload>
                    name="hinh_anh"
                    control={control}
                    label="Hình ảnh"
                    message={errors.hinh_anh?.message}
                    isInvalid={!!errors.hinh_anh}
                />
                <Field<TBannerPayload>
                    name="lien_ket"
                    control={control}
                    label="Liên kết"
                    message={errors.lien_ket?.message}
                    isInvalid={!!errors.lien_ket}
                />
            </Form>
        </Dialog>
    )
}

export default AddBanner