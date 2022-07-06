import { Product } from "./product.model";

export interface BillsView {
    id:             number;
    quantity:       number;
    discount:       number;
    discountAmount: number;
    totalPrice:     number;
    product:        Product;
}