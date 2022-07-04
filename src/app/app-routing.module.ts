import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { LogedInGuard } from './guards/loged-in.guard';
import { PosGuard } from './guards/pos.guard';


const routes: Routes = [
  { 
    path: 'auth', 
    canActivate: [LogedInGuard],
    component: LoginComponent,
    loadChildren: () => import('./auth/auth.module') //import routing from AuthRoutingModule
    .then(m => m.AuthModule),
  },
  { 
    path: 'register', 
    canActivate: [LogedInGuard],
    component: RegistrationComponent,
    loadChildren: () => import('./auth/auth.module') //import routing from AuthRoutingModule
    .then(m => m.AuthModule),
  },
  {
    path: 'pages',
    canActivate: [AuthGuard],
    //canDeactivate: [PosGuard],
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
