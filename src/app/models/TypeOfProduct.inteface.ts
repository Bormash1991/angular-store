export interface TypeOfProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  counter: number;
  extraInfo: Object;
  images: string[];
  comments: Comments[];
  quantity: number;
  guarantee: string;
  color: string;
  cssColor: string;
  otherIds: string[];
  characteristics: Char[];
  category: string;
}
export interface TypeOfProductDb {
  id: string;
  name: string;
  price: number;
  description: string;
  counter: number;
  extraInfo: Object;
  images: { [key: string]: string };
  comments: { [key: string]: Comments };
  quantity: number;
  guarantee: string;
  color: string;
  cssColor: string;
  otherIds: string[];
  characteristics: Char[];
  category: string;
}

export interface Comments {
  text: string;
  username: string;
  userId: string;
  stars: number;
  id?: string;
  date: string;
}
export interface Char {
  title: string;
  chars: string[];
}
