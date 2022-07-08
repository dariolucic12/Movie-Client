import { Component, OnInit, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BuyersService } from 'src/app/services/buyers.service';
import { Buyer } from 'src/app/models/buyer.model';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { ProductToBasket } from 'src/app/models/product-to-basket.model';
import { BillsService } from 'src/app/services/bills.service';
import { BillBody } from 'src/app/models/bill-body.model';
import { BillHeader } from 'src/app/models/bill-header.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})

export class PosComponent implements OnInit {
  userMessage = "";
  maxDate = new Date();
  date : any;
  selectedDate: string = "";
  constructor(
    private buyersService: BuyersService, 
    private productsService: ProductsService,
    private billsService: BillsService, 
    private activatedRoute: ActivatedRoute, 
    private cd: ChangeDetectorRef, 
    private toast: HotToastService,
    private router: Router

  ) { 
  
  }

  canDeactivate(): boolean {
    if (this.productsInBasket.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  //////////////variables for billViewMode//////////////
  billViewMode: boolean = false;
  billViewModeBody: ProductToBasket[] = [];

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
  totalDiscount!: number; //isti za cijeli racun - discount/100
  totalAmount!: number;

  buyers: Buyer[] = [];
  products: Product[] = [];
  billHeader: BillHeader = {
    number: 22,
    date: this.today.toISOString(),
    buyerId: 0,
    id: 0,
    totalDiscount: 0,
    totalAmount: 0,
    billBodies: []
  }
  billBody: BillBody = {
    price: 0,
    quantity: 0,
    discount: 0,
    discountAmount: 0,
    totalPrice: 0,
    productId: 0,
  };

  //////////////INFORMACIJE ZA BODY//////////////
  //productsInBasket varijabla sadrzi info o dodanim productima u kasu, cijena svakog, kolicina, ukupna cijena svakog, proizvod id svakog
  //te naknadno zaglavlje id kojeg cemo dobiti odmah nakon spremanja headera u bazu
  productsInBasket: ProductToBasket[] = [];
  discount!: number; //poseban za svaki product - discount/100
  discountAmount!: number;
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

    this.activatedRoute.paramMap.subscribe(param => {
      console.log("param je: " + param.get('id'))
      var id = param.get('id');

      if (param.get('id') === null) {
        console.log('POS Mode');
        this.billViewMode = false;
        this.getAllBuyers();
        this.getAllProducts();
      }
      else {
        console.log('billViewMode');
        this.billViewMode = true;
        console.log("parsan id value je " + parseInt(id!))
        this.getBillHeader(parseInt(id!));
        //console.log("billviewbody je " + this.billViewModeBody)
      }
    })

    if (this.billViewMode === true) {
      this.displayedColumns = ['code', 'name', 'measure', 'quantity', 'price', 'discount', 'discountAmount', 'totalPrice'];
    }

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
    this.buyersService.getAllBuyers().subscribe((data: Buyer[]) => {
      this.buyers = data;
      //console.log(this.buyers);
    })
  }

  selectedBuyer(buyer: Buyer) {
    this.city = buyer.city;
    this.address = buyer.adress;
    this.billHeader.buyerId = buyer.id;
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
      console.log(this.products);
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

  dateChange(event: any){
    this.today = event.target.value
    console.log(this.today)
    console.log( event.target.value)
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
    }
    if(this.quantity > product.count){
      this.toast.error("Sorry we only have " + product.count + " " + product.name + " in supply")
      return;
    }
    if(this.quantity === product.count){
      this.toast.warning("This is the maximal amount of " + product.name)
      this.productsInBasket.push(product);
      this.productsInBasket = [...newBasket];

    }
    if(this.quantity < product.count){
      this.toast.success(product.name + " added successfully")
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
    this.quantity = 0;
    this.discount = 0;
  }

  increaseAmount(product: ProductToBasket) {
    const newBasket = this.productsInBasket;
    if(product.quantity >= product.count){
      this.toast.error("Sorry we only have " + product.count + " " + product.name + " in supply")
      return;
    }
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
    if (product.discount !== 0) {
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
    this.toast.success("Product removed")
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
      this.totalAmount = this.getWithoutTotalDiscount() - (this.getWithoutTotalDiscount() * (this.totalDiscount / 100));
      return this.totalAmount;
    }
    this.totalAmount = this.getWithoutTotalDiscount();
    return this.totalAmount;
  }

  subtractProductCount(productForSale: ProductToBasket) {
    const productToUpdate = this.products.find(product => product.name === productForSale.name)
    if(productToUpdate){
      const finalProduct: Product = {...productToUpdate}
      const updatedCount = productToUpdate?.count - productForSale.quantity
      finalProduct.count = updatedCount
     
      this.productsService.updateProduct(finalProduct).subscribe();
    }
    else{
      console.log("Subtract does not work")
    }

  }

 
  onCheckout() {
    this.billHeader.totalDiscount = this.totalDiscount;
    this.billHeader.totalAmount = this.totalAmount;
    this.billHeader.date = this.today.toISOString();
    let emptyBasket = this.productsInBasket;

    const newBasket = [...this.billHeader.billBodies];
    for (const product of this.productsInBasket) {
      var billBody: BillBody = {
        price: product.price,
        quantity: product.quantity,
        discount: product.discount,
        discountAmount: product.discountAmount,
        totalPrice: product.totalPrice,
        productId: product.id
      }

      newBasket.push(billBody);
      //this.subtractProductCount(product);

      console.log("Racun dodan u prethodne transakcije i proizvod updatean!");
      console.log("billbody: " + JSON.stringify(billBody));
    }
    this.billHeader.billBodies = newBasket;
    //salji billHeader
    this.billsService.addNewHeader(this.billHeader).subscribe();
    emptyBasket = []
    this.productsInBasket = [...emptyBasket];
    this.toast.success("Purchase was succesfull")

    console.log("billheader: " + JSON.stringify(this.billHeader));
    this.router.navigate(['/pages/home'])
  }

  getBillHeader(id: number) {
    this.billsService.getBillHeaderByID(id).subscribe((dataOfBillHeader: BillHeader) => {
      console.log("data of one header is: " + JSON.stringify(dataOfBillHeader));

      const newBasket = [...this.productsInBasket];

      for (let bill of dataOfBillHeader.billBodies) {
        var productToShowOnView: ProductToBasket = {
          id: dataOfBillHeader.id,
          cipher: bill.product!.cipher,
          name: bill.product!.name,
          measure: bill.product!.measure,
          price: bill.product!.price,
          count: bill.product!.count,
          quantity: bill.quantity,
          discount: bill.discount,
          discountAmount: bill.discountAmount,
          totalPrice: bill.totalPrice
        }
        newBasket.push(productToShowOnView);
        //console.log("to show on view is " + JSON.stringify(productToShowOnView));
      }
      
      this.productsInBasket = newBasket;
      this.cd.detectChanges();
      //console.log("products in basket su " + JSON.stringify(this.productsInBasket));

      //header info
      this.billHeader.date = dataOfBillHeader.date;
      this.billHeader.id = dataOfBillHeader.id;
      this.totalDiscount = dataOfBillHeader.totalDiscount;
      this.totalAmount = dataOfBillHeader.totalAmount;

      //buyer info
      this.buyer.adress = dataOfBillHeader.buyer!.adress;
      this.buyer.city = dataOfBillHeader.buyer!.city;
      this.buyer.name = dataOfBillHeader.buyer!.name;
    });
  }
}
