export interface ProductData {
  id: number;
  title: string;
  price: number;
  image: string;
  size: string;
}

export interface CartItemData extends ProductData {
  quantity: number;
  key: string;
}
