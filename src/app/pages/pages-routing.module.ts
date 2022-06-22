import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PosComponent } from './pos/pos.component';
import { ProductsComponent } from './products/products.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent
  },
  { 
    path: 'home', 
    component: TransactionsComponent },
  { 
    path: 'pos', 
    component: PosComponent 
  },
  { 
    path: 'products', 
    component: ProductsComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
