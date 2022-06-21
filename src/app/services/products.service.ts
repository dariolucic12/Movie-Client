import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseApiService{

  constructor(httpClient: HttpClient) { 
    super(httpClient, 'api/product/');
  }

  getAllProducts(): Observable<Object> {
    return this.httpClient.get(this.apiRoute);
  }

  getProductByID(id: number): Observable<Object> {
    return this.httpClient.get(this.apiRoute + id);
  }

  addNewProduct(){
    
  }

}
