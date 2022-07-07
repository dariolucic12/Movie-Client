import { Product } from "./product.model";

export interface BillBody {
    id?:            number;
    price:          number;
    quantity:       number;
    discount:       number;
    discountAmount: number;
    totalPrice:     number;
    productId:      number;
    billHeaderId?:   number;
    product?:       Product;
}
