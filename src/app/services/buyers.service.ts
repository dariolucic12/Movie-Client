import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Buyer } from '../models/buyer.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class BuyersService extends BaseApiService{

  constructor(http: HttpClient) {
    super(http, 'https://localhost:7288/api/buyer/');
  }

  getAllBuyers(): Observable<Object> {
    return this.http.get(this.apiRoute);
  }

  getBuyerByID(id: number): Observable<Object> {
    return this.http.get(this.apiRoute + id);
  }

  addNewBuyer(buyer: Buyer): Observable<Object> {
    return this.http.post(this.apiRoute, buyer);
  }

  updateBuyer(buyer: Buyer): Observable<Object> {
    return this.http.put(this.apiRoute, buyer);
  }

  deleteBuyer(id: number): Observable<Object> {
    return this.http.delete(this.apiRoute + id);
  }
}
