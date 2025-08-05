import React from "react";
import { toast } from "react-toastify";

interface Attribute {
  ten?: string;
  ten_thuoc_tinh?: string;
  gia_tri: string;
}

interface OrderItem {
  bien_the_id: number | null;
  name: string;
  image: string;
  quantity: number;
  price: number;
  discountPrice: number | null;
  description: string;
  attributes?: Attribute[];
  bien_the?: {
    id: number;
    hinh_anh?: string;
    thuoc_tinh?: { ten_thuoc_tinh: string; gia_tri: string }[];
  };
  san_pham_id: number;
}

interface DiscountInfo {
  ma: string;
  giam_gia: number;
  tong_phai_tra: number;
}

interface OrderSummaryProps {
  orderItems: OrderItem[];
  discountCode: string;
  setDiscountCode: (v: string) => void;
  discountInfo: DiscountInfo | null;
  setDiscountInfo: (v: DiscountInfo | null) => void;
  subtotal: number;
  shippingFee: number;
  total: number;
  userDiscountCodes: Array<{
    id: number;
    ma: string;
    loai: string;
    gia_tri: number;
    gia_tri_don_hang?: number;
    so_luong?: number;
    ngay_bat_dau?: string;
    ngay_ket_thuc?: string;
    mo_ta?: string;
    san_pham_id?: number | number[];
  }>;
  checkDiscountMutation: {
    mutate: (data: any, options: any) => void;
    isPending: boolean;
  };
  formatPrice: (price: number) => string;
  agreedToTerms: boolean;
  setAgreedToTerms: (v: boolean) => void;
  isLoading: boolean;
  handleOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderItems,
  discountCode,
  setDiscountCode,
  discountInfo,
  setDiscountInfo,
  subtotal,
  shippingFee,
  total,
  userDiscountCodes,
  checkDiscountMutation,
  formatPrice,
  agreedToTerms,
  setAgreedToTerms,
  isLoading,
  handleOrder,
}) => {
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

  return (
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
                    {(item.attributes || item.bien_the?.thuoc_tinh || []).map((attr: Attribute, idx: number) => {
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
                    onSuccess: (res: any) => {
                      setDiscountInfo(res.data);
                    },
                    onError: (err: any) => {
                      setDiscountInfo(null);
                      // Hiển thị thông báo lỗi từ backend
                      if (err && typeof err === 'object' && 'response' in err) {
                        const response = (err as { response?: { data?: { error?: string; message?: string } } }).response;
                        const errorMessage = response?.data?.error || response?.data?.message || '';
                        
                        // Chuyển đổi lỗi kỹ thuật thành thông báo thân thiện
                        let friendlyMessage = 'Mã giảm giá không hợp lệ';
                        
                        if (errorMessage.includes("Mã giảm giá không hợp lệ")) {
                          friendlyMessage = errorMessage;
                        } else if (errorMessage.includes("đã hết hạn")) {
                          friendlyMessage = "Mã giảm giá đã hết hạn";
                        } else if (errorMessage.includes("đã được sử dụng hết")) {
                          friendlyMessage = "Mã giảm giá đã được sử dụng hết";
                        } else if (errorMessage.includes("chưa đạt mức tối thiểu")) {
                          friendlyMessage = "Đơn hàng chưa đạt mức tối thiểu để áp dụng mã";
                        } else if (errorMessage.includes("quá số lần cho phép")) {
                          friendlyMessage = "Bạn đã sử dụng mã này quá số lần cho phép";
                        } else if (errorMessage) {
                          friendlyMessage = errorMessage;
                        }
                        
                        toast.error(friendlyMessage);
                      } else {
                        toast.error('Mã giảm giá không hợp lệ');
                      }
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
                {userDiscountCodes
                  // Lọc mã giảm giá chỉ áp dụng được cho sản phẩm hiện tại
                  .filter((code: any) => {
                    if (!code.san_pham_id) return true;
                    if (Array.isArray(code.san_pham_id)) {
                      return orderItems.some(item => code.san_pham_id.includes(item.san_pham_id));
                    }
                    return orderItems.some(item => item.san_pham_id === code.san_pham_id);
                  })
                  .map((code: any) => {
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
                      <div
                        key={code.id}
                        className="border border-blue-200 bg-blue-50 rounded p-2 mb-2 w-full max-w-[180px] flex flex-col items-start"
                      >
                        <button
                          className={`px-3 py-1 rounded text-xs font-semibold transition mb-1 ${
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
                        {code.mo_ta && (
                          <div
                            className="text-xs text-gray-600 max-w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
                            title={code.mo_ta}
                          >
                            <b>Điều kiện:</b> {code.mo_ta}
                          </div>
                        )}
                      </div>
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
            <span className="font-medium text-green-600">
              {shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}
            </span>
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between text-lg font-bold">
            <span>Tổng cộng:</span>
            <span className="text-blue-600">
              {formatPrice((discountInfo ? discountInfo.tong_phai_tra : total) + (shippingFee || 0))}
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
              <span className="w-5 h-5"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              Đặt hàng ngay
            </>
          )}
        </button>
        {/* Thông tin bảo mật */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
          <span className="w-4 h-4"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <span>Thanh toán được bảo mật bởi SSL</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary; 
