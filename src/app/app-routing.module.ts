import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { 
    path: 'auth', 
    component: LoginComponent,
    loadChildren: () => import('./auth/auth.module') //import routing from AuthRoutingModule
    .then(m => m.AuthModule),
  },
  { 
    path: 'register', 
    component: RegistrationComponent,
    loadChildren: () => import('./auth/auth.module') //import routing from AuthRoutingModule
    .then(m => m.AuthModule),
  },
  {
    path: 'pages',
    canActivate: [AuthGuard],
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
