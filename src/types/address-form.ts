export interface AddressForm {
  id: string | null;
  address: string;
  reference: string;
  phone: string;
  department: string | null;
  province: string | null;
  district: string | null;
  default: boolean;
  lat?: number;
  lng?: number;
}
