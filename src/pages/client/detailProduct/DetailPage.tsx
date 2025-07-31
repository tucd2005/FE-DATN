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
  VariantNotification
} from './components';

const ProductDetailclientPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();

  const { data: product, isLoading } = useProductDetail(Number(id));
  const { addToCart } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
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

  // State để theo dõi biến thể trước đó và trạng thái tự động chuyển
  const [previousVariant, setPreviousVariant] = useState<Variant | null>(null);
  const [isAutoChange, setIsAutoChange] = useState(false);

  // Tự động chọn biến thể đầu tiên nếu chưa chọn gì
  useEffect(() => {
    if (
      product?.variants?.length &&
      attributeNames.length &&
      Object.keys(selectedAttributes).length === 0
    ) {
      // Tìm biến thể còn hàng đầu tiên
      const firstAvailableVariant = product.variants.find(v => v.so_luong > 0) || product.variants[0];
      const defaultAttributes: { [key: string]: string } = {};
      firstAvailableVariant.thuoc_tinh.forEach((attr) => {
        defaultAttributes[attr.ten] = attr.gia_tri;
      });
      setSelectedAttributes(defaultAttributes);
    }
  }, [product, attributeNames]);

  // Logic tự động chuyển biến thể khi hết hàng
  useEffect(() => {
    if (selectedVariant && selectedVariant.so_luong === 0) {
      setPreviousVariant(selectedVariant);
      setIsAutoChange(true);

      // Tìm biến thể khác còn hàng
      const availableVariant = product?.variants?.find(v =>
        v.so_luong > 0 &&
        v.id !== selectedVariant.id
      );

      if (availableVariant) {
        // Tạo attributes mới cho biến thể có sẵn
        const newAttributes: { [key: string]: string } = {};
        availableVariant.thuoc_tinh.forEach((attr) => {
          newAttributes[attr.ten] = attr.gia_tri;
        });
        setSelectedAttributes(newAttributes);
      }
    } else {
      setIsAutoChange(false);
    }
  }, [selectedVariant, product?.variants]);

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

  const getVariantImage = (hinh_anh: string | string[] | undefined | null) => {
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
      {/* Variant Notification */}
      <VariantNotification
        selectedVariant={selectedVariant || null}
        previousVariant={previousVariant}
        isAutoChange={isAutoChange}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Trang chủ
            </a>
            <span className="mx-2">/</span>
            <a href="#" className="hover:text-blue-600 transition-colors">
              {product.ten_danh_muc || product.danh_muc?.ten || "Danh mục"}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.ten}</span>
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
            selectedVariant={selectedVariant || null}
          />

          {/* Product Info */}
          <div className="space-y-6">
            <ProductInfo
              product={product}
              selectedAttributes={selectedAttributes}
              setSelectedAttributes={setSelectedAttributes}
              attributeNames={attributeNames}
              selectedVariant={selectedVariant || null}
              gia={gia}
              giaKhuyenMai={giaKhuyenMai}
              safeLocaleString={safeLocaleString}
              isAllAttributesSelected={isAllAttributesSelected}
            />

            <ProductActions
              quantity={quantity}
              setQuantity={setQuantity}
              maxQuantity={maxQuantity}
              selectedVariant={selectedVariant || null}
              product={product}
              safeLocaleString={safeLocaleString}
              handleAddToCart={handleAddToCart}
              handleBuyNow={handleBuyNow}
            />

            <ServiceInfo />
          </div>
        </div>

        {/* Product Details Tabs */}
        <ProductTabs
          productId={productId}
          selectedVariant={selectedVariant || null}
        />

        {/* Related Products */}
        <RelatedProducts />
      </div>
    </div>
  )
}

export default ProductDetailclientPage