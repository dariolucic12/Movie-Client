import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { PosComponent } from './pos/pos.component';
import { ProductsComponent } from './products/products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PagesComponent } from './pages.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEditProductComponent } from './products/add-edit-product/add-edit-product/add-edit-product.component';
import { FormsModule } from '@angular/forms';
import { ProductIdPipe } from 'src/app/services/product-id.pipe';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { HotToastModule } from '@ngneat/hot-toast';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core'
import {MatTabsModule} from '@angular/material/tabs';
import { MovieByIdComponent } from './movie-by-id/movie-by-id.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStarRatingModule } from 'ngx-star-rating';


@NgModule({
  declarations: [
    TransactionsComponent,
    PosComponent,
    ProductsComponent,
    PageNotFoundComponent,
    PagesComponent,
    AddEditProductComponent,
    ProductIdPipe,
    AddEditProductComponent,
    MovieByIdComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatGridListModule,
    HotToastModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    NgxStarRatingModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }
  ]
})
export class PagesModule { }