export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image:string;
    discount?: string;
    category: string;
    status: string;
    stock?: number; 
  }
  