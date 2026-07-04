
export type Language = 'ar' | 'en';

export interface ProductPrice {
  sizeAr: string;
  sizeEn: string;
  price: number;
  originalPrice?: number;
  id: string;
}

export interface Product {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  images?: string[];
  prices: ProductPrice[];
  featuresAr?: string[];
  featuresEn?: string[];
}

export interface CartItem {
  id: string; // Unique UI ID for the row
  productId: string;
  priceId: string;
  quantity: number;
}
