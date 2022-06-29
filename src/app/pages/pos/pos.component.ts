import { Component, OnInit, ViewChild } from '@angular/core';
import { BuyersService } from 'src/app/services/buyers.service';
import { Buyer } from 'src/app/models/buyer.model';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { ProductToBasket } from 'src/app/models/product-to-basket.model';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})

export class PosComponent implements OnInit {
  userMessage= "";
  constructor(private buyersService: BuyersService, private productsService: ProductsService, private jwtHelper : JwtHelperService) { }

  buyers: Buyer[] = [];
  products: Product[] = [];



  city!: string;
  address!: string;
  today = new Date();
  withoutDiscount: number = 0;
  discount!: number;

  quantity!: number;
  productsInBasket: ProductToBasket[] = [];
  displayedColumns: string[] = ['code', 'name', 'measure', 'price', 'quantity', 'options'];

  /** control for the selected product */
  public productCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public productFilterCtrl: FormControl = new FormControl();

  /** list of products filtered by search keyword */
  public filteredProducts: ReplaySubject<Product[]> = new ReplaySubject<Product[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  ngOnInit(): void {
    this.getAllBuyers();
    this.getAllProducts();
    this.getUserName();


    // set initial selection
    //this.productCtrl.setValue(this.products[1]);

    // load the product list
    this.filteredProducts.next(this.products.slice());

    // listen for search field value changes
    this.productFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProducts();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  getAllBuyers() {
    this.buyersService.getAllBuyers().subscribe((data: any) => {
      this.buyers = data;
      //console.log(this.buyers);
    })
  }

  selectedBuyer(buyer: Buyer) {
    this.city = buyer.city;
    this.address = buyer.adress;
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((data: any) => {
      this.products = data;
      //console.log(this.products);
    })
  }

  /**
  * Sets the initial value after the filteredBanks are loaded initially
  */
  protected setInitialValue() {
    this.filteredProducts
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredProducts are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Product, b: Product) => a && b && a.id === b.id;
      });
  }

  protected filterProducts() {
    if (!this.products) {
      return;
    }
    // get the search keyword
    let search = this.productFilterCtrl.value;
    if (!search) {
      this.filteredProducts.next(this.products.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the products
    this.filteredProducts.next(
      this.products.filter(product => product.name.toLowerCase().indexOf(search) > -1 || product.cipher.toLowerCase().indexOf(search) > -1)
    );
  }

  addProductToBasket(product: ProductToBasket) {
    const newBasket = this.productsInBasket;
    product['quantity'] = this.quantity;
    
    
    // console.log(product.quantity);
    // console.log(product);
    const isAdded = this.productsInBasket.some(p => p.name === product.name)
    if(isAdded){
      console.log("product already added")
      return;
    }else { 
      this.productsInBasket.push(product);
      this.productsInBasket = [...newBasket];
    }
  }

  increaseAmount (product: ProductToBasket) {
    const newBasket = this.productsInBasket;
    product.quantity++;
    this.productsInBasket = [...newBasket];
    console.log(this.productsInBasket)
  }

  decreaseAmount (product: ProductToBasket) {
    const newBasket = this.productsInBasket;
    if(product.quantity !== 1){
      product.quantity--;
    }
    this.productsInBasket = [...newBasket];
  }

  deleteProductFromBasket(id: number) {
    this.productsInBasket = this.productsInBasket.filter(item => item.id != id);
  }

  getWithoutDiscount() {
    this.withoutDiscount = this.productsInBasket.map(p => p.price * p.quantity).reduce((acc, value) => acc + value, 0);
    return this.withoutDiscount;
  }

  getDiscountInPrice() {
    return this.getWithoutDiscount() * (this.discount / 100);
  }

  getTotalToPay() {
    if (this.discount) {
      return this.getWithoutDiscount() - (this.getWithoutDiscount() * (this.discount / 100));
    }
    return this.getWithoutDiscount();
  }

  getUserName() {
    const token = localStorage.getItem("token");
    if(token == null){
      console.log("Token incorrect")
    } else{

      const decodedToken = this.jwtHelper.decodeToken(token);
      var key = Object.values(decodedToken);
      console.log(key[1]);
      this.userMessage = `Welcome ${key[1]}`
    }

  }
}