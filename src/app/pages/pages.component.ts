import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductToBasket } from '../models/product-to-basket.model';
import { DialogService } from '../services/dialog.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  
  welcomeUser = "";

  public productsInBasket: ProductToBasket [] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private dialog: DialogService,
    private jwtHelper: JwtHelperService,
  ) { }
  
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });


  ngOnInit(): void {
    this.getUserName();
  }

  logout(): void {
    localStorage.removeItem("token")
    this.router.navigate(['/auth/login']);
  }

  
  getUserName() {
    const token = localStorage.getItem("token");
    if (token == null) {
      console.log("Token incorrect")
    } else {

      const decodedToken = this.jwtHelper.decodeToken(token);
      var key = Object.values(decodedToken);
      console.log(key[1]);
      this.welcomeUser = `${key[0]}`
    }
  }

}
