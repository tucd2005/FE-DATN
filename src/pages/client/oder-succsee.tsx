import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import instanceAxios from '../../utils/axios';

interface Order {
  id: number;
  ma_don_hang: string;
  // thêm các field khác nếu cần
}

export default function PaymentResultPage() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<{ code: string; message: string; order?: Order | null }>({ code: '', message: '', order: null });

  useEffect(() => {
    const fetchResult = async () => {
      try {
        // Lấy query vnp_* từ URL
        const query = location.search;
        const res = await instanceAxios.get(`/payment/vnpay/return${query}`);
        setResult(res.data);
      } catch (error: any) {
        setResult({ code: '99', message: 'Đã xảy ra lỗi khi xử lý kết quả', order: null });
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [location.search]);

  if (loading) return <div className="text-center mt-10">Đang xử lý kết quả thanh toán...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {result.code === '00' ? (
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Thanh toán thành công!</h1>
        
          <a href="/" className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Về trang chủ</a>
        </div>
      ) : (
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Thanh toán thất bại!</h1>
          <p className="text-gray-700">Lý do: <strong>{result.message}</strong></p>
          <a href="/" className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Về trang chủ</a>
        </div>
      )}
    </div>
  );
}