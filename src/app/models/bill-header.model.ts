import { Buyer } from "./buyer.model";

export interface BillHeader {
    id:             number;
    number:         number;
    date:           string;
    buyerId:        number;
    buyer?:          Buyer;
    totalDiscount:  number;
    totalAmount:    number;
}
