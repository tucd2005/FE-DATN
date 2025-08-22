import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instanceAxios from "../../../../utils/axios";
import { message } from "antd";
import ProductGrid from "../../san_pham/components/ProductGrid";
import type { IFavoriteProduct } from "../../../../types/product.type";

const Favorite = () => {
    const queryClient = useQueryClient();

    const { data: fav } = useQuery({
        queryKey: ["favorites"],
        queryFn: () => instanceAxios.get("/wishlists").then(res => res.data),
    })

    const favoriteProducts = fav?.data?.map((e: IFavoriteProduct) => e?.product.id);
    const products = fav?.data?.map((e: IFavoriteProduct) => e?.product);


    const { mutate: removeFavorite } = useMutation({
        mutationFn: (productId: number) => instanceAxios.delete("/wishlists/" + productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
            message.success('Đã xóa khỏi yêu thích!');
        }
    });

    const toggleFavorite = (productId: number) => removeFavorite(productId);
    return (
        <ProductGrid
            products={products}
            viewMode={'grid'}
            favorites={favoriteProducts}
            onToggleFavorite={toggleFavorite}
        />
    )
}

export default Favorite