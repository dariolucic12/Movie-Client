import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { AuthModule } from './auth/auth.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PagesModule,
    MatToolbarModule,
    AuthModule
  ],
  providers: [JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}],
  bootstrap: [AppComponent]
})
export class AppModule { }