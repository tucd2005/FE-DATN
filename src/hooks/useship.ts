import { useEffect, useState } from "react";
import { shipService, shippingFeeService, type ShippingFeeResponse } from "../services/ship"; // Đảm bảo đường dẫn đúng
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
///admin 
// hooks/useShippingFee.ts

export function useShippingFees(search: string) {
  return useQuery<ShippingFeeResponse, Error>({
    queryKey: ["shipping-fees", search],
    queryFn: () => shippingFeeService.getAll(search),
   
  });
}

export function useUpdateShippingFee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, phi }: { id: number; phi: number }) =>
      shippingFeeService.update(id, phi),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping-fees"] });
    },
  });
}
