import { BillBody } from "./bill-body.model";
import { Buyer } from "./buyer.model";

export interface BillHeader {
    id:             number;
    number:         number;
    date:           string;
    buyerId:        number;
    buyer?:          Buyer;
    totalDiscount:  number;
    totalAmount:    number;
    billBodies: BillBody[]; //pa u njega ubacivat stavke s POS view na checkout?
}
