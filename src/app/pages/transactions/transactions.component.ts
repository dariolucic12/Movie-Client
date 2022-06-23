import { Component, OnInit } from '@angular/core';
import { BillBody } from 'src/app/models/bill-body.model';
import { Product } from 'src/app/models/product.model';
import { BillsService } from 'src/app/services/bills.service';

const BILL_DATA: BillBody[] = [
  { price: 2, quantity: 59, discount: 17, discountAmount: 22, totalPrice: 23, productId: 3, billHeaderId: 12},
  { price: 23.00, quantity: 59, discount: 17, discountAmount: 22, totalPrice: 23, productId: 3, billHeaderId: 12},
  { price: 23.00, quantity: 59, discount: 17, discountAmount: 22, totalPrice: 23, productId: 3, billHeaderId: 12},
  { price: 23.00, quantity: 59, discount: 17, discountAmount: 22, totalPrice: 23, productId: 3, billHeaderId: 12}
];

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  displayedColumns: string[] = ['price', 'quantity', 'discount', 'discountAmount', 'totalPrice', 'productId', 'billHeaderId'];
  dataSource = BILL_DATA;

  constructor(private billsService: BillsService) { }

  ngOnInit(): void {
    // this.billsService.getAllBillBodies().subscribe(
    //   response => {
    //     console.log(response);
    //   }
    // );
    
    // this.billsService.getBillBodyByID(5).subscribe(
    //   response => {
    //     console.log(response);
    //   }
    // );


  }
}
