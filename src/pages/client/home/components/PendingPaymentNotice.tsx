import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { usePendingPayment } from "../../../../hooks/useOrder";

dayjs.extend(duration);

const PendingPaymentNotice: React.FC = () => {
  const { data, isLoading, isError } = usePendingPayment();
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (data?.expires_at) {
      const timer = setInterval(() => {
        const now = dayjs();
        const expireTime = dayjs(data.expires_at);
        const diff = expireTime.diff(now);

        if (diff <= 0) {
          setTimeLeft("Hết hạn");
          clearInterval(timer);
        } else {
          const dur = dayjs.duration(diff);
          const mm = String(dur.minutes()).padStart(2, "0");
          const ss = String(dur.seconds()).padStart(2, "0");
          setTimeLeft(`${mm}:${ss}`);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [data?.expires_at]);

  if (isLoading || isError || data?.status !== "need_payment") return null;

  return (
    <div className="fixed bottom-[220px] right-6 bg-white shadow-lg rounded-lg px-6 py-4 z-50 flex flex-col items-start text-left border border-gray-200">
      <p className="text-lg font-semibold text-gray-800 mb-2">
        Bạn có đơn hàng chưa hoàn thành !
      </p>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-gray-700">
          Mã đơn: {data.ma_don_hang}
        </span>
        <span className="text-red-500 font-medium">{timeLeft}</span>
        <a
          href={data.payment_link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors"
        >
          Thanh toán
        </a>
      </div>
    </div>
  );
};

export default PendingPaymentNotice;
