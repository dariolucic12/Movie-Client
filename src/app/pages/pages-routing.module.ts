import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieByIdComponent } from './movie-by-id/movie-by-id.component';
import { PagesComponent } from './pages.component';
import { ReviewComponent } from './review/review.component';
import { HomeComponent } from './home/home.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent
  },
  {
    path: 'movie/:id',
    component: MovieByIdComponent
  },
  { 
    path: 'home', 
    component: HomeComponent 
  },
  { 
    path: 'watchlist', 
    component: WatchlistComponent 
  },
  { 
    path: 'myMovies', 
    component: ReviewComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
