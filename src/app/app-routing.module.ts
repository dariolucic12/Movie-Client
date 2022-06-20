import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PosComponent } from './pages/pos/pos.component';
import { ProductsComponent } from './pages/products/products.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: TransactionsComponent },
  { path: 'pos', component: PosComponent },
  { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
