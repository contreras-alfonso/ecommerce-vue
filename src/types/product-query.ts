import type { LocationQueryRaw } from "vue-router";

export interface ProductQuery extends LocationQueryRaw {
  min_price?: number;
  max_price?: number;
  brand?: string;
  page?: number;
  order_by?: string;
}
