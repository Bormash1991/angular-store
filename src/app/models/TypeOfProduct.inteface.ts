interface startType {
  id: number;
  name: string;
  price: number;
}
export interface TypeOfProduct extends startType {
  price: number;
  counter: number;
}
