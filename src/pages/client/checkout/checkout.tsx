  "use client"

  import { useState, useEffect } from "react";
  import { MapPin, Truck, CreditCard, Shield, CheckCircle, Banknote, ChevronRight, ChevronDown } from "lucide-react";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useCheckout, useVnpayPayment } from "../../../hooks/useCheckout";
  import axios from "axios";


  import type { CreateOrderPayload } from "../../../services/checkoutService";
  import { useCartStore } from "../../../stores";
  import { useCheckDiscountCode } from "../../../hooks/useDiscountCodes";
  import { useUserDiscountCodes } from "../../../hooks/useDiscountCodes";
  import { toast } from "react-toastify";

  const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const clearCart = useCartStore((state) => state.clearCart);
    // Hooks must be called at the top level
    const checkoutMutation = useCheckout();
    const vnpayMutation = useVnpayPayment();

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
    const { data: userDiscountCodes, isLoading: isLoadingDiscounts } = useUserDiscountCodes();

    // Lấy dữ liệu truyền sang
    const state = location.state || {};
    const productOrder = state.productOrder;
    const cartItems = state.cartItems;

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
      orderItems = cartItems.map((item) => {
        return {
          san_pham_id: item.san_pham_id,
          bien_the_id: item.bien_the?.id || null,
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
      };
      const selectedPaymentMethod = paymentMethodMap[selectedPayment];
    
      const payload: CreateOrderPayload = {
        ten_nguoi_dat: tenNguoiDat, // Đúng tên trường BE mong đợi
        dia_chi: address,
        thanh_pho: selectedProvinceObj.name,
        huyen: selectedDistrictObj.name,
        xa: selectedWardObj.name,
        sdt_nguoi_dat: phone,         // Đúng tên trường BE mong đợi
        email_nguoi_dat: email,       // Đúng tên trường BE mong đợi
        phuong_thuc_thanh_toan: selectedPaymentMethod.name,
        phuong_thuc_thanh_toan_id: selectedPaymentMethod.id,
        tong_tien: discountInfo ? discountInfo.tong_phai_tra : total,
        items: orderItems.map((item) => ({
          san_pham_id: item.san_pham_id,
          bien_the_id: item.bien_the_id || 0,
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
        ma_giam_gia: discountInfo?.ma || undefined,
      };
    
      console.log("Payload being sent:", payload);
      setIsLoading(true);
    
      checkoutMutation.mutate(payload, {
        onSuccess: async (data) => {
    
          await clearCart(); 
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
        
        onError: (error) => {
          console.error("Lỗi khi đặt hàng:", error);
          if (error && typeof error === 'object' && 'response' in error) {
            const response = (error as { response?: { data?: { message?: string } } }).response;
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

    const getBienTheImg = (bien_the: any) => {
      let img = bien_the?.hinh_anh;
      if (!img) return null;
      if (Array.isArray(img)) return img[0];
      if (typeof img === "string" && img.startsWith("[")) {
        try {
          const arr = JSON.parse(img);
          if (Array.isArray(arr) && arr.length > 0) return arr[0];
        } catch {}
      }
      return img;
    };

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
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Địa chỉ giao hàng</h2>
                  </div>
                  <p className="text-gray-600 text-sm">Thông tin người nhận hàng</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="tenNguoiDat" className="block text-sm font-medium text-gray-700">
                        Họ và tên người đặt *
                      </label>
                      <input
                        id="tenNguoiDat"
                        type="text"
                        value={tenNguoiDat}
                        onChange={(e) => setTenNguoiDat(e.target.value)}
                        placeholder="Nhập họ và tên"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                      {formError && formError.includes("họ và tên") && (
                        <p className="text-xs text-red-500 mt-1">{formError}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Số điện thoại *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Nhập số điện thoại"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                      {formError && formError.includes("số điện thoại") && (
                        <p className="text-xs text-red-500 mt-1">{formError}</p>
                      )}
                    </div>

                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Nhập địa chỉ email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    {formError && formError.includes("email") && (
                      <p className="text-xs text-red-500 mt-1">{formError}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Địa chỉ cụ thể *
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Số nhà, tên đường..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    {formError && formError.includes("địa chỉ") && (
                      <p className="text-xs text-red-500 mt-1">{formError}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Tỉnh/Thành phố *</label>
                      <div className="relative">
                        <select
                          value={selectedProvince}
                          onChange={(e) => setSelectedProvince(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                        >
                          <option value="">Chọn tỉnh/thành phố</option>
                          {provinces.map((p) => (
                            <option key={p.code} value={String(p.code)}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                      {formError && formError.includes("tỉnh/thành phố") && (
                        <p className="text-xs text-red-500 mt-1">{formError}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Quận/Huyện *</label>
                      <div className="relative">
                        <select
                          value={selectedDistrict}
                          onChange={(e) => setSelectedDistrict(e.target.value)}
                          disabled={!selectedProvince}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-500"
                        >
                          <option value="">Chọn quận/huyện</option>
                          {districts.map((d) => (
                            <option key={d.code} value={String(d.code)}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                      {formError && formError.includes("quận/huyện") && (
                        <p className="text-xs text-red-500 mt-1">{formError}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Phường/Xã *</label>
                      <div className="relative">
                        <select
                          value={selectedWard}
                          onChange={(e) => setSelectedWard(e.target.value)}
                          disabled={!selectedDistrict}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-500"
                        >
                          <option value="">Chọn phường/xã</option>
                          {wards.map((w) => (
                            <option key={w.code} value={String(w.code)}>
                              {w.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                      {formError && formError.includes("phường/xã") && (
                        <p className="text-xs text-red-500 mt-1">{formError}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                      Ghi chú giao hàng
                    </label>
                    <textarea
                      id="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ghi chú đặc biệt cho đơn hàng..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
              {/* Phương thức vận chuyển */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Phương thức vận chuyển</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Truck className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-800">Giao hàng tiêu chuẩn</p>
                        <p className="text-sm text-green-600">Thời gian: 3-5 ngày làm việc</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      Miễn phí
                    </span>
                  </div>
                </div>
              </div>
              {/* Phương thức thanh toán */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Phương thức thanh toán</h2>
                  </div>
                  <p className="text-gray-600 text-sm">Chọn phương thức thanh toán phù hợp với bạn</p>
                </div>
                <div className="p-6 space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="relative">
                      <label
                        className={`flex items-start space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedPayment === method.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${method.color}`}>{method.icon}</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">{method.name}</span>
                                {method.recommended && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                    Khuyến nghị
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                          {selectedPayment === method.id && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Shield className="w-4 h-4 text-green-500" />
                                <span>{method.detail}</span>
                              </div>
                              {method.id === "vnpay" && (
                                <div className="mt-2 text-xs text-gray-600">
                                  ✓ Bảo mật SSL 256-bit • ✓ Hỗ trợ 24/7 • ✓ Hoàn tiền nhanh chóng
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        {selectedPayment === method.id && <ChevronRight className="w-5 h-5 text-blue-500 mt-1" />}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Cột phải - Đơn hàng */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 sticky top-24">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Đơn hàng của bạn</h2>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border">
                      {orderItems.length} sản phẩm
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {/* Danh sách sản phẩm */}
                  <div className="space-y-4">
                    {orderItems.map((item) => {
                      const bienTheImg = getBienTheImg(item.bien_the);
                      const imgSrc =
                        bienTheImg
                          ? bienTheImg.startsWith("http")
                            ? bienTheImg
                            : `http://localhost:8000/storage/${bienTheImg}`
                          : item.image
                            ? item.image.startsWith("http")
                              ? item.image
                              : `http://localhost:8000/storage/${item.image}`
                            : "/placeholder.svg";

                      return (
                        <div key={item.bien_the_id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                          <div className="relative">
                            <img
                              src={imgSrc}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover border"
                            />
                            <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white text-xs rounded-full flex items-center justify-center font-medium">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                            <div className="flex gap-2 mt-1">
                              {(item.attributes || item.bien_the?.thuoc_tinh || []).map((attr, idx) => {
                                const isColor = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(attr.gia_tri);
                                return (
                                  <span key={idx} className="flex items-center gap-1">
                                    {attr.ten || attr.ten_thuoc_tinh}:
                                    {isColor ? (
                                      <span
                                        className="inline-block w-5 h-5 rounded-full border ml-1"
                                        style={{ backgroundColor: attr.gia_tri }}
                                        title={attr.gia_tri}
                                      />
                                    ) : (
                                      <span className="ml-1">{attr.gia_tri}</span>
                                    )}
                                  </span>
                                );
                              })}
                            </div>
                            {item.description && (
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-semibold text-blue-600">{formatPrice(item.price)}</span>
                              {item.discountPrice && (
                                <span className="text-sm text-gray-500 line-through">{formatPrice(item.discountPrice)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <hr className="border-gray-200" />
                  {/* Tóm tắt giá */}
                  <div className="space-y-3">
                    {/* Nhập mã giảm giá */}
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={e => setDiscountCode(e.target.value)}
                        placeholder="Nhập mã giảm giá"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        disabled={!!discountInfo}
                      />
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium disabled:opacity-50"
                        disabled={!discountCode || checkDiscountMutation.isPending || !!discountInfo}
                        onClick={() => {
                          checkDiscountMutation.mutate(
                            {
                              ma_giam_gia: discountCode,
                              tong_tien: subtotal,
                              san_pham_id: orderItems.length === 1 ? orderItems[0].san_pham_id : undefined,
                            },
                            {
                              onSuccess: (res) => {
                                setDiscountInfo(res.data);
                                toast.success("Áp dụng mã thành công!");
                              },
                              onError: (err: any) => {
                                toast.error(err?.response?.data?.message || "Mã giảm giá không hợp lệ!");
                                setDiscountInfo(null);
                              }
                            }
                          );
                        }}
                      >
                        Áp dụng
                      </button>
                      {discountInfo && (
                        <button
                          type="button"
                          className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded"
                          onClick={() => {
                            setDiscountInfo(null);
                            setDiscountCode("");
                          }}
                        >
                          Xóa mã
                        </button>
                      )}
                    </div>
                    {/* Danh sách mã giảm giá của bạn */}
                    {userDiscountCodes && userDiscountCodes.length > 0 && (
                      <div className="mt-2">
                        <div className="font-semibold text-sm mb-1">Mã giảm giá của bạn:</div>
                        <div className="flex flex-wrap gap-2">
                          {userDiscountCodes.map((code: any) => {
                            // Điều kiện áp dụng: tổng tiền >= giá trị tối thiểu, còn lượt, còn hạn
                            const notEnoughTotal = code.gia_tri_don_hang && subtotal < code.gia_tri_don_hang;
                            const outOfUses = code.so_luong !== undefined && code.so_luong <= 0;
                            const now = new Date();
                            const expired = code.ngay_ket_thuc && new Date(code.ngay_ket_thuc) < now;
                            const notStarted = code.ngay_bat_dau && new Date(code.ngay_bat_dau) > now;
                            const disabled = notEnoughTotal || outOfUses || expired || notStarted;
                            let reason = "";
                            if (notEnoughTotal) reason = `Đơn tối thiểu ${formatPrice(code.gia_tri_don_hang)}`;
                            else if (outOfUses) reason = "Hết lượt sử dụng";
                            else if (expired) reason = "Đã hết hạn";
                            else if (notStarted) reason = "Chưa đến ngày áp dụng";
                            return (
                              <button
                                key={code.id}
                                className={`px-3 py-1 rounded text-xs transition ${
                                  disabled
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                }`}
                                onClick={() => !disabled && setDiscountCode(code.ma)}
                                type="button"
                                disabled={disabled}
                                title={disabled ? reason : `Áp dụng mã này`}
                              >
                                {code.ma} ({code.loai === 'phan_tram' ? `${code.gia_tri}%` : `${formatPrice(code.gia_tri)}`})
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {discountInfo && (
                      <div className="text-green-600 text-sm mt-1">
                        Đã áp dụng mã <b>{discountInfo.ma}</b> - Giảm {formatPrice(discountInfo.giam_gia)}
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tạm tính:</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    {/* Hiển thị giảm giá nếu có */}
                    {discountInfo && discountInfo.giam_gia > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Giảm giá:</span>
                        <span>-{formatPrice(discountInfo.giam_gia)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Phí vận chuyển:</span>
                      <span className="font-medium text-green-600">Miễn phí</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-blue-600">
                        {formatPrice(discountInfo ? discountInfo.tong_phai_tra : total)}
                      </span>
                    </div>
                  </div>
                  <hr className="border-gray-200" />
                  {/* Điều khoản */}
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm leading-relaxed text-gray-700">
                      Tôi đồng ý với{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        điều khoản và điều kiện
                      </a>{" "}
                      của cửa hàng
                    </label>
                  </div>
                  {/* Nút đặt hàng */}
                  <button
                    onClick={handleOrder}
                    disabled={!agreedToTerms || isLoading}
                    className="w-full h-12 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Đặt hàng ngay
                      </>
                    )}
                  </button>
                  {/* Thông tin bảo mật */}
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                    <Shield className="w-4 h-4" />
                    <span>Thanh toán được bảo mật bởi SSL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default CheckoutPage;

