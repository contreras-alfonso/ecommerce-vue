import type { StockUpdateMode } from './stock-update-mode';

export interface VerifyStockAndUpdateRequest {
  mode: StockUpdateMode;
  cartId: string;
  variantId: string;
  quantity: number;
}
