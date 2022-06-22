import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { PosComponent } from './pos/pos.component';
import { ProductsComponent } from './products/products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    PosComponent,
    ProductsComponent,
    PageNotFoundComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
