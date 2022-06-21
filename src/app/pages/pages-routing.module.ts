import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosComponent } from './pos/pos.component';
import { ProductsComponent } from './products/products.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent
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
