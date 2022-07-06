import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  getAllBillHeaders(): Observable<BillHeader[]> {
    return this.http.get(this.apiRoute + this.headerPath).pipe(
      map(response => response as BillHeader[])
    );
  }

  getBillHeaderByID(id: number): Observable<Object> {
    return this.http.get(this.apiRoute + this.headerPath + id);
  }

  addNewHeader(header: BillHeader): Observable<BillHeader> {
    return this.http.post(this.apiRoute + this.headerPath, header).pipe(
      map(response => response as BillHeader)
    );
  }

  updateHeader(header: BillHeader): Observable<BillHeader> {
    return this.http.put(this.apiRoute, header).pipe(
      map(response => response as BillHeader)
    );
  }

  deleteHeader(id: number): Observable<BillHeader> {
    return this.http.delete(this.apiRoute + this.headerPath + id).pipe(
      map(response => response as BillHeader)
    );
  }

  getAllBillBodies(): Observable<BillBody[]> {
    return this.http.get(this.apiRoute + this.bodyPath).pipe(
      map(response => response as BillBody[])
    );
  }

  getBillBodyByID(id: number): Observable<BillBody> {
    return this.http.get(this.apiRoute + this.bodyPath + id).pipe(
      map(response => response as BillBody)
    );
  }

  addNewBody(body: BillBody): Observable<BillBody> {
    return this.http.post(this.apiRoute + this.bodyPath, body).pipe(
      map(response => response as BillBody)
    );
  }

  updateBody(body: BillBody): Observable<BillBody> {
    return this.http.put(this.apiRoute, body).pipe(
      map(response => response as BillBody)
    );
  }

  deleteBody(id: number): Observable<BillBody> {
    return this.http.delete(this.apiRoute + this.bodyPath + id).pipe(
      map(response => response as BillBody)
    );
  }

  getBillBodiesByHeader(headerId : number): Observable<Object> {
    return this.http.get(this.apiRoute + this.bodyPath + 'bill/' + headerId);
  }
}
