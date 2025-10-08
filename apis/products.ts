import axios from "axios";

const API_URL = "https://fakestoreapi.com";

export type Category = "electronics" | "jewelery" | "men's clothing" | "women's clothing";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>(`${API_URL}/products`);
  return res.data;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get<Category[]>(`${API_URL}/products/categories`);
  return res.data;
};
