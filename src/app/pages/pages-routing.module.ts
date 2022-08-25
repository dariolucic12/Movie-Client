import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosGuard } from '../guards/pos.guard';
import { MovieByIdComponent } from './movie-by-id/movie-by-id.component';
import { PagesComponent } from './pages.component';
import { PosComponent } from './pos/pos.component';
import { ProductsComponent } from './products/products.component';
import { ReviewComponent } from './review/review.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent
  },
  {
    path: 'bill/:id',
    component: PosComponent
  },
  {
    path: 'movie/:id',
    component: MovieByIdComponent
  },
  { 
    path: 'home', 
    component: TransactionsComponent 
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
