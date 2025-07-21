
import { useState, useEffect } from "react";
import { CreditCard, Banknote } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCheckout, useVnpayPayment } from "../../../hooks/useCheckout";
import axios from "axios";

import type { CreateOrderPayload } from "../../../services/checkoutService";
import { useCartStore } from "../../../stores";
import { useCheckDiscountCode } from "../../../hooks/useDiscountCodes";
import { useUserDiscountCodes } from "../../../hooks/useDiscountCodes";
import { toast } from "react-toastify";
import { useZaloPay } from "../../../hooks/usezaloplay";
import ShippingAddressForm from "./components/ShippingAddressForm";
import ShippingMethod from "./components/ShippingMethod";
import PaymentMethod from "./components/PaymentMethod";
import OrderSummary from "./components/OrderSummary";
import { useShippingFee } from "../../../hooks/useship";

// Định nghĩa kiểu cho cartItems, productOrder, item
interface CartItem {
  san_pham_id: number;
  bien_the?: {
    id: number;
    thuoc_tinh?: { ten_thuoc_tinh: string; gia_tri: string }[];
    hinh_anh?: string;
  };
  ten_san_pham: string;
  so_luong: number;
  gia_san_pham: number;
  hinh_anh: string;
  attributes?: { ten: string; gia_tri: string }[];
}
interface ProductOrder {
  productId: number;
  variantId: number;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  discountPrice?: number;
  image: string;
  description: string;
  attributes?: { ten: string; gia_tri: string }[];
}

function normalizeProvinceName(name: string) {
  return name.replace(/^Tỉnh |^Thành phố /, "");
}

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCart);
  // Hooks must be called at the top level
  const checkoutMutation = useCheckout();
  const vnpayMutation = useVnpayPayment();
  const zaloPayMutation = useZaloPay();

  const [selectedPayment, setSelectedPayment] = useState("vnpay");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [tenNguoiDat, setTenNguoiDat] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [provinces, setProvinces] = useState<Array<{ code: string; name: string; districts?: Array<{ code: string; name: string; wards?: Array<{ code: string; name: string }> }> }>>([]);
  const [districts, setDistricts] = useState<Array<{ code: string; name: string; wards?: Array<{ code: string; name: string }> }>>([]);
  const [wards, setWards] = useState<Array<{ code: string; name: string }>>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  // Đã dùng toast từ react-toastify, không cần state showToast/toastMessage nữa
  const [isLoading, setIsLoading] = useState(false);
  const [formError] = useState<string | null>(null);

  const [discountCode, setDiscountCode] = useState("");
  const [discountInfo, setDiscountInfo] = useState<null | {
    ma: string;
    giam_gia: number;
    tong_phai_tra: number;
  }>(null);

  const checkDiscountMutation = useCheckDiscountCode();
  const { data: userDiscountCodes } = useUserDiscountCodes();

  // Lấy dữ liệu truyền sang
  const state = location.state || {};
  const productOrder: ProductOrder | undefined = state.productOrder;
  const cartItems: CartItem[] | undefined = state.cartItems;

  // Thay thế showToastMessage bằng toast

  const validateForm = () => {
    if (!tenNguoiDat || tenNguoiDat.trim().length < 2) {
      return "Vui lòng nhập họ và tên hợp lệ (tối thiểu 2 ký tự)!";
    }
    if (!phone || !/^0\d{9}$/.test(phone)) {
      return "Vui lòng nhập số điện thoại hợp lệ (10 số, bắt đầu bằng 0)!";
    }
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return "Vui lòng nhập email hợp lệ!";
    }
    if (!address || address.trim().length < 5) {
      return "Vui lòng nhập địa chỉ cụ thể (tối thiểu 5 ký tự)!";
    }
    if (!selectedProvince) {
      return "Vui lòng chọn tỉnh/thành phố!";
    }
    if (!selectedDistrict) {
      return "Vui lòng chọn quận/huyện!";
    }
    if (!selectedWard) {
      return "Vui lòng chọn phường/xã!";
    }
    return null;
  };

  // Xử lý dữ liệu đơn hàng
  let orderItems: Array<{
    san_pham_id: number;
    bien_the_id: number | null;
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
    discountPrice: number | null;
    image: string;

    
    description: string;
    attributes?: Array<{ ten: string; gia_tri: string }>;
    bien_the?: any;
  }> = [];

  if (productOrder) {
    orderItems = [
      {
        san_pham_id: productOrder.productId,
        bien_the_id: productOrder.variantId,
        name: productOrder.productName,
        size: productOrder.size,
        color: productOrder.color,
        quantity: productOrder.quantity,
        price: productOrder.discountPrice || productOrder.price,
        discountPrice: productOrder.discountPrice,
        image: productOrder.image,
        description: productOrder.description,
        attributes: productOrder.attributes,
      }
    ];
  } else if (cartItems && cartItems.length > 0) {
    console.log("Cart items:", cartItems);
    orderItems = cartItems.map((item: CartItem) => {
      return {
        san_pham_id: item.san_pham_id,
        bien_the_id: typeof item.bien_the?.id === 'number' ? item.bien_the.id : 0,
        name: item.ten_san_pham,
        size: item.bien_the?.thuoc_tinh?.find((t) => t.ten_thuoc_tinh === "Kích cỡ")?.gia_tri || "",
        color: item.bien_the?.thuoc_tinh?.find((t) => t.ten_thuoc_tinh === "Màu sắc")?.gia_tri || "",
        quantity: item.so_luong,
        price: item.gia_san_pham,
        discountPrice: null,
        image: item.hinh_anh,
        description: "",
        attributes: item.attributes,
        bien_the: item.bien_the,
      };
    });
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price) + "đ";

  const paymentMethods = [
    {
      id: "vnpay",
      name: "VNPay",
      description: "Thanh toán qua VNPay",
      detail: "Hỗ trợ thẻ ATM, Internet Banking, QR Code",
      icon: <CreditCard className="w-5 h-5" />,
      color: "bg-blue-50 border-blue-200 text-blue-700",
      recommended: true,
    },
    {
      id: "cod",
      name: "Thanh toán khi nhận hàng (COD)",
      description: "Trả tiền mặt khi nhận hàng",
      detail: "Thanh toán bằng tiền mặt cho shipper",
      icon: <Banknote className="w-5 h-5" />,
      color: "bg-green-50 border-green-200 text-green-700",
      recommended: false,
    },
    {
      id: "zalopay",
      name: "ZaloPay",
      description: "Thanh toán qua ZaloPay",
      detail: "Hỗ trợ ví điện tử ZaloPay, QR Code",
      icon: <Banknote className="w-5 h-5" />,
      color: "bg-cyan-50 border-cyan-200 text-cyan-700",
      recommended: false,
    },
  ];

  const handleOrder = () => {
    // Check if we have valid data
    if (!productOrder && (!cartItems || cartItems.length === 0)) {
      toast.error("Không có sản phẩm nào để đặt hàng!");
      navigate("/gio-hang");
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Vui lòng đăng nhập để tiếp tục!");
      return;
    }

    const errorMsg = validateForm();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }
  
    const selectedProvinceObj = provinces.find((p) => String(p.code) === String(selectedProvince));
    const selectedDistrictObj = districts.find((d) => String(d.code) === String(selectedDistrict));
    const selectedWardObj = wards.find((w) => String(w.code) === String(selectedWard));
  
    if (!selectedProvinceObj || !selectedDistrictObj || !selectedWardObj) {
      toast.error("Không tìm thấy thông tin địa chỉ, vui lòng chọn lại!");
      return;
    }
  
    const paymentMethodMap: Record<string, { id: number; name: string }> = {
      vnpay: { id: 2, name: "VNPay" },
      cod: { id: 1, name: "Thanh toán khi nhận hàng (COD)" },
      zalopay: { id: 3, name: "ZaloPay" },
    };
    const selectedPaymentMethod = paymentMethodMap[selectedPayment];
    if (!selectedPaymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán hợp lệ!");
      return;
    }
  
    const payload: CreateOrderPayload = {
      ten_nguoi_dat: tenNguoiDat,
      dia_chi: address,
      thanh_pho: selectedProvinceObj.name,
      huyen: selectedDistrictObj.name,
      xa: selectedWardObj.name,
      so_dien_thoai: phone,
      email: email,
      phuong_thuc_thanh_toan: selectedPaymentMethod.name,
      phuong_thuc_thanh_toan_id: selectedPaymentMethod.id,
      tong_tien: discountInfo ? discountInfo.tong_phai_tra : total,
      items: orderItems.map((item) => ({
        san_pham_id: item.san_pham_id,
        bien_the_id: typeof item.bien_the_id === 'number' ? item.bien_the_id : 0,
        ten_san_pham: item.name,
        hinh_anh: item.image,
        so_luong: Number(item.quantity),
        don_gia: Number(item.price),
        tong_tien: Number(item.price) * Number(item.quantity),
        thuoc_tinh_bien_the: [
          { gia_tri: item.size, thuoc_tinh: "Kích cỡ" },
          { gia_tri: item.color, thuoc_tinh: "Màu sắc" },
        ].filter(attr => attr.gia_tri !== ""),
      })),
      // Nếu backend hỗ trợ mã giảm giá, hãy thêm vào interface CreateOrderPayload và truyền ở đây
      // ma_giam_gia: discountInfo?.ma || undefined,
    };
  
   
    setIsLoading(true);
  
    checkoutMutation.mutate(payload, {
      onSuccess: async (data) => {
  
        await clearCart(); 
        console.log("selectedPayment:", selectedPayment, data);
        if (selectedPayment === "zalopay") {
          try {
            if (!data.order || !data.order.id) {
              toast.error("Không lấy được ID đơn hàng từ server!");
              return;
            }
            const zaloPayPayload = {
              don_hang_id: data.order.id,
              phuong_thuc_thanh_toan_id: 3,
            };
            const zaloPayData = await zaloPayMutation.mutateAsync(zaloPayPayload);
            console.log("ZaloPay trả về:", zaloPayData);
            if (zaloPayData?.pay_url) {
              window.location.href = zaloPayData.pay_url;
            } else {
              toast.error("Không nhận được link thanh toán ZaloPay!");
            }
          } catch (error) {
            toast.error("Thanh toán ZaloPay thất bại!");
          }
          return;
        }
        if (selectedPayment === "vnpay") {
          try {
            if (!data.order || !data.order.id) {
              toast.error("Không lấy được ID đơn hàng từ server!");
              return;
            }
      
            const vnpayPayload = {
              don_hang_id: data.order.id,  // ✅ dùng id
              phuong_thuc_thanh_toan_id: 2,
              ngon_ngu: "vn"
            };
            console.log("Payload gửi đến VNPAY:", vnpayPayload);
      
            const vnpayData = await vnpayMutation.mutateAsync(vnpayPayload);
      
            console.log("VNPAY trả về:", vnpayData);
            if (vnpayData?.pay_url) {
              window.location.href = vnpayData.pay_url;
            } else {
              toast.error("Không nhận được link thanh toán VNPAY!");
            }
          } catch (error) {
            console.error("Lỗi khi gọi VNPAY:", error);
            if (error && typeof error === 'object' && 'response' in error) {
              const response = (error as { response?: { data?: { message?: string; errors?: Record<string, unknown> } } }).response;
              console.error("VNPAY error response:", response?.data);
      
              if (response?.data?.errors) {
                toast.error(`Lỗi VNPAY: ${JSON.stringify(response.data.errors)}`);
              } else {
                toast.error(`Thanh toán VNPAY thất bại: ${response?.data?.message || 'Lỗi không xác định'}`);
              }
            } else {
              
              toast.error("Thanh toán VNPAY thất bại!");
            }
          }
        } else {
          // COD → điều hướng sang trang cảm ơn
          navigate("/cam-on", {
            state: { orderCode: data.ma_don_hang }
          });
        }
      },
      
      onError: (err: unknown) => {
        console.error("Lỗi khi đặt hàng:", err);
        if (err && typeof err === 'object' && 'response' in err) {
          const response = (err as { response?: { data?: { message?: string } } }).response;
          console.error("Server response:", response?.data);
          toast.error(`Đặt hàng thất bại: ${response?.data?.message || 'Lỗi server'}`);
        } else {
          toast.error("Đặt hàng thất bại. Vui lòng thử lại!");
        }
      },
      onSettled: () => setIsLoading(false),
    });
  }

  // Fetch provinces/districts/wards from open API
  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/?depth=3").then((res) => {
      const data = res.data;
      setProvinces(
        data.map((province: any) => ({
          code: String(province.code),
          name: province.name,
          districts: province.districts.map((d: any) => ({
            code: String(d.code),
            name: d.name,
            wards: d.wards.map((w: any) => ({ code: String(w.code), name: w.name })),
          })),
        }))
      );
    });
  }, []);

  // Update districts when province changes
  useEffect(() => {
    const province = provinces.find((p) => String(p.code) === String(selectedProvince));
    setDistricts(province?.districts || []);
    setSelectedDistrict("");
    setWards([]);
    setSelectedWard("");
  }, [selectedProvince, provinces]);

  // Update wards when district changes
  useEffect(() => {
    const district = districts.find((d) => String(d.code) === String(selectedDistrict));
    setWards(district?.wards || []);
    setSelectedWard("");
  }, [selectedDistrict, districts]);

  // Đã chuyển getBienTheImg sang component con, không cần ở đây nữa

  // Check if we have valid data - render empty state if not
  if (!productOrder && (!cartItems || cartItems.length === 0)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không có sản phẩm nào để đặt hàng</h1>
          <p className="text-gray-600 mb-6">Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
          <button
            onClick={() => navigate("/gio-hang")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Đi đến giỏ hàng
          </button>
        </div>
      </div>
    );
  }

  const selectedProvinceObj = provinces.find((p) => String(p.code) === String(selectedProvince));
  const provinceNameForApi = selectedProvinceObj?.name ? normalizeProvinceName(selectedProvinceObj.name) : "";
  const { shippingFee = 0 } = useShippingFee(provinceNameForApi);

  console.log("Tên tỉnh gửi lên API:", provinceNameForApi);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Toast sẽ được hiển thị bởi react-toastify */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thanh toán đơn hàng</h1>
          <p className="text-gray-600">Vui lòng kiểm tra thông tin và hoàn tất đơn hàng của bạn</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái */}
          <div className="lg:col-span-2 space-y-6">
            {/* Địa chỉ giao hàng */}
            <ShippingAddressForm
              tenNguoiDat={tenNguoiDat}
              setTenNguoiDat={setTenNguoiDat}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              address={address}
              setAddress={setAddress}
              note={note}
              setNote={setNote}
              provinces={provinces}
              districts={districts}
              wards={wards}
              selectedProvince={selectedProvince}
              setSelectedProvince={setSelectedProvince}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              selectedWard={selectedWard}
              setSelectedWard={setSelectedWard}
              formError={formError}
            />
            {/* Phương thức vận chuyển */}
            <ShippingMethod selectedProvince={provinceNameForApi} />
            {/* Phương thức thanh toán */}
            <PaymentMethod
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              paymentMethods={paymentMethods}
            />
          </div>
          {/* Cột phải - Đơn hàng */}
          <div className="lg:col-span-1">
            <OrderSummary
              orderItems={orderItems}
              discountCode={discountCode}
              setDiscountCode={setDiscountCode}
              discountInfo={discountInfo}
              setDiscountInfo={setDiscountInfo}
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              userDiscountCodes={userDiscountCodes}
              checkDiscountMutation={checkDiscountMutation}
              formatPrice={formatPrice}
              agreedToTerms={agreedToTerms}
              setAgreedToTerms={setAgreedToTerms}
              isLoading={isLoading}
              handleOrder={handleOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
