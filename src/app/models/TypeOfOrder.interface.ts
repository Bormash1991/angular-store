export interface TypeOfOrder {
  createdAt: string;
  id?: string;
  message: string;
  name: string;
  phone: string;
  products: Product[];
  userId: string;
  totalSum: number;
  status: 'Скасовано' | 'Виконано' | 'На обробці';
}

export interface Product {
  quantity: number;
  id: string;
  name: string;
  img: string;
}
