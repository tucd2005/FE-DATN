import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useProductDetail } from "../../../hooks/useProduct"
import type { Variant } from "../../../types/product.type"
import { Modal, notification } from "antd"

export default function ProductDetailclientPage() {
  const { id } = useParams<{ id: string }>()
  const {
    data: product,
    isLoading,
    error,
  } = useProductDetail(Number(id))
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  // Hàm chuẩn hóa đường dẫn ảnh
  const getImageUrl = (img: string) => {
    if (!img) return "/placeholder.svg?height=600&width=600";
    if (img.startsWith("http")) return img;
    return `http://localhost:8000/storage/${img}`;
  };


  const handleBuyNow = () => {
    const isLoggedIn = !!localStorage.getItem("accessToken");
  
    if (!isLoggedIn) {
      Modal.warning({
        title: "Bạn chưa đăng nhập",
        content: "Vui lòng đăng nhập để tiếp tục mua hàng!",
        centered: true,        // Hiển thị ở giữa màn hình
        okText: "Đăng nhập ngay",
        onOk: () => {
          navigate("/login");
        },
      });
      return;
    }
  
    if (!product) {
      Modal.error({
        title: "Lỗi",
        content: "Không tìm thấy thông tin sản phẩm. Vui lòng thử lại!",
        centered: true,
      });
      return;
    }
  
    if (!selectedColor || !selectedVariant) {
      Modal.info({
        title: "Thông báo",
        content: "Vui lòng chọn màu và kích thước trước khi mua!",
        centered: true,
      });
      return;
    }
  
    navigate("/thanh-toan", {
      state: {
        productId: product.id,
        productName: product.ten,
        variantId: selectedVariant.id,
        quantity,
        color: selectedColor,
        size: selectedSize,
        price: gia,
        discountPrice: giaKhuyenMai,
        image: productImages[selectedImage],
      },
    });
  };

  // Chuẩn hóa dữ liệu ảnh
  const productImages: string[] =
    product && Array.isArray(product.hinh_anh)
      ? product.hinh_anh.map(getImageUrl)
      : product && typeof product.hinh_anh === "string"
        ? [getImageUrl(product.hinh_anh)]
        : ["/placeholder.svg?height=1200&width=1200"]

  // Lấy size và màu từ variants nếu 
  const sizes: string[] = product && product.variants && product.variants.length > 0
    ? Array.from(new Set((product.variants as Variant[]).flatMap((v) => v.thuoc_tinh.filter((a) => a.ten === "Kích cỡ").map((a) => a.gia_tri))))
    : []
  const colorNames: string[] = product && product.variants && product.variants.length > 0
    ? Array.from(new Set((product.variants as Variant[]).flatMap((v) => v.thuoc_tinh.filter((a) => a.ten === "Màu sắc").map((a) => a.gia_tri))))
    : []
  const colors: { name: string, value: string }[] = colorNames.map((name: string) => ({ name, value: name }))

  // Set mặc định size/color nếu có
  useEffect(() => {
    // if (sizes.length > 0 && !selectedSize) setSelectedSize(String(sizes[0]))
    // if (colors.length > 0 && !selectedColor) setSelectedColor(String(colors[0].name))
    // eslint-disable-next-line
    console.log(sizes)
    console.log(colorNames)
  }, [sizes, colors])
  console.log(product)
  // Hàm format giá an toàn
  const safeLocaleString = (value: number | string | undefined | null) =>
    typeof value === "number"
      ? value.toLocaleString("vi-VN")
      : typeof value === "string" && !isNaN(Number(value))
        ? Number(value).toLocaleString("vi-VN")
        : "0"

  // Tìm variant phù hợp với màu và size đã chọn
  const selectedVariant = product && product.variants && product.variants.length > 0
    ? (product.variants as Variant[]).find((v) => {
      const hasColor = v.thuoc_tinh.some((a) => a.ten === "Màu sắc" && a.gia_tri === selectedColor);
      const hasSize = selectedSize ? v.thuoc_tinh.some((a) => a.ten === "Kích cỡ" && a.gia_tri === selectedSize) : true;
      return hasColor && hasSize;
    })
    : null;
  const gia = selectedVariant ? selectedVariant.gia : product?.gia;
  const giaKhuyenMai = selectedVariant ? selectedVariant.gia_khuyen_mai : product?.gia_khuyen_mai;

  const maxQuantity = selectedVariant ? selectedVariant.so_luong : product?.so_luong || 1;

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

  const ShareIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
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
                src={productImages[selectedImage] || "/placeholder.svg"}
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
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden transition-colors ${selectedImage === index ? "border-blue-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    className="aspect-square w-full object-cover rounded"
                  />
                </button>
              ))}
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
              <span className="text-3xl font-bold text-blue-600">{gia ? `${safeLocaleString(gia)}đ` : "Liên hệ"}</span>
              {giaKhuyenMai && (
                <>
                  <span className="text-xl text-gray-500 line-through">{safeLocaleString(giaKhuyenMai)}đ</span>
                  <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    -{gia && giaKhuyenMai ? Math.round(100 - (Number(giaKhuyenMai) / Number(gia)) * 100) : 0}%
                  </div>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.mo_ta}</p>


            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Màu sắc:</h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-4 transition-colors ${selectedColor === color.name ? "border-blue-500" : "border-gray-200"
                      }`}
                    style={{ backgroundColor: color.value }}
                  >
                    {color.name === "white" && <div className="w-full h-full rounded-full border border-gray-200" />}
                  </button>
                ))}
              </div>
            </div>


            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Kích thước:</h3>
              <div className="flex space-x-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border-2 rounded-lg font-semibold transition-colors ${selectedSize === size
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
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
              <button className="w-fit bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                <ShoppingCartIcon />
                <span className="text-sm">Thêm vào giỏ hàng</span>
              </button>

              <button
                onClick={handleBuyNow}
              className="w-fit border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 py-2 px-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                <ShoppingCartIcon  />
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

      {/* Footer */}
      <footer className="bg-gray-100 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Sportigo</span>
              </div>
              <p className="text-gray-600 mb-4">
                Cửa hàng đồ thể thao trực tuyến hàng đầu Việt Nam với hàng ngàn sản phẩm chất lượng từ các thương hiệu
                uy tín.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Sản phẩm
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Khuyến mãi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Hỗ trợ khách hàng</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Trung tâm trợ giúp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Chính sách giao hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Đổi trả hàng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Bảo hành sản phẩm
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Liên hệ</h3>
              <div className="space-y-2 text-gray-600">
                <p>📞 1900 2024</p>
                <p>✉️ support@sportigo.vn</p>
                <p>📍 456 Lê Văn Việt, Quận 9, TP.HCM</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>© 2024 Sportigo. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
