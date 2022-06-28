import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { BuyersService } from 'src/app/services/buyers.service';
import { Buyer } from 'src/app/models/buyer.model';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { IProductTransaction } from './productTransaction';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})

export class PosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  constructor(
    private productsService: ProductsService,
    private buyersService: BuyersService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  buyers: Buyer[] = [];

  city!: string;
  address!: string;
  today = new Date();

  productsInBasket: Product[] = [];

  ngOnInit(): void {
    this.getAllBuyers();
    this.getAllProducts();
  }

  products: Product[] = [];

  selectedProduct: Product = {
    cipher: '',
    name: '',
    measure: '',
    price: 0,
    count: 1
  };

  displayedColumns: string[] = [ 'name', 'price',];
  
  getAllProducts() {
    this.productsService.getAllProducts().subscribe((data: any) => {
      this.products = data;
      console.log(data);
      return data;
    });
  }

  addProductInBasket() {
    const newBasket = this.productsInBasket;
    this.productsInBasket.push(this.selectedProduct);
    this.productsInBasket = [...newBasket];
  }
  


  getTotalCost() {
    return this.productsInBasket.map(p => p.price).reduce((acc, value) => acc + value, 0);
  }

  getAllBuyers(){
    this.buyersService.getAllBuyers().subscribe((data: any) => {
      this.buyers = data;
      console.log(this.buyers);
    })
  }

  selectedBuyer(buyer: Buyer){
    this.city = buyer.city;
    this.address = buyer.adress;
  }
}
