import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BillBody } from 'src/app/models/bill-body.model';
import { Product } from 'src/app/models/product.model';
import { BillsService } from 'src/app/services/bills.service';

// const BILL_DATA: BillBody[] = [
//   { price: 2, quantity: 59, discount: 17, discountAmount: 22, totalPrice: 23, productId: 3, billHeaderId: 12 },
//   { price: 23.00, quantity: 59, discount: 17, discountAmount: 22, totalPrice: 23, productId: 3, billHeaderId: 12 },
//   { price: 23.00, quantity: 59, discount: 17, discountAmount: 22, totalPrice: 23, productId: 3, billHeaderId: 12 },
//   { price: 23.00, quantity: 59, discount: 17, discountAmount: 22, totalPrice: 23, productId: 3, billHeaderId: 12 }
// ];

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  displayedColumns: string[] = ['price', 'quantity', 'discount', 'discountAmount', 'totalPrice', 'productId', 'billHeaderId'];
  dataSource: BillBody[] = [];

  constructor(private billsService: BillsService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.billsService.getAllBillBodies().subscribe((data: any) => {
      this.dataSource = data;
      console.log(this.dataSource);
      this.changeDetectorRefs.detectChanges();

      return data;
    }
    );

    // this.billsService.getBillBodyByID(5).subscribe(
    //   response => {
    //     console.log(response);
    //   }
    // );


  }
}
