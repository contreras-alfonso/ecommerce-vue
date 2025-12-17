import type { BaseOption } from './base-option';

export interface Color extends BaseOption {
  id: string | null;
  hex: string;
  created_at?: string;
  updated_at?: string | null;
}
