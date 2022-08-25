import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends BaseApiService {

  constructor(http: HttpClient) {
    super(http, 'https://localhost:7182/api/review/');
  }

  getReviewOfUser(id: string): Observable<Review[]> {
    return this.http.get(this.apiRoute + id).pipe(
      map(response => response as Review[])
    )
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post(this.apiRoute, review).pipe(
      map(response => response as Review)
    );
  }

  updateReview(review: Review): Observable<Review> {
    return this.http.put(this.apiRoute, review).pipe(
      map(response => response as Review)
    );
  }
}
