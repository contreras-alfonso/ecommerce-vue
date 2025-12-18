import type { Color } from "./color";

export interface Variant {
  id?: string;
  colorId: string;
  color?: Color
  ram: string;
  storage: string;
  price: string;
  stock: string;
}
