import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  
  constructor(private _formBuilder: FormBuilder) { }
  
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });


  ngOnInit(): void {
  }

}
