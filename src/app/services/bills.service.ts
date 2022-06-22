import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillBody } from '../models/bill-body.model';
import { BillHeader } from '../models/bill-header.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class BillsService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http, 'https://localhost:7288/api/bill');
  }

  headerPath: string = 'header/';
  bodyPath: string = 'body/'

  getAllBillHeaders(): Observable<Object> {
    return this.http.get(this.apiRoute + this.headerPath);
  }

  getBillHeaderByID(id: number): Observable<Object> {
    return this.http.get(this.apiRoute + this.headerPath + id);
  }

  addNewHeader(header: BillHeader): Observable<Object> {
    return this.http.post(this.apiRoute + this.headerPath, header);
  }

  updateHeader(header: BillHeader): Observable<Object> {
    return this.http.put(this.apiRoute, header);
  }

  deleteHeader(id: number): Observable<Object> {
    return this.http.delete(this.apiRoute + this.headerPath + id);
  }

  getAllBillBodies(): Observable<Object> {
    return this.http.get(this.apiRoute + this.bodyPath);
  }

  getBillBodyByID(id: number): Observable<Object> {
    return this.http.get(this.apiRoute + this.bodyPath + id);
  }

  addNewBody(body: BillBody): Observable<Object> {
    return this.http.post(this.apiRoute + this.bodyPath, body);
  }

  updateBody(body: BillBody): Observable<Object> {
    return this.http.put(this.apiRoute, body);
  }

  deleteBody(id: number): Observable<Object> {
    return this.http.delete(this.apiRoute + this.bodyPath + id);
  }
}
