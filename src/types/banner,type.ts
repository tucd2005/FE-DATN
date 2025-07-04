export interface IBanner {
    id: number;
    tieu_de: string;
    hinh_anh: string;
    trang_thai: string;
    created_at: string;   // ISO date string
    updated_at: string;   // ISO date string
    deleted_at: string | null;
}
