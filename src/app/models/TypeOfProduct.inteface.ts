// export interface TypeOfProduct {
//   id: number;
//   name: string;
//   price: number;
// }

interface startType {
  id: number;
  name: string;
  // date: string;
  price: number;
}
export interface TypeOfProduct extends startType {
  price: number;
}
