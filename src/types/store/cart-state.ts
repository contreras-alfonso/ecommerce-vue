import type { CartResponse } from '../cart-response';

export interface CartState {
  cart: CartResponse | null;
  cartDrawer: boolean;
}
