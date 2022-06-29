import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseApiService {

  constructor(http: HttpClient) {
    super(http, 'https://localhost:7288/api/product/');
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  getAllProducts(): Observable<Product[]> {
    return this.http.get(this.apiRoute).pipe(
      map(response => response as Product[])
    );;
  }

  getProductByID(id: number): Observable<Product> {
    return this.http.get(this.apiRoute + id).pipe(
      map(response => response as Product)
    );
  }

  addNewProduct(product: Product): Observable<Product> {
    return this.http.post(this.apiRoute, product).pipe(
      map(response => response as Product)
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put(this.apiRoute, product).pipe(
      map(response => response as Product)
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete(this.apiRoute + id).pipe(
      map(response => response as Product)
    );
  }
}
