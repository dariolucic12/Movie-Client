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
import { EditProductComponent } from './edit-product/edit-product.component';
import { DialogService } from 'src/app/services/dialog.service';
import { Title } from '@angular/platform-browser';

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

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialogService: DialogService  
  ) { }

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
    const deleting = this.dialogService.confirmDialog({
      title: "Deleting Product",
      message: "Are you sure you want to delete this product?",
      confirmText: "Yes",
      cancelText:"No"
    }).subscribe(data =>{
      if(data){
        console.log(deleting)
        this.productsService.deleteProduct(id).subscribe(res => {
          this.getAllProducts(); //obavezno stavit u subscribe!
        });
      }
      return;
    })

    //obavezno stavit u subscribe!

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

  updateProduct(product: Product){
    this.productsService.updateProduct(product).subscribe(res => {
      this.getAllProducts();
    });
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
        //console.log('The dialog was closed and the data is ' + JSON.stringify(result));
        this.addProduct(result);
      }
    });
  }

  openDialogForUpdate(element: Product) {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;

    dialogConfig.data = {
      id: element.id,
      cipher: element.cipher,
      name: element.name,
      measure: element.measure,
      price: element.price,
      count: element.count,
    };

    //console.log("clicked product with id: " + JSON.stringify(element));

    const dialogRef = this.dialog.open(EditProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //console.log('The dialog was closed and the data is ' + JSON.stringify(result));
        this.updateProduct(result);
      }
    });
  }
}