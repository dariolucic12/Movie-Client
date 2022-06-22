import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { 
    path: 'auth', 
    component: LoginComponent,
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./auth/auth.module') //import routing from AuthRoutingModule
    .then(m => m.AuthModule),
  },
  {
    path: 'pages',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/pages.module') //import routing from PagesRoutingModule
    .then(m => m.PagesModule),
  },
  { 
    path: '', 
    redirectTo: 'pages', 
    pathMatch: 'full' //in this case: http://localhost:4200/
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
