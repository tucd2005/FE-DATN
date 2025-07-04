import { useState, useEffect } from "react";
import { MapPin, Truck, CreditCard, Shield, Clock, CheckCircle } from "lucide-react";
import { message } from "antd";
import { useCheckout } from "../../../hooks/useCheckout";

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("vnpay");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const orderItems = [
    {
      san_pham_id: 1,
      bien_the_id: 1,
      name: "Sony WH-1000XM5",
      size: "M",
      color: "Đỏ",
      quantity: 1,
      price: 206239,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price) + "đ";

  const checkoutMutation = useCheckout();

  const handleOrder = () => {
    if (!address || !selectedProvince || !selectedDistrict || !selectedWard) {
      message.error("Vui lòng điền đầy đủ địa chỉ giao hàng");
      return;
    }
  
    const provinceName = provinces.find(p => p.code == selectedProvince)?.name || "";
    const districtName = districts.find(d => d.code == selectedDistrict)?.name || "";
    const wardName = wards.find(w => w.code == selectedWard)?.name || "";
    const fullAddress = `${address}, ${wardName}, ${districtName}, ${provinceName}`;
  
    const payload = {
      dia_chi: fullAddress,
      phuong_thuc_thanh_toan_id: selectedPayment === "vnpay" ? "1" : "2", // ví dụ: 1 = VNPay, 2 = COD, chỉnh theo BE bạn
      chi_tiet_san_pham: orderItems.map(item => ({
        id_san_pham: item.san_pham_id,
        so_luong: item.quantity,
        don_gia: item.price.toFixed(2),
        thuoc_tinh_bien_the: [
          { gia_tri: item.size, thuoc_tinh: "Kích cỡ" },
          { gia_tri: item.color, thuoc_tinh: "Màu sắc" }
        ]
      })),
      ghi_chu: note || ""
    };
  
    checkoutMutation.mutate(payload, {
      onSuccess: (data) => {
        message.success("Đặt hàng thành công!");
        console.log("Order response:", data);
        // TODO: reset giỏ hàng hoặc điều hướng sang trang cảm ơn
      },
      onError: (error) => {
        console.error(error);
        message.error("Có lỗi xảy ra khi đặt hàng!");
      },
    });
  };

  // Load danh sách tỉnh/thành
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then(res => res.json())
      .then(data => setProvinces(data));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then(res => res.json())
        .then(data => setDistricts(data.districts || []));
    } else {
      setDistricts([]);
      setWards([]);
      setSelectedDistrict("");
      setSelectedWard("");
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then(res => res.json())
        .then(data => setWards(data.wards || []));
    } else {
      setWards([]);
      setSelectedWard("");
    }
  }, [selectedDistrict]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Thanh toán đơn hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột bên trái */}
          <div className="lg:col-span-2 space-y-6">
            {/* Địa chỉ giao hàng */}
            <div className="border rounded-lg bg-white">
              <div className="border-b p-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Địa chỉ giao hàng</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Địa chỉ *</label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Nguyễn Văn Linh"
                    className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tỉnh/Thành phố *</label>
                    <select
                      value={selectedProvince}
                      onChange={(e) => setSelectedProvince(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      {provinces.map((p) => (
                        <option key={p.code} value={p.code}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Quận/Huyện *</label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      disabled={!selectedProvince}
                      className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Chọn quận/huyện</option>
                      {districts.map((d) => (
                        <option key={d.code} value={d.code}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phường/Xã *</label>
                    <select
                      value={selectedWard}
                      onChange={(e) => setSelectedWard(e.target.value)}
                      disabled={!selectedDistrict}
                      className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Chọn phường/xã</option>
                      {wards.map((w) => (
                        <option key={w.code} value={w.code}>{w.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Ghi chú giao hàng</label>
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ghi chú cho shipper..."
                    className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Phương thức vận chuyển */}
            <div className="border rounded-lg bg-white p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Phương thức vận chuyển</h3>
              </div>
              <div className="border rounded p-4 bg-green-50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">Giao hàng tiêu chuẩn</div>
                    <div className="text-sm text-gray-600">3-5 ngày làm việc</div>
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Miễn phí</span>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="border rounded-lg bg-white p-4 space-y-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Phương thức thanh toán</h3>
              </div>
              {["vnpay", "cod"].map((method) => (
                <label key={method} className="flex items-start space-x-3 p-4 border rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={selectedPayment === method}
                    onChange={() => setSelectedPayment(method)}
                    className="mt-1 accent-blue-600"
                  />
                  <div>
                    <div className="font-medium">{method === "vnpay" ? "VNPay" : "Thanh toán khi nhận hàng (COD)"}</div>
                    <div className="text-sm text-gray-600">
                      {method === "vnpay" ? "Thanh toán qua ví điện tử VNPay" : "Thanh toán bằng tiền mặt khi nhận hàng"}
                    </div>
                    {selectedPayment === method && method === "vnpay" && (
                      <div className="mt-2 bg-blue-50 border border-blue-200 rounded p-2 text-sm text-blue-800 space-y-1">
                        <div className="flex items-center space-x-1"><CheckCircle className="w-4 h-4" /><span>Hỗ trợ thẻ ATM, Internet Banking</span></div>
                        <div className="flex items-center space-x-1"><Shield className="w-4 h-4" /><span>Bảo mật SSL</span></div>
                        <div className="flex items-center space-x-1"><Clock className="w-4 h-4" /><span>Nhanh chóng, an toàn</span></div>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Cột bên phải */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg bg-white p-4 sticky top-24 space-y-4">
              <h3 className="text-lg font-semibold">Đơn hàng của bạn</h3>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.bien_the_id} className="flex space-x-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-sm text-gray-600">Size: {item.size} | Màu: {item.color} | SL: {item.quantity}</div>
                      <div className="font-medium mt-1">{formatPrice(item.price)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="text-sm space-y-1">
                <div className="flex justify-between"><span>Tạm tính:</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span>Phí vận chuyển:</span><span className="text-green-600">Miễn phí</span></div>
                <hr />
                <div className="flex justify-between font-bold text-lg"><span>Tổng cộng:</span><span className="text-blue-600">{formatPrice(total)}</span></div>
              </div>
              <hr />
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mt-1 accent-blue-600" />
                <span className="text-sm text-gray-600">Tôi đồng ý với <a href="#" className="text-blue-600 underline">điều khoản dịch vụ</a> và <a href="#" className="text-blue-600 underline">chính sách bảo mật</a></span>
              </label>
              <button
                disabled={!agreedToTerms || checkoutMutation.isPending}
                onClick={handleOrder}
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded disabled:opacity-50"
              >
                {checkoutMutation.isPending ? "Đang xử lý..." : "Đặt hàng"}
              </button>
              <p className="text-xs text-gray-500 text-center">Bằng cách đặt hàng, bạn xác nhận đã đọc và đồng ý với các điều khoản của chúng tôi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
