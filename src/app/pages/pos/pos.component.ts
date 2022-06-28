import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { elementAt, Observable } from 'rxjs';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from './product';
import { JwtHelperService } from "@auth0/angular-jwt";
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProductSale } from 'src/app/models/productSale.model';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})


export class PosComponent implements OnInit {
  userMessage = ""
  productAmount = 0;
  myForm!: FormGroup;


  constructor(
    private productsService: ProductsService,
    private jwtHelper : JwtHelperService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.getAllProducts();
    this.getUserName();
    this.myForm = this.fb.group({
      products: this.fb.array([])
    })
  }
  

  displayedColumns: string[] = ['code', 'name', 'measure', 'price', 'count', 'options', 'total' ];
  
  dataSource: Product[] = [];

  dataSale: ProductSale[] = [];


  getAllProducts() {
    this.productsService.getAllProducts().subscribe((data: any) => {
      this.dataSource = data;
      data.forEach((element: { amount: number; }) => { element.amount = 0})
      console.log(data);
      return data;
    });
  }

  addProduct(element: Product){
    element.count -=1;
    this.dataSale.push(element);
    console.log(element)
    console.log(this.dataSale)
  }

  get addedProductsForm() {
    return this.myForm.get('products') as FormArray
  }

  addingProduct() {
    const product = this.fb.group({
      name: [],
      price: [],
      count: [],
    })

    this.addedProductsForm.push(product)
  }
  
  removeProduct(i : number) {
    this.addedProductsForm.removeAt(i);
  }

  
  getUserName() {
    const token = localStorage.getItem("token");
    if(token == null){
      console.log("Token incorrect")
    } else{

      const decodedToken = this.jwtHelper.decodeToken(token);
      var key = Object.values(decodedToken);
      console.log(key[1]);
      this.userMessage = `Hi ${key[1]}`
    }

  }
}
