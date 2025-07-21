import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useProductDetail } from "../../../hooks/useProduct"
import type { Variant } from "../../../types/product.type"
import { message, Modal, notification } from "antd"
import { useCartStore } from "../../../stores/cart.store"

const ProductDetailclientPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProductDetail(Number(id));
  const navigate = useNavigate();
  const { addToCart } = useCartStore();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({});

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
  //Tự động chọn biến thể đầu tiên nếu chưa chọn gì
  useEffect(() => {
    if (
      product?.variants?.length &&
      attributeNames.length &&
      Object.keys(selectedAttributes).length === 0
    ) {
      const firstVariant = product.variants[0];
      const defaultAttributes: { [key: string]: string } = {};

      firstVariant.thuoc_tinh.forEach((attr) => {
        defaultAttributes[attr.ten] = attr.gia_tri;
      });

      setSelectedAttributes(defaultAttributes);
    }
  }, [product, attributeNames]);
  const isAllAttributesSelected = attributeNames.every((attr) => !!selectedAttributes[attr]);

  // Tìm variant phù hợp
  const selectedVariant = product?.variants?.length
    ? product.variants.find((v) =>
      attributeNames.every((attr) =>
        selectedAttributes[attr]
          ? v.thuoc_tinh.some((a) => a.ten === attr && a.gia_tri === selectedAttributes[attr])
          : false
      )
    )
    : null;

  const gia = selectedVariant ? selectedVariant.gia : product?.gia;
  const giaKhuyenMai = selectedVariant ? selectedVariant.gia_khuyen_mai : product?.gia_khuyen_mai;
  const maxQuantity = selectedVariant ? selectedVariant.so_luong : product?.so_luong || 1;

  // Hàm format giá an toàn
  const safeLocaleString = (value: number | string | undefined | null) =>
    typeof value === "number"
      ? value.toLocaleString("vi-VN")
      : typeof value === "string" && !isNaN(Number(value))
        ? Number(value).toLocaleString("vi-VN")
        : "0";

//   const handleAddToCart = async () => {
//     if (!product) {
//       Modal.error({ title: "Lỗi", content: "Không tìm thấy sản phẩm.", centered: true });
//       return;
//     }
//     // XÓA dòng này:
//     // if (!selectedColor) {
//     //   Modal.info({ title: "Thông báo", content: "Vui lòng chọn màu!", centered: true });
//     //   return;
//     // }
//     // THÊM kiểm tra động:
//     if (!isAllAttributesSelected) {
//       Modal.info({ title: "Thông báo", content: "Vui lòng chọn đầy đủ các thuộc tính!", centered: true });
//       return;
//     }
//     try {
//       await addToCart({
//         san_pham_id: product.id,
//         so_luong: quantity,
//         bien_the_id: selectedVariant?.id,
//       });
//       message.success("Đã thêm vào giỏ hàng!");
// } catch (error) {
//   message.error("Không thể thêm sản phẩm.");
// }
//   };

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
  } catch (error) {
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
    // Tìm màu và size của biến thể
    const color = variant.thuoc_tinh.find(a => a.ten === "Màu sắc")?.gia_tri || "";
    const size = variant.thuoc_tinh.find(a => a.ten === "Kích cỡ")?.gia_tri || "";
    setSelectedColor(color);
    setSelectedSize(size);
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
  if (error || !product) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error ? "Không tìm thấy sản phẩm hoặc có lỗi xảy ra." : "Không tìm thấy sản phẩm."}</div>
  }

  const features = [
    "Công nghệ Dri-FIT thấm hút mồ hôi",
    "Chất liệu polyester tái chế",
    "Form regular fit thoải mái",
    "Đường may phẳng giảm ma sát",
    "Logo Nike Swoosh phản quang",
  ]

  const relatedProducts = [
    {
      name: "Áo thể thao Nike Pro",
      price: "1,200,000",
      originalPrice: "1,600,000",
      discount: "-25%",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Quần short Nike Dri-FIT",
      price: "800,000",
      originalPrice: "1,000,000",
      discount: "-20%",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Áo khoác Nike Windrunner",
      price: "1,800,000",
      originalPrice: "2,400,000",
      discount: "-25%",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Giày Nike Air Max",
      price: "2,400,000",
      originalPrice: "3,200,000",
      discount: "-25%",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const StarIcon = ({ filled = true, className = "" }) => (
    <svg
      className={`w-5 h-5 ${filled ? "text-yellow-400 fill-current" : "text-gray-300"} ${className}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )

  const ShoppingCartIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
      />
    </svg>
  )

  const HeartIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  )


  const MinusIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  )

  const PlusIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )

  const TruckIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )

  const ShieldIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  )

  const RotateIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  )

  const ChevronLeftIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )

  const ChevronRightIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )

  const mainImage =
    selectedVariant?.hinh_anh
      ? getVariantImage(selectedVariant.hinh_anh)
      : productImages[selectedImage] || "/placeholder.svg";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}


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
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={mainImage}
                alt={product.ten}
                className="aspect-[4/3] object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                -25%
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : productImages.length - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={() => setSelectedImage(selectedImage < productImages.length - 1 ? selectedImage + 1 : 0)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
              >
                <ChevronRightIcon />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {variantThumbnails.map((variant, idx) => {
                const img = getVariantImage(variant.hinh_anh);
                const color = variant.thuoc_tinh.find(a => a.ten === "Màu sắc")?.gia_tri || "";
                const size = variant.thuoc_tinh.find(a => a.ten === "Kích cỡ")?.gia_tri || "";
                const isActive = selectedVariant?.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    onClick={() => handleSelectVariantImage(variant, idx)}
                    className={`border-2 rounded-lg overflow-hidden transition-colors ${isActive ? "border-blue-500" : "border-gray-200 hover:border-gray-300"}`}
                    title={`Màu: ${color}, Size: ${size}`}
                  >
                    <img src={img} alt={`Variant ${idx + 1}`} className="aspect-square w-full object-cover rounded" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                Áo thể thao
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.ten}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  <StarIcon filled={true} />
                  <StarIcon filled={true} />
                  <StarIcon filled={true} />
                  <StarIcon filled={true} />
                  <StarIcon filled={false} />
                </div>
                <span className="text-gray-600">4.9 (234 đánh giá)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              {giaKhuyenMai !== undefined &&
                gia !== undefined &&
                !isNaN(Number(giaKhuyenMai)) &&
                !isNaN(Number(gia)) &&
                Number(giaKhuyenMai) > 0 &&
                Number(giaKhuyenMai) < Number(gia) ? (
                <>
                  {/* Giá khuyến mãi - in đậm, không gạch */}
                  <span className="text-3xl font-bold text-gray-900">
                    {safeLocaleString(Number(giaKhuyenMai))}đ
                  </span>

                  {/* Giá gốc - bị gạch */}
                  <span className="text-xl text-blue-600 line-through">
                    {safeLocaleString(Number(gia))}đ
                  </span>

                  {/* Phần trăm giảm giá */}
                  <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    -
                    {Math.round(((Number(gia) - Number(giaKhuyenMai)) / Number(gia)) * 100)}%
                  </div>
                </>
              ) : (
                // Trường hợp không có khuyến mãi
                <span className="text-3xl font-bold text-gray-900">
                  {selectedVariant
                    ? `${safeLocaleString(selectedVariant.gia)}đ`
                    : product?.gia
                      ? `${safeLocaleString(product.gia)}đ`
                      : isAllAttributesSelected
                        ? "Liên hệ"
                        : "Vui lòng chọn đầy đủ thuộc tính"}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.mo_ta}</p>


            {/* Attributes Selection */}
            <div className="space-y-4">
              {attributeNames.map((attr) => {
                const values = Array.from(
                  new Set(
                    product.variants.flatMap((v) =>
                      v.thuoc_tinh.filter((a) => a.ten === attr).map((a) => a.gia_tri)
                    )
                  )
                );

                return (
                  <div key={attr}>
                    <h3 className="font-semibold text-gray-900 mb-3">{attr}:</h3>
                    <div className="flex space-x-3 mb-2">
                      {values.map((value) => {
                        const isColor = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
                        const hypotheticalSelected = { ...selectedAttributes, [attr]: value };
                        const matchingVariants = product.variants.filter((v) =>
                          attributeNames.every((a) =>
                            hypotheticalSelected[a]
                              ? v.thuoc_tinh.some((t) => t.ten === a && t.gia_tri === hypotheticalSelected[a])
                              : true
                          )
                        );
                        const isOutOfStock = matchingVariants.length === 0 || matchingVariants.every((v) => v.so_luong === 0);

                        return (
                          <button
                            key={value}
                            onClick={() => {
                              if (isOutOfStock) return;
                              setSelectedAttributes((prev) => {
                                if (prev[attr] === value) {
                                  const newAttrs = { ...prev };
                                  delete newAttrs[attr];
                                  return newAttrs;
                                }
                                return { ...prev, [attr]: value };
                              });
                            }}
                            disabled={isOutOfStock}
                            className={
                              isColor
                                ? `w-10 h-10 rounded-full border-4 transition-colors flex items-center justify-center
                                    ${selectedAttributes[attr] === value ? "border-blue-500" : "border-gray-200 hover:border-gray-300"}
                                    ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`
                                : `border-2 rounded-lg px-4 py-2 font-semibold transition-colors
                                    ${selectedAttributes[attr] === value ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-700 hover:border-gray-300"}
                                    ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""}`
                            }
                            style={isColor ? { backgroundColor: value } : {}}
                            title={isColor ? value : undefined}
                          >
                            {isColor ? "" : value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>


            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Số lượng:</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <MinusIcon />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <PlusIcon />
                  </button>
                </div>
                <span className="text-gray-600">Còn lại {safeLocaleString(selectedVariant ? selectedVariant.so_luong : product?.so_luong)} sản phẩm</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="w-fit bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCartIcon />
                <span className="text-sm">Thêm vào giỏ hàng</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-fit border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 py-2 px-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                <ShoppingCartIcon />
                <span className="text-sm">Mua ngay</span>
              </button>

              <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <HeartIcon />
              </button>

            </div>

            {/* Service Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TruckIcon />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Miễn phí vận chuyển</p>
                  <p className="text-sm text-gray-600">Đơn hàng từ 500k</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <ShieldIcon />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Bảo hành chính hãng</p>
                  <p className="text-sm text-gray-600">12 tháng</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <RotateIcon />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Đổi trả dễ dàng</p>
                  <p className="text-sm text-gray-600">Trong 30 ngày</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: "description", label: "Mô tả" },
                { id: "specifications", label: "Thông số" },
                { id: "reviews", label: "Đánh giá (234)" },
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
                  <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Viết đánh giá
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">4.9</div>
                    <div className="flex justify-center mb-2">
                      <StarIcon filled={true} />
                      <StarIcon filled={true} />
                      <StarIcon filled={true} />
                      <StarIcon filled={true} />
                      <StarIcon filled={true} />
                    </div>
                    <p className="text-gray-600">234 đánh giá</p>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 w-8">{stars} sao</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full transition-all"
                            style={{ width: stars === 5 ? "80%" : stars === 4 ? "15%" : "5%" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {stars === 5 ? "187" : stars === 4 ? "35" : "12"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6 mt-8">
                  {[
                    {
                      name: "Nguyễn Văn A",
                      rating: 5,
                      date: "2 ngày trước",
                      comment: "Chất lượng áo rất tốt, thấm hút mồ hôi hiệu quả. Mặc rất thoải mái khi tập gym.",
                    },
                    {
                      name: "Trần Thị B",
                      rating: 5,
                      date: "1 tuần trước",
                      comment: "Áo đẹp, form chuẩn. Giao hàng nhanh, đóng gói cẩn thận. Sẽ mua thêm màu khác.",
                    },
                    {
                      name: "Lê Văn C",
                      rating: 4,
                      date: "2 tuần trước",
                      comment: "Sản phẩm tốt, giá hợp lý. Chỉ có điều màu hơi khác so với hình ảnh một chút.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold">{review.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{review.name}</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <StarIcon key={i} filled={true} className="w-4 h-4" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    {product.discount}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-blue-600">{product.price}đ</span>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}đ</span>
                    </div>
                    <div className="flex">
                      <StarIcon filled={true} className="w-3 h-3" />
                      <StarIcon filled={true} className="w-3 h-3" />
                      <StarIcon filled={true} className="w-3 h-3" />
                      <StarIcon filled={true} className="w-3 h-3" />
                      <StarIcon filled={true} className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  )
}
export default ProductDetailclientPage