import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BuyersService } from 'src/app/services/buyers.service';
import { Buyer } from 'src/app/models/buyer.model';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { ProductToBasket } from 'src/app/models/product-to-basket.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ComponentCanDeactivate } from 'src/app/models/ComponentCanDeactivate';
import { BillsService } from 'src/app/services/bills.service';
import { BillBody } from 'src/app/models/bill-body.model';
import { TileStyler } from '@angular/material/grid-list/tile-styler';
import { BillHeader } from 'src/app/models/bill-header.model';
import { ProductSale } from 'src/app/models/productSale.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})

export class PosComponent implements OnInit {
  userMessage = "";
  constructor(private buyersService: BuyersService, private productsService: ProductsService, private jwtHelper: JwtHelperService,
    private billsService: BillsService, private activatedRoute: ActivatedRoute) { }

  canDeactivate(): boolean {
    if (this.productsInBasket.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  //////////////variables for billViewMode//////////////
  billViewMode: boolean = false;
  billViewModeBody: BillBody[] = [];
  productToShowOnView: ProductToBasket = {
    id: 0,
    cipher: '',
    name: '',
    measure: '',
    price: 0,
    count: 0,
    quantity: 0,
    discount: 0,
    discountAmount: 0,
    totalPrice: 0
  }

  buyer: Buyer = {
    id: 0,
    cipher: '',
    name: '',
    city: '',
    adress: ''
  }

  //////////////INFORMACIJE ZA HEADER////////////// 
  //trebat ce se hvatat id od kupca kod dodavanja u header
  city!: string;
  address!: string;
  today = new Date();

  buyers: Buyer[] = [];
  products: Product[] = [];
  billHeader: BillHeader = {
    number: 22,
    date: this.today.toISOString(),
    buyerId: 0,
    id: 0
  }
  billBody: BillBody = {
    price: 0,
    quantity: 0,
    discount: 0,
    discountAmount: 0,
    totalPrice: 0,
    productId: 0,
    billHeaderId: 0
  };


  //////////////INFORMACIJE ZA BODY//////////////
  //id ce se automatski dodjelit u bazi
  //productsInBasket varijabla sadrzi info o dodanim productima u kasu, cijena svakog, kolicina, ukupna cijena svakog, proizvod id svakog
  //te naknadno zaglavlje id kojeg cemo dobiti odmah nakon spremanja headera u bazu
  productsInBasket: ProductToBasket[] = [];
  discount!: number; //poseban za svaki product - discount/100
  discountAmount!: number;
  totalDiscount!: number; //isti za cijeli racun - discount/100
  withoutTotalDiscount: number = 0;

  quantity!: number;
  displayedColumns: string[] = ['code', 'name', 'measure', 'quantity', 'price', 'discount', 'discountAmount', 'totalPrice', 'options'];

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

    this.activatedRoute.paramMap.subscribe(param => {
      console.log("param je: " + param.get('id'))
      var id = param.get('id');

      if (param.get('id') === null) {
        console.log('POS Mode');
        this.billViewMode = false;
      }
      else {
        console.log('billViewMode');
        this.billViewMode = true;
        console.log("parsan id value je " + parseInt(id!))
        this.getBillBody(parseInt(id!));
        //console.log("billviewbody je " + this.billViewModeBody)
      }
    })


    if (this.billViewMode === true) {
      this.displayedColumns = ['code', 'name', 'measure', 'quantity', 'price', 'discount', 'discountAmount', 'totalPrice'];
    }

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
    this.billHeader.buyerId = buyer.id;
  }

  dataSale: ProductSale[] = [];


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

    const isAdded = this.productsInBasket.some(p => p.name === product.name)
    if (isAdded) {
      console.log("product already added");
      return;
    } else {
      this.productsInBasket.push(product);
      this.productsInBasket = [...newBasket];
    }

    product['quantity'] = this.quantity;
    product['discount'] = this.discount;
    product['discountAmount'] = (product.price * product.quantity) * (product.discount / 100);
    if (product.discount) {
      product['totalPrice'] = (product.price * product.quantity) - ((product.price * product.quantity) * (product.discount / 100));
    } else {
      product['totalPrice'] = (product.price * product.quantity);
      product['discount'] = 0;
      product['discountAmount'] = 0;
    }


    console.log("datainbasket je " + JSON.stringify(this.billViewModeBody[0]))
    // console.log(product.quantity);
    // console.log(product);
  }

  // isProductAlreadyInBasket(product: ProductToBasket, newBasket: ProductToBasket[]){}

  increaseAmount(product: ProductToBasket) {
    const newBasket = this.productsInBasket;
    product.quantity++;
    product['discountAmount'] = (product.price * product.quantity) * (product['discount'] / 100);
    product['totalPrice'] = (product.price * product.quantity) - ((product.price * product.quantity) * (product['discount'] / 100));
    this.productsInBasket = [...newBasket];
    console.log(this.productsInBasket)
  }

  decreaseAmount(product: ProductToBasket) {
    const newBasket = this.productsInBasket;
    if (product.quantity !== 1) {
      product.quantity--;
      product['discountAmount'] = (product.price * product.quantity) * (product['discount'] / 100);
      product['totalPrice'] = (product.price * product.quantity) - ((product.price * product.quantity) * (product['discount'] / 100));
    }
    this.productsInBasket = [...newBasket];
  }

  decreaseDiscount(product: ProductToBasket) {
    const newBasket = this.productsInBasket;
    if (product.discount !== 1) {
      product.discount--;
      product['discountAmount'] = (product.price * product.quantity) * (product['discount'] / 100);
      product['totalPrice'] = (product.price * product.quantity) - ((product.price * product.quantity) * (product['discount'] / 100));
    }
    this.productsInBasket = [...newBasket];
  }

  increaseDiscount(product: ProductToBasket) {
    const newBasket = this.productsInBasket;
    product.discount++;
    product['discountAmount'] = (product.price * product.quantity) * (product['discount'] / 100);
    product['totalPrice'] = (product.price * product.quantity) - ((product.price * product.quantity) * (product['discount'] / 100));
    this.productsInBasket = [...newBasket];
    console.log(this.productsInBasket);
  }

  deleteProductFromBasket(id: number) {
    this.productsInBasket = this.productsInBasket.filter(item => item.id != id);
  }

  getWithoutTotalDiscount() {
    this.withoutTotalDiscount = this.productsInBasket.map(p => p.totalPrice).reduce((acc, value) => acc + value, 0);
    return this.withoutTotalDiscount;
  }

  getDiscountInPrice() {
    return this.getWithoutTotalDiscount() * (this.totalDiscount / 100);
  }

  getTotalToPay() {
    if (this.totalDiscount) {
      return this.getWithoutTotalDiscount() - (this.getWithoutTotalDiscount() * (this.totalDiscount / 100));
    }
    return this.getWithoutTotalDiscount();
  }

  getUserName() {
    const token = localStorage.getItem("token");
    if (token == null) {
      console.log("Token incorrect")
    } else {

      const decodedToken = this.jwtHelper.decodeToken(token);
      var key = Object.values(decodedToken);
      console.log(key[1]);
      this.userMessage = `Welcome ${key[1]}`
    }
  }

  onCheckout() {
    //salji billHeader
    this.billsService.addNewHeader(this.billHeader).subscribe((data) => {
      //get billHeader id
      //this.billBody.billHeaderId = data.id;
      for (const product of this.productsInBasket) {
        this.billBody.price = product.price;
        this.billBody.quantity = product.quantity;
        this.billBody.discount = product.discount;
        this.billBody.discountAmount = product.discountAmount;
        this.billBody.totalPrice = product.totalPrice;
        this.billBody.productId = product.id;
        this.billBody.billHeaderId = data.id;

        this.billsService.addNewBody(this.billBody).subscribe();
        console.log("Racun dodan u prethodne transakcije!");
        console.log(this.billBody);
      }
      //console.log(data.id);
    });
    //this.billsService.getAllBillHeaders().subscribe();

    //salji billbody s product id-em i header id-em
    console.log(this.billHeader);

    //console.log(this.productsInBasket);
  }


  getBillBody(id: number) {
    this.billsService.getBillBodiesByHeader(id).subscribe((dataOfBillBody: any) => {
      //this.billViewModeBody.push(data);
      for(const bill of dataOfBillBody){
        this.productsService.getProductByID(bill.productId).subscribe((dataOfProduct: any) => {
          this.productToShowOnView.id = dataOfProduct.id;
          this.productToShowOnView.cipher = dataOfProduct.cipher;
          this.productToShowOnView.name = dataOfProduct.name;
          this.productToShowOnView.measure = dataOfProduct.measure;
          this.productToShowOnView.count = dataOfProduct.count;
          this.productToShowOnView.price = bill.price;
          this.productToShowOnView.count = bill.count;
          this.productToShowOnView.quantity = bill.quantity;
          this.productToShowOnView.discount = bill.discount;
          this.productToShowOnView.discountAmount = bill.discountAmount;
          this.productToShowOnView.totalPrice = bill.totalPrice;
          console.log(this.productToShowOnView);
          
          const newBasket = this.productsInBasket;
          this.productsInBasket.push(this.productToShowOnView);
          this.productsInBasket = [...newBasket];
          console.log(this.productsInBasket);
        })
      }

          this.billsService.getBillHeaderByID(dataOfBillBody[0].billHeaderId).subscribe((dataOfHeader: any) => {
            this.billHeader.date = dataOfHeader.date;

            this.buyersService.getBuyerByID(dataOfHeader.buyerId).subscribe((dataOfBuyer: Buyer) => {
              // this.buyer.adress = dataOfBuyer.adress;
              // this.buyer.city = dataOfBuyer.city;
              // this.buyer.name = dataOfBuyer.name;

              this.buyer = dataOfBuyer;
            })
          })

          // console.log("data iz bill servisa je " + JSON.stringify(dataOfBillBody));
          // console.log("data iz product servisa je " + JSON.stringify(dataOfProduct));

          // console.log("product to show on view: " + JSON.stringify(this.productToShowOnView));
          // console.log("productsInBasket je " + JSON.stringify(this.productsInBasket))
      
      //console.log("billviewbody je " + JSON.stringify(this.billViewModeBody))
      //console.log("datainbasket je " + JSON.stringify(this.billViewModeBody[0].id))
    });
  }
}
