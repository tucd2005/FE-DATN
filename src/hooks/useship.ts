import { useEffect, useState } from "react";
import { shipService } from "../services/ship"; // Đảm bảo đường dẫn đúng

export function useShippingFee(selectedProvince: string) {
  const [shippingFee, setShippingFee] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedProvince) {
      setShippingFee(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    shipService.getShippingFee(selectedProvince)
      .then((fee) => {
        setShippingFee(fee);
      })
      .catch((err) => {
        console.error("Không lấy được phí ship:", err);
        setShippingFee(0);
        setError("Không lấy được phí ship");
      })
      .finally(() => setLoading(false));
  }, [selectedProvince]);

  return { shippingFee, loading, error };
}
