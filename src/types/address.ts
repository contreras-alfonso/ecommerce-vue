export interface Address {
  address: string;
  reference: string;
  phone: string;
  department: string | null;
  province: string | null;
  district: string | null;
  isDefault: boolean;
}
