import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

// const PRODUCT_DATA: Product[] = [
//   { cipher: 'dfasdfdsafds', name: 'Chair', measure: 'komad', price: 22.00, count: 80},
//   { cipher: 'fdsfdsafsdfa', name: 'Desk', measure: 'komad', price: 50.00, count: 100},
//   { cipher: 'fdsfadsfdsas', name: 'PC', measure: 'komad', price: 200.00, count: 30},
//   { cipher: 'gfdsggfgdsgf', name: 'Monitor', measure: 'komad', price: 120.00, count: 50}
// ];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  displayedColumns: string[] = ['code', 'name', 'measure', 'price', 'count', 'options'];
  dataSource: Product[] = [];

  getAllOrders() {
    this.productsService.getAllProducts().subscribe((data: any) => {
      this.dataSource = data;
      console.log(data);
      return data;
    });
  }

  clicked(id: number){
    console.log("Clicked product with id " + id);
  }

  deleteProduct(id: number){
    this.productsService.deleteProduct(id);
    console.log("Deleted product with id " + id);
  }
}
