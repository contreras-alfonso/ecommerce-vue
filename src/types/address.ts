export interface Address {
  id?: string | null;
  address: string;
  reference: string;
  phone: string;
  default: boolean;
  ubigeo: string;
  lat: number;
  lng: number;
}
