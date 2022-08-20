import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BillBody } from 'src/app/models/bill-body.model';
import { BillHeader } from 'src/app/models/bill-header.model';
import { Product } from 'src/app/models/product.model';
import { Top250Movie } from 'src/app/models/top250Movie.model';
import { BillsService } from 'src/app/services/bills.service';
import { ImdbApiService } from 'src/app/services/imdb-api.service';
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

  //displayedColumns: string[] = ['price', 'quantity', 'discount', 'discountAmount', 'totalPrice', 'productId', 'billHeaderId'];
  displayedColumns: string[] = ['rank', 'title', 'imDbRating', 'imDbRatingCount'];
  billBodies: BillBody[] = [];
  billHeaders: BillHeader[] = [];
  products: Product[] = [];
  top250Movies: Top250Movie[] = [];

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
    private changeDetectorRefs: ChangeDetectorRef,
    private top250moviesService: ImdbApiService) { }

  ngOnInit(): void {
    //this.getAllBillBodies();
    //this.getAllProducts();
    this.getAllTop250Movies();
    
  }

  getAllBillBodies(){
    this.billsService.getAllBillBodies().subscribe((data: any) => {
      this.billBodies = data;
      console.log(this.billBodies);
      this.changeDetectorRefs.detectChanges();

      return data;
    });
  }

  getAllTop250Movies(){
    this.top250moviesService.getTopMovies().subscribe((data: any) => {
      this.top250Movies = data.items;
      console.log(this.top250Movies);
      this.changeDetectorRefs.detectChanges();

      return data;
    });
  }

  getAllHeaders(){
    this.billsService.getAllBillHeaders().subscribe((data: any) => {
      this.billHeaders = data;
      console.log(this.billBodies);
      this.changeDetectorRefs.detectChanges();

      return data;
    })
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
