import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { Top250Movie } from '../models/top250Movie.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ImdbApiService extends BaseApiService {

  constructor(http: HttpClient) {
    super(http, 'https://imdb-api.com/en/API/Top250Movies/k_6x2wbf33');
  }

  getTopMovies(): Observable<Top250Movie[]> {
    return this.http.get(this.apiRoute).pipe(
      map(response => response as Top250Movie[])
    );
  }

  getMovieById(id: string): Observable<Movie>{
    return this.http.get("https://imdb-api.com/en/API/Title/k_6x2wbf33/" + id).pipe(
      map(response => response as Movie)
    );
  }
}
