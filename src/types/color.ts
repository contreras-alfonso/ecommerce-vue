import type { BaseOption } from './base-option';

export interface Color extends BaseOption {
  id: string | null;
  hex: string;
  createdAt?: string;
  updatedAt?: string | null;
}
