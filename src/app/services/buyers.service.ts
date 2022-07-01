import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Buyer } from '../models/buyer.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class BuyersService extends BaseApiService{

  constructor(http: HttpClient) {
    super(http, 'https://localhost:7288/api/buyer/');
  }

  getAllBuyers(): Observable<Buyer[]> {
    return this.http.get(this.apiRoute).pipe(
      map(response => response as Buyer[])
    );
  }

  getBuyerByID(id: number): Observable<Buyer> {
    return this.http.get(this.apiRoute + id).pipe(
      map(response => response as Buyer)
    );
  }

  addNewBuyer(buyer: Buyer): Observable<Buyer> {
    return this.http.post(this.apiRoute, buyer).pipe(
      map(response => response as Buyer)
    );
  }

  updateBuyer(buyer: Buyer): Observable<Buyer> {
    return this.http.put(this.apiRoute, buyer).pipe(
      map(response => response as Buyer)
    );
  }

  deleteBuyer(id: number): Observable<Buyer> {
    return this.http.delete(this.apiRoute + id).pipe(
      map(response => response as Buyer)
    );
  }
}
