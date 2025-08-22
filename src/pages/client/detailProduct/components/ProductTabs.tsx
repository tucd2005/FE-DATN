import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../../hooks/useProfile";
import { useProductReviews, useSubmitReview } from "../../../../hooks/useReview";
import { message } from "antd";
import type { Variant } from "../../../../types/product.type";

interface ProductTabsProps {
    productId: number;
    selectedVariant: Variant | null;
}

const ProductTabs = ({
    productId,
    selectedVariant,
}: ProductTabsProps) => {
    const [activeTab, setActiveTab] = useState("reviews");
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        so_sao: 5,
        noi_dung: "",
        hinh_anh: null as File | null,
    });

    const { data: reviewData, isLoading: loadingReviews, error: reviewError } = useProductReviews(productId);
    const { data: profile } = useProfile();
    const submitReview = useSubmitReview();
    const navigate = useNavigate();

    const StarIcon = ({ filled = true, className = "" }) => (
        <svg
            className={`w-5 h-5 ${filled ? "text-yellow-400 fill-current" : "text-gray-300"} ${className}`}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    );

    // Xử lý submit form đánh giá
    const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "so_sao") {
            const soSao = Math.max(1, Math.min(5, Number(value)));
            setReviewForm({ ...reviewForm, [name]: soSao });
        } else {
            setReviewForm({ ...reviewForm, [name]: value });
        }
    };

    const handleReviewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReviewForm({ ...reviewForm, hinh_anh: e.target.files?.[0] || null });
    };

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) {
            navigate("/login");
            return;
        }
        const formData = new FormData();
        formData.append("san_pham_id", String(productId));
        formData.append("bien_the_id", selectedVariant?.id ? String(selectedVariant.id) : "");
        formData.append("so_sao", String(reviewForm.so_sao));
        formData.append("noi_dung", reviewForm.noi_dung);
        if (reviewForm.hinh_anh) formData.append("hinh_anh", reviewForm.hinh_anh);
        submitReview.mutate(formData, {
            onSuccess: () => {
                setShowReviewForm(false);
                setReviewForm({ so_sao: 5, noi_dung: "", hinh_anh: null });
                message.success("Đánh giá thành công!");
            },
            onError: (err: unknown) => {
                const error = err as { response?: { data?: { message?: string } } };
                message.error(error.response?.data?.message || "Có lỗi xảy ra");
            },
        });
    };
console.log("Review Data:", reviewData);

    const features = [
        "Công nghệ Dri-FIT thấm hút mồ hôi",
        "Chất liệu polyester tái chế",
        "Form regular fit thoải mái",
        "Đường may phẳng giảm ma sát",
        "Logo Nike Swoosh phản quang",
    ];

    return (
        <div className="mt-16">
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                    {[
                        { id: "reviews", label: `Đánh giá (${reviewData?.meta?.tong_danh_gia ?? 0})` },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-8">
                {activeTab === "description" && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Tính năng nổi bật</h3>
                            <ul className="space-y-3">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Mô tả chi tiết</h3>
                            <div className="text-gray-700 leading-relaxed space-y-4">
                                <p>
                                    Áo thun thể thao Nike Dri-FIT được thiết kế với công nghệ thấm hút mồ hôi tiên tiến, giúp bạn luôn
                                    cảm thấy khô ráo và thoải mái trong suốt quá trình tập luyện. Chất liệu polyester tái chế không
                                    chỉ thân thiện với môi trường mà còn mang lại độ bền cao và khả năng co giãn tốt.
                                </p>
                                <p>
                                    Form regular fit thoải mái phù hợp với mọi vóc dáng, đường may phẳng giảm thiểu ma sát với da.
                                    Logo Nike Swoosh phản quang tạo điểm nhấn thời trang và tăng khả năng nhận diện trong điều kiện
                                    ánh sáng yếu.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "specifications" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Thông số kỹ thuật</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-600">Chất liệu:</span>
                                    <span className="font-semibold">100% Polyester tái chế</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-600">Công nghệ:</span>
                                    <span className="font-semibold">Nike Dri-FIT</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-600">Form dáng:</span>
                                    <span className="font-semibold">Regular Fit</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-600">Xuất xứ:</span>
                                    <span className="font-semibold">Vietnam</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Hướng dẫn bảo quản</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Giặt máy ở nhiệt độ không quá 30°C</li>
                                <li>• Không sử dụng chất tẩy</li>
                                <li>• Phơi khô tự nhiên, tránh ánh nắng trực tiếp</li>
                                <li>• Ủi ở nhiệt độ thấp</li>
                                <li>• Không giặt khô</li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Đánh giá khách hàng</h3>
                            
                        </div>
                        {showReviewForm && (
                            <form className="space-y-4 border p-4 rounded-lg" onSubmit={handleSubmitReview}>
                                <div>
                                    <label className="block font-semibold mb-1">Số sao:</label>
                                    <input
                                        type="number"
                                        name="so_sao"
                                        min={1}
                                        max={5}
                                        value={reviewForm.so_sao}
                                        onChange={handleReviewChange}
                                        className="border rounded px-2 py-1 w-20"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Nội dung:</label>
                                    <textarea
                                        name="noi_dung"
                                        value={reviewForm.noi_dung}
                                        onChange={handleReviewChange}
                                        className="border rounded px-2 py-1 w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Hình ảnh (tùy chọn):</label>
                                    <input type="file" name="hinh_anh" accept="image/*" onChange={handleReviewFile} />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        disabled={submitReview.status === "pending"}
                                    >
                                        Gửi đánh giá
                                    </button>
                                    <button
                                        type="button"
                                        className="border px-4 py-2 rounded"
                                        onClick={() => setShowReviewForm(false)}
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </form>
                        )}
                        {reviewError ? (
                            <div className="text-red-600">
                                Lỗi khi tải đánh giá: {reviewError.message || "Vui lòng thử lại sau."}
                                <button
                                    onClick={() => window.location.reload()}
                                    className="ml-2 text-blue-600 underline"
                                >
                                    Tải lại
                                </button>
                            </div>
                        ) : loadingReviews ? (
                            <div className="space-y-4">
                                <div className="flex space-x-1 justify-center">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-5 h-5 bg-gray-200 animate-pulse rounded" />
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="border-b border-gray-200 pb-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
                                                    <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2"></div>
                                                </div>
                                            </div>
                                            <div className="h-4 bg-gray-200 animate-pulse rounded mt-2"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : reviewData?.meta ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-blue-600 mb-2">{(reviewData.meta.trung_binh_sao || 0).toFixed(1)}</div>
                                    <div className="flex justify-center mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <StarIcon key={i} filled={i < Math.round(reviewData.meta.trung_binh_sao || 0)} />
                                        ))}
                                    </div>
                                    <p className="text-gray-600">{reviewData.meta.tong_danh_gia || 0} đánh giá</p>
                                </div>
                                <div className="md:col-span-2 space-y-4">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <div key={stars} className="flex items-center space-x-3">
                                            <span className="text-sm text-gray-600 w-8">{stars} sao</span>
                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-yellow-400 h-2 rounded-full transition-all"
                                                    style={{
                                                        width: `${((reviewData.meta.so_luong_theo_sao?.[stars] || 0) / (reviewData.meta.tong_danh_gia || 1)) * 100}%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-600 w-8">{reviewData.meta.so_luong_theo_sao?.[stars] || 0}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-600">Chưa có thông tin đánh giá.</div>
                        )}
                        {/* Danh sách đánh giá */}
                        <div className="space-y-6 mt-8">
                            {loadingReviews ? (
                                <div className="space-y-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="border-b border-gray-200 pb-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
                                                    <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2"></div>
                                                </div>
                                            </div>
                                            <div className="h-4 bg-gray-200 animate-pulse rounded mt-2"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : reviewData?.reviews?.length ? (
                                reviewData.reviews.map((review: unknown, index: number) => {
                                    const r = review as {
                                        id: number;
                                        user?: { name?: string; anh_dai_dien?: string };
                                        so_sao: number;
                                        created_at?: string;
                                        hinh_anh?: string;
                                        noi_dung: string;
                                    };
                                    return (
                                        <div key={r.id || index} className="border-b border-gray-200 pb-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                                                        {r.user?.anh_dai_dien ? (
                                                            <img src={r.user.anh_dai_dien} alt="avatar" className="w-10 h-10 object-cover" />
                                                        ) : (
                                                            <span className="text-sm font-semibold">{r.user?.name?.charAt(0) || "?"}</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{r.user?.name || "Ẩn danh"}</p>
                                                        <div className="flex items-center space-x-2">
                                                            <div className="flex">
                                                                {Array.from({ length: r.so_sao }).map((_, i) => (
                                                                    <StarIcon key={i} filled={true} className="w-4 h-4" />
                                                                ))}
                                                                {Array.from({ length: 5 - r.so_sao }).map((_, i) => (
                                                                    <StarIcon key={i + r.so_sao} filled={false} className="w-4 h-4" />
                                                                ))}
                                                            </div>
                                                            <span className="text-sm text-gray-600">{r.created_at?.slice(0, 10) || "N/A"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {r.hinh_anh && (
                                                    <img
                                                        src={`http://localhost:8000/storage/${r.hinh_anh}`}
                                                        alt="review-img"
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                )}
                                            </div>
                                            <p className="text-gray-700">{r.noi_dung}</p>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-gray-600">Chưa có đánh giá nào cho sản phẩm này.</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs; 