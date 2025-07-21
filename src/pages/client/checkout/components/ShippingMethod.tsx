import React from "react";
import { useShippingFee } from "../../../../hooks/useship";



interface ShippingMethodProps {
  selectedProvince: string;
}

const ShippingMethod: React.FC<ShippingMethodProps> = ({ selectedProvince }) => {
  const { shippingFee, loading, error } = useShippingFee(selectedProvince);
  console.log("Phí ship FE nhận được:", shippingFee);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 text-blue-600"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="1" y="7" width="22" height="13" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <h2 className="text-xl font-semibold text-gray-900">Phương thức vận chuyển</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="w-5 h-5 text-green-600"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="1" y="7" width="22" height="13" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
            <div>
              <p className="font-medium text-green-800">Giao hàng tiêu chuẩn</p>
              <p className="text-sm text-green-600">Thời gian: 3-5 ngày làm việc</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
            {loading
              ? "Đang tính phí..."
              : error
                ? error
                : shippingFee === null
                  ? "Chọn tỉnh/thành"
                  : shippingFee === 0
                    ? "Miễn phí"
                    : `${shippingFee.toLocaleString()}đ`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShippingMethod; 