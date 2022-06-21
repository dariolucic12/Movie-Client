import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  protected apiRoute = '';

  constructor(
    protected httpClient: HttpClient,
    @Inject(String) apiRoute: string
  ) { 
    this.apiRoute = apiRoute;
  }
}
