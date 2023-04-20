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
}

export interface Comments {
  text: string;
  username: string;
  userId: string;
  stars: number;
  _id: string;
}
