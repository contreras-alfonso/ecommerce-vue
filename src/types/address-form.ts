export interface AddressForm {
  address: string;
  reference: string;
  phone: string;
  department: string | null;
  province: string | null;
  district: string | null;
  isDefault: boolean;
  lat?: number;
  lng?: number;
}
