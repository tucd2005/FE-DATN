import { useEffect, useState } from "react";
import { shipService } from "../services/ship";

function normalizeProvinceName(name: string): string {
  // Bỏ tiền tố như "Tỉnh", "Thành phố"
  return name.replace(/^Tỉnh\s+|^Thành phố\s+/i, "").trim();
}

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

    const normalizedProvince = normalizeProvinceName(selectedProvince);
    setLoading(true);
    setError(null);

    shipService.getShippingFee(normalizedProvince)
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
