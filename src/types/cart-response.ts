import type { CartStatus } from "./cart-status";

export interface CartResponse {
    cartId:   string;
    items:    Item[];
    itemsCount: number;
    subtotal: number;
    status: CartStatus
}

export interface Item {
    imageUrl:              string;
    price:                 number;
    productId:             string;
    productName:           string;
    productSlug:           string;
    quantity:              number;
    baseQuantity?:          number;
    ram:                   string;
    storage:               string;
    usesTechnicalVariants: boolean;
    variantId:             string;
}
