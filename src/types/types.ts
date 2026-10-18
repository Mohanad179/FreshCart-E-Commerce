export interface Brand {
  image: string;
  name: string;
  slug: string;
  _id: string;
}

export interface Category {
  image: string;
  name: string;
  slug: string;
  _id: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  priceAfterDiscount: number,
  slug: string;
  images: string[];
  imageCover: string;
  description: string;
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
  brand: Brand;
  category: Category;
}