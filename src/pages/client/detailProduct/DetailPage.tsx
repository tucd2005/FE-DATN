import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useProductDetail } from "../../../hooks/useProduct"
import type { Variant } from "../../../types/product.type"
import { message, Modal } from "antd"
import { useCartStore } from "../../../stores/cart.store"
import {
  ProductImages,
  ProductInfo,
  ProductActions,
  ServiceInfo,
  ProductTabs,
  RelatedProducts,
  VariantNotification,
  VariantTest,
} from "./components"

const ProductDetailclientPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();

  const { data: product, isLoading } = useProductDetail(Number(id));
  const { addToCart } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({});
  const [previousVariant, setPreviousVariant] = useState<Variant | null>(null);
  const [isAutoChange, setIsAutoChange] = useState(false);
  const [isSearchingVariant, setIsSearchingVariant] = useState(false);

  // Hàm chuẩn hóa đường dẫn ảnh
  const getImageUrl = (img: string) => {
    if (!img) return "/placeholder.svg?height=600&width=600";
    if (img.startsWith("http")) return img;
    return `http://localhost:8000/storage/${img}`;
  };

  // Chuẩn hóa dữ liệu ảnh
  const productImages: string[] =
    product && Array.isArray(product.hinh_anh)
      ? product.hinh_anh.map(getImageUrl)
      : product && typeof product.hinh_anh === "string"
        ? [getImageUrl(product.hinh_anh)]
        : ["/placeholder.svg?height=1200&width=1200"];

  // Lấy tối đa 4 biến thể có ảnh
  const variantThumbnails = (product?.variants || [])
    .filter(v => v.hinh_anh)
    .slice(0, 4);

  // Lấy size và màu từ variants
  const attributeNames: string[] = product?.variants?.length
    ? Array.from(new Set(product.variants.flatMap((v) => v.thuoc_tinh.map((a) => a.ten))))
    : [];



  const isAllAttributesSelected = attributeNames.every((attr) => !!selectedAttributes[attr]);

  // Tìm variant phù hợp
  const selectedVariant = product?.variants?.length
    ? product.variants.find((v) =>
      attributeNames.every((attr) =>
        selectedAttributes[attr]
          ? v.thuoc_tinh.some((a) => a.ten === attr && a.gia_tri === selectedAttributes[attr])
          : false
      )
    ) || null
    : null;

  // Tự động chọn biến thể đầu tiên có hàng khi component mount
  useEffect(() => {
    if (product?.variants?.length && attributeNames.length && Object.keys(selectedAttributes).length === 0) {
      // Tìm biến thể còn hàng đầu tiên
      const firstAvailableVariant = product.variants.find(v => v.so_luong > 0) || product.variants[0];
      if (firstAvailableVariant) {
        const defaultAttributes: { [key: string]: string } = {};
        firstAvailableVariant.thuoc_tinh.forEach((attr) => {
          defaultAttributes[attr.ten] = attr.gia_tri;
        });
        setSelectedAttributes(defaultAttributes);
      }
    }
  }, [product, attributeNames]);

  // Tự động chuyển sang biến thể khác khi biến thể hiện tại hết hàng
  useEffect(() => {
    if (selectedVariant && selectedVariant.so_luong === 0 && product?.variants?.length) {
      // Lưu biến thể hiện tại trước khi thay đổi
      setPreviousVariant(selectedVariant);
      setIsAutoChange(true);

      // Tìm biến thể khác còn hàng
      const availableVariant = product.variants.find(v => v.so_luong > 0);

      if (availableVariant) {
        // Cập nhật thuộc tính để chọn biến thể có hàng
        const newAttributes: { [key: string]: string } = {};
        availableVariant.thuoc_tinh.forEach((attr) => {
          newAttributes[attr.ten] = attr.gia_tri;
        });
        setSelectedAttributes(newAttributes);
      } else {
        // Nếu không có biến thể nào còn hàng, chọn biến thể đầu tiên
        const firstVariant = product.variants[0];
        if (firstVariant) {
          const newAttributes: { [key: string]: string } = {};
          firstVariant.thuoc_tinh.forEach((attr) => {
            newAttributes[attr.ten] = attr.gia_tri;
          });
          setSelectedAttributes(newAttributes);
        }
      }
    }
  }, [selectedVariant, product]);

  // Cập nhật số lượng khi biến thể thay đổi
  useEffect(() => {
    if (selectedVariant && quantity > selectedVariant.so_luong) {
      setQuantity(Math.min(quantity, selectedVariant.so_luong));
    }
  }, [selectedVariant, quantity]);

  // Kiểm tra và tự động chuyển biến thể khi hết hàng
  useEffect(() => {
    if (selectedVariant && selectedVariant.so_luong === 0 && product?.variants?.length) {
      setIsSearchingVariant(true);

      // Tìm biến thể khác còn hàng
      const availableVariant = product.variants.find(v => v.so_luong > 0);

      if (availableVariant && availableVariant.id !== selectedVariant.id) {
        // Lưu biến thể hiện tại trước khi thay đổi
        setPreviousVariant(selectedVariant);
        setIsAutoChange(true);

        // Cập nhật thuộc tính để chọn biến thể có hàng
        const newAttributes: { [key: string]: string } = {};
        availableVariant.thuoc_tinh.forEach((attr) => {
          newAttributes[attr.ten] = attr.gia_tri;
        });
        setSelectedAttributes(newAttributes);
      }

      // Reset searching state sau 2 giây
      setTimeout(() => {
        setIsSearchingVariant(false);
      }, 2000);
    }
  }, [selectedVariant?.so_luong, product]);

  // Reset isAutoChange sau khi thông báo hiển thị
  useEffect(() => {
    if (isAutoChange) {
      const timer = setTimeout(() => {
        setIsAutoChange(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAutoChange]);

  const gia = selectedVariant ? Number(selectedVariant.gia) : product?.gia ? Number(product.gia) : undefined;
  const giaKhuyenMai = selectedVariant ? Number(selectedVariant.gia_khuyen_mai) : product?.gia_khuyen_mai ? Number(product.gia_khuyen_mai) : undefined;
  const maxQuantity = selectedVariant ? selectedVariant.so_luong : product?.so_luong || 1;

  // Hàm format giá an toàn
  const safeLocaleString = (value: number | string | undefined | null) =>
    typeof value === "number"
      ? value.toLocaleString("vi-VN")
      : typeof value === "string" && !isNaN(Number(value))
        ? Number(value).toLocaleString("vi-VN")
        : "0";

  const handleAddToCart = async () => {
    const isLoggedIn = !!localStorage.getItem("accessToken");

    if (!isLoggedIn) {
      Modal.warning({
        title: "Bạn chưa đăng nhập",
        content: "Vui lòng đăng nhập để thêm vào giỏ hàng!",
        centered: true,
        okText: "Đăng nhập ngay",
        onOk: () => navigate("/login"),
      });
      return;
    }

    if (!product) {
      Modal.error({ title: "Lỗi", content: "Không tìm thấy sản phẩm.", centered: true });
      return;
    }

    if (!isAllAttributesSelected) {
      Modal.info({
        title: "Thông báo",
        content: "Vui lòng chọn đầy đủ các thuộc tính!",
        centered: true,
      });
      return;
    }

    try {
      await addToCart({
        san_pham_id: product.id,
        so_luong: quantity,
        bien_the_id: selectedVariant?.id,
      });
      message.success("Đã thêm vào giỏ hàng!");
    } catch {
      message.error("Không thể thêm sản phẩm.");
    }
  };

  const handleBuyNow = () => {
    const isLoggedIn = !!localStorage.getItem("accessToken");
    if (!isLoggedIn) {
      Modal.warning({
        title: "Bạn chưa đăng nhập",
        content: "Vui lòng đăng nhập để mua hàng!",
        centered: true,
        okText: "Đăng nhập ngay",
        onOk: () => navigate("/login"),
      });
      return;
    }
    // Kiểm tra động
    if (!isAllAttributesSelected) {
      Modal.info({ title: "Thông báo", content: "Vui lòng chọn đầy đủ các thuộc tính!", centered: true });
      return;
    }
    if (!product || !selectedVariant) {
      Modal.info({ title: "Thông báo", content: "Không tìm thấy biến thể phù hợp!", centered: true });
      return;
    }
    navigate("/thanh-toan", {
      state: {
        productOrder: {
          productId: product.id,
          productName: product.ten,
          variantId: selectedVariant.id,
          quantity,
          attributes: selectedVariant.thuoc_tinh, // <-- truyền toàn bộ thuộc tính động
          price: gia,
          discountPrice: giaKhuyenMai,
          image: productImages[selectedImage],
          description: product.mo_ta,
        },
      },
    });
  };

  const handleSelectVariantImage = (variant: Variant, index: number) => {


    setSelectedImage(index); // Đổi ảnh to sang ảnh biến thể đó
  };

  const getVariantImage = (hinh_anh: string | string[] | undefined) => {
    if (!hinh_anh) return "/placeholder.svg";
    if (Array.isArray(hinh_anh)) return getImageUrl(hinh_anh[0]);
    try {
      // Nếu là string dạng JSON array
      const arr = JSON.parse(hinh_anh);
      if (Array.isArray(arr) && arr.length > 0) return getImageUrl(arr[0]);
    } catch {
      // Nếu là string path thông thường
      return getImageUrl(hinh_anh);
    }
    return "/placeholder.svg";
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải chi tiết sản phẩm...</div>
  }
  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Không tìm thấy sản phẩm.</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Trang chủ
            </a>
            <span className="mx-2">/</span>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Áo thể thao
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Áo thun thể thao Nike Dri-FIT</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12">
          {/* Product Images */}
          <ProductImages
            productImages={productImages}
            variantThumbnails={variantThumbnails}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            handleSelectVariantImage={handleSelectVariantImage}
            getVariantImage={getVariantImage}
            selectedVariant={selectedVariant}
          />

          {/* Product Info */}
          <div className="space-y-6">
            <ProductInfo
              product={product}
              selectedAttributes={selectedAttributes}
              setSelectedAttributes={setSelectedAttributes}
              attributeNames={attributeNames}
              selectedVariant={selectedVariant}
              gia={gia}
              giaKhuyenMai={giaKhuyenMai}
              safeLocaleString={safeLocaleString}
              isAllAttributesSelected={isAllAttributesSelected}
              maxQuantity={maxQuantity}
              isSearchingVariant={isSearchingVariant}
            />

            <ProductActions
              quantity={quantity}
              setQuantity={setQuantity}
              maxQuantity={maxQuantity}
              selectedVariant={selectedVariant}
              product={product}
              safeLocaleString={safeLocaleString}
              handleAddToCart={handleAddToCart}
              handleBuyNow={handleBuyNow}
            />

            <ServiceInfo />
          </div>
        </div>

        {/* Product Details Tabs */}

        <div className="mt-16">
  {/* Tiêu đề giống tab "Đánh giá (234)" */}
  <div className="border-b border-gray-200">
    <div className="flex space-x-8">
      <div className="py-4 px-1 border-b-2 font-medium text-sm text-blue-600 border-blue-500">
        Đánh giá ({reviewData?.meta?.tong_danh_gia ?? 0})
      </div>
    </div>
  </div>

  <div className="mt-8 space-y-6">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-gray-900">Đánh giá khách hàng</h3>
      {profile ? (
        <button
          className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setShowReviewForm(true)}
        >
          Viết đánh giá
        </button>
      ) : (
        <button
          className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => navigate("/login")}
        >
          Đăng nhập để đánh giá
        </button>
      )}
    </div>

    {/* Form viết đánh giá */}
    {showReviewForm && (
      <form
        className="space-y-4 border p-4 rounded-lg"
        onSubmit={handleSubmitReview}
      >
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
          <label className="block font-semibold mb-1">
            Hình ảnh (tùy chọn):
          </label>
          <input
            type="file"
            name="hinh_anh"
            accept="image/*"
            onChange={handleReviewFile}
          />
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

    {/* Tổng quan sao */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-2">
          {reviewData?.meta?.trung_binh_sao ?? 0}
        </div>
        <div className="flex justify-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              filled={i < (reviewData?.meta?.trung_binh_sao ?? 0)}
            />
          ))}
        </div>
        <p className="text-gray-600">
          {reviewData?.meta?.tong_danh_gia ?? 0} đánh giá
        </p>
      </div>
      <div className="md:col-span-2 space-y-4">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 w-8">{stars} sao</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all"
                style={{
                  width: `${
                    ((reviewData?.meta?.so_luong_theo_sao?.[stars] ?? 0) /
                      (reviewData?.meta?.tong_danh_gia || 1)) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 w-8">
              {reviewData?.meta?.so_luong_theo_sao?.[stars] ?? 0}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Danh sách đánh giá */}
    <div className="space-y-6 mt-8">
      {loadingReviews ? (
        <div>Đang tải đánh giá...</div>
      ) : reviewData?.data?.length ? (
        reviewData.data.map((r: any, index: number) => (
          <div
            key={r.id || index}
            className="border-b border-gray-200 pb-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  {r.user?.anh_dai_dien ? (
                    <img
                      src={r.user.anh_dai_dien}
                      alt="avatar"
                      className="w-10 h-10 object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold">
                      {r.user?.name?.charAt(0) || "?"}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {r.user?.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {Array.from({ length: r.so_sao }).map((_, i) => (
                        <StarIcon key={i} filled className="w-4 h-4" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {r.created_at?.slice(0, 10)}
                    </span>
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
        ))
      ) : (
        <div>Chưa có đánh giá nào cho sản phẩm này.</div>
      )}
    </div>
  </div>
</div>



        {/* Related Products */}
        <RelatedProducts />
      </div>

      {/* Variant Change Notification */}
      <VariantNotification
        selectedVariant={selectedVariant}
        previousVariant={previousVariant}
        isAutoChange={isAutoChange}
      />

      {/* Test Component - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <VariantTest
          variants={product?.variants || []}
          selectedVariant={selectedVariant}
          onVariantChange={(variant) => {
            const newAttributes: { [key: string]: string } = {};
            variant.thuoc_tinh.forEach((attr) => {
              newAttributes[attr.ten] = attr.gia_tri;
            });
            setSelectedAttributes(newAttributes);
          }}
        />
      )}
    </div>
  )
}

export default ProductDetailclientPage