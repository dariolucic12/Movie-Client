import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { Top250Movie } from '../models/top250Movie.model';
import { Watchlist } from '../models/watchlist.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService extends BaseApiService {

  constructor(http: HttpClient) {
    super(http, 'https://localhost:7182/api/watchlist/');
  }

  getWatchlistOfUser(id: string): Observable<Watchlist[]>{
    return this.http.get(this.apiRoute + id).pipe(
        map(response => response as Watchlist[])
    )
  }

  addToWatchlist(watchlist: Watchlist): Observable<Watchlist>{
      return this.http.post(this.apiRoute, watchlist).pipe(
        map(response => response as Watchlist)
      );
  }

  deleteFromWatchlist(id: number): Observable<Watchlist>{
    return this.http.delete(this.apiRoute + id).pipe(
      map(response => response as Watchlist)
    );
  }
}
