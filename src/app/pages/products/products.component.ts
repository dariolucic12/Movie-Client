import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
  { cipher: 'dfasdfdsafds', name: 'Chair', measure: 'komad', price: 22.00, count: 80 },
  { cipher: 'fdsfdsafsdfa', name: 'Desk', measure: 'komad', price: 50.00, count: 100 },
  { cipher: 'fdsfadsfdsas', name: 'PC', measure: 'komad', price: 200.00, count: 30 },
  { cipher: 'gfdsggfgdsgf', name: 'Monitor', measure: 'komad', price: 120.00, count: 50 }
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatTable) productTable!: MatTable<any>;

  newProduct: Product = {
    cipher: '',
    name: '',
    measure: '',
    price: 1,
    count: 1
  };


  constructor(private productsService: ProductsService, private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  displayedColumns: string[] = ['code', 'name', 'measure', 'price', 'count', 'options'];
  dataSource: Product[] = [];


  getAllProducts() {
    this.productsService.getAllProducts().subscribe((data: any) => {
      this.dataSource = data;
      console.log(this.dataSource);
      this.changeDetectorRefs.detectChanges();

      return data;
    });
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe(res => {
      this.getAllProducts(); //obavezno stavit u subscribe!
    });
    // console.log("Deleted product with id " + id);
    //this.dataSource = this.dataSource.filter(item => item.id != id);
    //console.log(this.dataSource);
  }

  addProduct(product: Product) {
    this.productsService.addNewProduct(product).subscribe(res => {
      this.getAllProducts(); //obavezno stavit u subscribe!
    });
    //this.changeDetectorRefs.detectChanges();
    //this.getAllProducts();
    //this.dataSource = this.dataSource.concat(product);

  }

  updateProduct(product: Product) {
    this.productsService.updateProduct(product).subscribe(res => {
      this.getAllProducts();
    });
  }

  openDialog(product: Product) {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;

    if (product.name === '') {
      console.log("metoda za dodavanje");
      dialogConfig.data = {
        cipher: this.newProduct.cipher,
        name: this.newProduct.name,
        measure: this.newProduct.measure,
        price: this.newProduct.price,
        count: this.newProduct.count,
      };

      const dialogRef = this.dialog.open(AddEditProductComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          //console.log('The dialog was closed and the data is ' + JSON.stringify(result));
          this.addProduct(result);
        }
      });
    } else {
      console.log("metoda za update");
      dialogConfig.data = {
        id: product.id,
        cipher: product.cipher,
        name: product.name,
        measure: product.measure,
        price: product.price,
        count: product.count,
      };
  
      //console.log("clicked product with id: " + JSON.stringify(product));
  
      const dialogRef = this.dialog.open(AddEditProductComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          //console.log('The dialog was closed and the data is ' + JSON.stringify(result));
          this.updateProduct(result);
        }
      });
    }
  }
}