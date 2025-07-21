import React from "react";

interface PaymentMethodType {
  id: string;
  name: string;
  description: string;
  detail: string;
  icon: React.ReactNode;
  color: string;
  recommended?: boolean;
}

interface PaymentMethodProps {
  selectedPayment: string;
  setSelectedPayment: (v: string) => void;
  paymentMethods: PaymentMethodType[];
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ selectedPayment, setSelectedPayment, paymentMethods }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-5 h-5 text-blue-600"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3v4M8 3v4M2 11h20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
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
                      <span className="w-4 h-4 text-green-500"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
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
              {selectedPayment === method.id && <span className="w-5 h-5 text-blue-500 mt-1"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod; 