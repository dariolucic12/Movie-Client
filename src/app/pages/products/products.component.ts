import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TitleStrategy } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { AddEditProductComponent } from './add-edit-product/add-edit-product/add-edit-product.component';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

 const PRODUCT_DATA: Product[] = [
{ cipher: 'dfasdfdsafds', name: 'Chair', measure: 'komad', price: 22.00, count: 80},
   { cipher: 'fdsfdsafsdfa', name: 'Desk', measure: 'komad', price: 50.00, count: 100},
  { cipher: 'fdsfadsfdsas', name: 'PC', measure: 'komad', price: 200.00, count: 30},
  { cipher: 'gfdsggfgdsgf', name: 'Monitor', measure: 'komad', price: 120.00, count: 50}
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatTable) productTable!: MatTable<any>;

  cipher!: string;
  name!: string;
  measure!: string;
  price!: number;
  count!: number;

  constructor(private productsService: ProductsService, private dialog: MatDialog) { }

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

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe();
    // console.log("Deleted product with id " + id);
    // this.productTable.renderRows();
    this.dataSource = this.dataSource.filter(item => item.id != id);
    //console.log(this.dataSource);
  }

  addProduct(product: Product) {
    this.productsService.addNewProduct(product).subscribe();
    //data => this.dataSource.push(data); ovak ne radi zasad
    //update MatTable mozda data => this.dataSource.push(data)
    //this.dataSource.push(product);  ?    

  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;

    dialogConfig.data = {
      cipher: this.cipher,
      name: this.name,
      measure: this.measure,
      price: this.price,
      count: this.count,
    };

    const dialogRef = this.dialog.open(AddEditProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed and the data is ' + result);
        this.addProduct(result);
      }
    });
  }

}