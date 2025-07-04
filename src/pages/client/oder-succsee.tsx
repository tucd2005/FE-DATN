"use client";

import { useLocation } from "react-router-dom";
import { Check, Package, MapPin, Truck } from "lucide-react";
import { useOrderDetail } from "../../hooks/useCheckout";

export default function OrderSuccessPage() {
  const location = useLocation();
  const orderCode = location.state?.orderCode as string;

  const { data: order, isLoading } = useOrderDetail(orderCode);

  const formatPrice = (price: number | string) =>
    new Intl.NumberFormat("vi-VN").format(Number(price)) + "đ";

  if (isLoading) return <div className="p-8">Đang tải...</div>;
  if (!order) return <div className="p-8">Không tìm thấy đơn hàng.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">Đặt hàng thành công!</h1>
            <p className="text-gray-600">Cảm ơn bạn đã mua sắm tại Sportigo. Đơn hàng của bạn đã được xác nhận.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col space-y-6">
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center space-x-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span>Thông tin đơn hàng</span>
                  </h2>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    Đã xác nhận
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Mã đơn hàng</p>
                    <p className="font-semibold mb-4">{order.ma_don_hang}</p>
                    <p className="text-sm text-gray-600">Phương thức thanh toán</p>
                    <p className="font-semibold">{order.phuong_thuc_thanh_toan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ngày đặt</p>
                    <p className="font-semibold mb-4">
                      {new Date(order.created_at).toLocaleDateString("vi-VN")}
                    </p>
                    <p className="text-sm text-gray-600">Tổng thanh toán</p>
                    <p className="font-semibold text-blue-600">{formatPrice(order.so_tien_thanh_toan)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-4">Sản phẩm đã đặt</h2>
                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div key={item.bien_the_id} className="flex items-center space-x-4 border p-4 rounded">
                      <img src="/placeholder.svg?height=64&width=64" alt={item.ten_san_pham} className="w-16 h-16 object-cover rounded border" />
                      <div className="flex-1">
                        <p className="font-medium">{item.ten_san_pham}</p>
                        <p className="text-sm text-gray-600">
                          {item.thuoc_tinh_bien_the.map((t: any) => `${t.ten_thuoc_tinh}: ${t.gia_tri}`).join(" | ")} | SL: {item.so_luong}
                        </p>
                      </div>
                      <div className="text-right font-semibold">{formatPrice(item.don_gia)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Địa chỉ giao hàng</span>
                </h2>
                <p className="font-semibold">{order.user.ten}</p>
                <p className="text-gray-600">{order.dia_chi}</p>
              </div>
            </div>

            {/* Cột phải tóm tắt hoặc tiếp tục mua sắm */}
            <div className="flex flex-col space-y-6 h-full">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-4">Tổng cộng</h2>
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng thanh toán:</span>
                  <span className="text-blue-600">{formatPrice(order.so_tien_thanh_toan)}</span>
                </div>
              </div>
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded font-medium flex items-center justify-center space-x-2">
                <Truck className="w-5 h-5" />
                <span>Theo dõi đơn hàng</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
