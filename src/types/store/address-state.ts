import type { Address } from '../address';

export interface AddressState {
  addresses: Address[];
  address: Address | null;
}
