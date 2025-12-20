import type { ColorImage } from './product';

export interface ProductTable {
  id: string | null;
  name: string;
  brandName: string;
  categoryName: string;
  createdAt: string;
  updateAt: string;
  colorImage: ColorImage;
}
