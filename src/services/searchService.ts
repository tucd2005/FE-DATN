import instanceAxios from "../utils/axios";
export const searchProducts = async (query: string) => {
    try {
      const response = await instanceAxios.get('/products/filter', {
        params: {
          keyword: query,
          per_page: 5,
        },
      });
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi tìm kiếm sản phẩm');
    }
  };