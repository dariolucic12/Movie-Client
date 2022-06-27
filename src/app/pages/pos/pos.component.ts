import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from './product';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})


export class PosComponent implements OnInit {
  userMessage = ""

  constructor(
    private productsService: ProductsService,
    private jwtHelper : JwtHelperService
  ) { }


  ngOnInit(): void {
    this.getAllProducts();
    this.getUserName();
  }
  

  displayedColumns: string[] = ['code', 'name', 'measure', 'price', 'count', 'options'];
  
  dataSource: Product[] = [];

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((data: any) => {
      this.dataSource = data;
      console.log(data);
      return data;
    });
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
