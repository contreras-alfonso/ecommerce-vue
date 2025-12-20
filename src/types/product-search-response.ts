
import type { Color } from "./color";
import type { Product } from "./product";

export interface ProductSearchResponse {
    products: Products;
    filters:  Filters;
}

export interface Filters {
    minPrice: number;
    maxPrice: number;
    brands:   BrandElement[];
}

export interface BrandElement {
    id:    string;
    name:  string;
    slug:  string;
    count: number;
}

export interface Products {
    content:          Product[];
    empty:            boolean;
    first:            boolean;
    last:             boolean;
    number:           number;
    numberOfElements: number;
    pageable:         Pageable;
    size:             number;
    sort:             Sort;
    totalElements:    number;
    totalPages:       number;
}


export interface ColorImage {
    id:        string;
    url:       string;
    color:     Color;
    createdAt: Date;
    updatedAt: Date;
}

export interface Pageable {
    offset:     number;
    pageNumber: number;
    pageSize:   number;
    paged:      boolean;
    sort:       Sort;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
