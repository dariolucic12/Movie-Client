import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) { }

  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  ngOnInit(): void {
  }

}
