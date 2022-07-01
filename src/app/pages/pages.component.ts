import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductToBasket } from '../models/product-to-basket.model';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  
  public productsInBasket: ProductToBasket [] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private dialog: DialogService,
  ) { }
  
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });


  ngOnInit(): void {
  }

}
