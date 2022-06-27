import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BillBody } from 'src/app/models/bill-body.model';
import { BillHeader } from 'src/app/models/bill-header.model';
import { Product } from 'src/app/models/product.model';
import { BillsService } from 'src/app/services/bills.service';
import { ProductsService } from 'src/app/services/products.service';

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
  billBodies: BillBody[] = [];
  products: Product[] = [];

  // dataSource = this.billBodies.map(body => ({
  //   id: body.id,
  //   price: body.price,
  //   quantity: body.quantity,
  //   discount: body.discount,
  //   discountAmount: body.discountAmount,
  //   totalPrice: body.totalPrice,
  //   productId: this.products.find(product => product.id === body.productId)?.name,
  //   billHeaderId: body.billHeaderId
  // }));


  constructor(private billsService: BillsService, 
    private productsService: ProductsService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllBillBodies();
    this.getAllProducts();
  }

  getAllBillBodies(){
    this.billsService.getAllBillBodies().subscribe((data: any) => {
      this.billBodies = data;
      console.log(this.billBodies);
      this.changeDetectorRefs.detectChanges();

      return data;
    }
    );
  }

  getAllProducts(){
    this.productsService.getAllProducts().subscribe((data: any) => {
      this.products = data;
      console.log(this.products);

      return data;
    })
  }

  printData(){
    //console.log(this.dataSource);
  }
}
