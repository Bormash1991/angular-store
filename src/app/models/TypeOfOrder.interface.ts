export interface TypeOfOrder {
  createdAt: string;
  id: string;
  message: string;
  name: string;
  phone: string;
  products: Product[];
  updatedAt: string;
}
export interface Product {
  quantity: number;
  id: string;
  name: string;
}
