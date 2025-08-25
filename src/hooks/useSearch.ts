import { useState, useEffect } from 'react';
import { searchProducts } from '../services/searchService';

interface Product {
  id: string;
  ten: string;
  anh?: string; // Thêm trường ảnh
  variants?: {
    id: string;
    gia?: number;
    gia_khuyen_mai?: number;
    attributeValues?: {
      id: string;
      gia_tri: string;
      attribute: {
        id: string;
        ten: string;
      };
    }[];
  }[];
}

export const useSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setError(null);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchProducts(query);
        setResults(data);
      } catch (err: any) {
        setError(err.message || 'Đã có lỗi xảy ra khi tìm kiếm');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return { query, setQuery, results, loading, error };
};