import { useState, useEffect } from "react";
import { CreditCard, Banknote } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCheckout, useVnpayPayment } from "../../../hooks/useCheckout";

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

// Định nghĩa kiểu cho API tỉnh thành
interface Province {
  code: string;
  name: string;
  wards?: Ward[];
}

interface Ward {
  code: string;
  name: string;
}

// Định nghĩa kiểu cho API response thực tế
interface VietnamProvinceResponse {
  success: boolean;
  data: Array<{
    province: string;
    id: string;
    wards: Array<{
      name: string;
      mergedFrom: string[];
    }>;
  }>;
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
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
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

  // Move useShippingFee hook to top level to avoid conditional calling
  const selectedProvinceObj = provinces.find((p) => String(p.code) === String(selectedProvince));
  const provinceNameForApi = selectedProvinceObj?.name || "";
  const { shippingFee = 0 } = useShippingFee(provinceNameForApi);

  console.log("Selected province code:", selectedProvince);
  console.log("Selected province object:", selectedProvinceObj);
  console.log("Province name for API:", provinceNameForApi);

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
    bien_the?: {
      id: number;
      thuoc_tinh?: { ten_thuoc_tinh: string; gia_tri: string }[];
      hinh_anh?: string;
    };
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
        discountPrice: productOrder.discountPrice || null,
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
    const selectedWardObj = wards.find((w) => String(w.code) === String(selectedWard));
  
    if (!selectedProvinceObj || !selectedWardObj) {
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
      huyen: "", // Bỏ huyện
      xa: selectedWardObj.name,
      so_dien_thoai: phone,
      email: email,
      phuong_thuc_thanh_toan: selectedPaymentMethod.name,
      phuong_thuc_thanh_toan_id: selectedPaymentMethod.id,
      ma_giam_gia: discountInfo?.ma || "",
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
          } catch (zaloPayError) {
            console.error("ZaloPay error:", zaloPayError);
            if (zaloPayError && typeof zaloPayError === 'object' && 'response' in zaloPayError) {
              const response = (zaloPayError as { response?: { data?: { error?: string; message?: string } } }).response;
              const errorMessage = response?.data?.error || response?.data?.message || '';
              let friendlyMessage = "Thanh toán ZaloPay thất bại. Vui lòng thử lại!";
              
              if (errorMessage.includes("No query results for model")) {
                friendlyMessage = "Sản phẩm không còn tồn tại. Vui lòng kiểm tra lại giỏ hàng!";
              } else if (errorMessage.includes("không đủ tồn kho")) {
                friendlyMessage = "Sản phẩm không đủ số lượng trong kho!";
              } else if (errorMessage) {
                friendlyMessage = errorMessage;
              }
              
              toast.error(friendlyMessage);
            } else {
              toast.error("Thanh toán ZaloPay thất bại!");
            }
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
              don_hang_id: data.order.id,
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
              const response = (error as { response?: { data?: { error?: string; message?: string; errors?: Record<string, unknown> } } }).response;
              console.error("VNPAY error response:", response?.data);
      
              if (response?.data?.errors) {
                toast.error("Thanh toán VNPAY thất bại. Vui lòng thử lại!");
              } else {
                const errorMessage = response?.data?.error || response?.data?.message || '';
                let friendlyMessage = "Thanh toán VNPAY thất bại. Vui lòng thử lại!";
                
                if (errorMessage.includes("No query results for model")) {
                  friendlyMessage = "Sản phẩm không còn tồn tại. Vui lòng kiểm tra lại giỏ hàng!";
                } else if (errorMessage.includes("không đủ tồn kho")) {
                  friendlyMessage = "Sản phẩm không đủ số lượng trong kho!";
                } else if (errorMessage) {
                  friendlyMessage = errorMessage;
                }
                
                toast.error(friendlyMessage);
              }
            } else {
              toast.error("Thanh toán VNPAY thất bại!");
            }
          }
        } else {
          // COD → điều hướng sang trang cảm ơn
          toast.success("Đặt hàng thành công!");
          navigate("/cam-on", {
            state: { orderCode: data.ma_don_hang }
          });
        }
      },
      
      onError: (err: unknown) => {
        console.error("Lỗi khi đặt hàng:", err);
        if (err && typeof err === 'object' && 'response' in err) {
          const response = (err as { response?: { data?: { error?: string; message?: string } } }).response;
          console.error("Server response:", response?.data);
          
          // Xử lý thông báo lỗi thân thiện
          const errorMessage = response?.data?.error || response?.data?.message || '';
          
          // Chuyển đổi lỗi kỹ thuật thành thông báo thân thiện
          let friendlyMessage = "Đặt hàng thất bại. Vui lòng thử lại!";
          
          if (errorMessage.includes("No query results for model [App\\Models\\Variant]")) {
            friendlyMessage = "Sản phẩm đã hết hàng hoặc đã bị xóa";
          } else if (errorMessage.includes("không đủ tồn kho")) {
            friendlyMessage = "Sản phẩm không đủ số lượng trong kho. Vui lòng giảm số lượng hoặc chọn sản phẩm khác!";
          } else if (errorMessage.includes("không có giá")) {
            friendlyMessage = "Sản phẩm chưa có giá. Vui lòng liên hệ cửa hàng!";
          } else if (errorMessage.includes("Mã giảm giá")) {
            friendlyMessage = errorMessage;
          } else if (errorMessage.includes("Bạn không có quyền")) {
            friendlyMessage = "Vui lòng đăng nhập để đặt hàng!";
          } else if (errorMessage) {
            // Nếu có thông báo lỗi cụ thể từ backend, sử dụng nó
            friendlyMessage = errorMessage;
          }
          
          toast.error(friendlyMessage);
        } else {
          toast.error("Đặt hàng thất bại. Vui lòng thử lại!");
        }
      },
      onSettled: () => setIsLoading(false),
    });
  }

  // Fetch provinces/wards from new API
  useEffect(() => {
    console.log("Đang fetch dữ liệu tỉnh thành...");
    fetch("https://vietnamlabs.com/api/vietnamprovince")
      .then(res => {
        console.log("API Response status:", res.status);
        return res.json();
      })
      .then((result: VietnamProvinceResponse) => {
        console.log("API Response data:", result);
        const data = result.data || [];
        console.log("Số lượng tỉnh nhận được:", data.length);
        
        const mappedProvinces = data.map((province) => ({
          code: String(province.id),
          name: province.province,
          wards: (province.wards || []).map((w, index) => ({
            code: String(index + 1), // Tạo code cho ward
            name: w.name
          }))
        }));
        
        console.log("Provinces đã map:", mappedProvinces);
        setProvinces(mappedProvinces);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
        toast.error("Không thể tải dữ liệu tỉnh thành!");
      });
  }, []);

  // Update wards when province changes
  useEffect(() => {
    const province = provinces.find((p) => String(p.code) === String(selectedProvince));
    setWards(province?.wards || []);
    setSelectedWard("");
  }, [selectedProvince, provinces]);

  // Debug logging
  useEffect(() => {
    console.log("Provinces state updated:", provinces);
    console.log("Số lượng provinces:", provinces.length);
  }, [provinces]);

  console.log("Tên tỉnh gửi lên API:", provinceNameForApi);

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
              wards={wards}
              selectedProvince={selectedProvince}
              setSelectedProvince={setSelectedProvince}
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
              shippingFee={shippingFee || 0}
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
