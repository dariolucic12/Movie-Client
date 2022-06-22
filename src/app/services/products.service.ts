import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseApiService {

  constructor(http: HttpClient) {
    super(http, 'https://localhost:7288/api/product/');
  }

  getAllProducts(): Observable<Object> {
    return this.http.get(this.apiRoute);
  }

  getProductByID(id: number): Observable<Object> {
    return this.http.get(this.apiRoute + id);
  }

  addNewProduct(product: Product): Observable<Object> {
    return this.http.post(this.apiRoute, product);
  }

  updateProduct(product: Product): Observable<Object> {
    return this.http.put(this.apiRoute, product);
  }

  deleteProduct(id: number): Observable<Object> {
    return this.http.delete(this.apiRoute + id);
  }
}
