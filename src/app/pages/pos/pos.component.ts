import { Component, OnInit } from '@angular/core';
import { BuyersService } from 'src/app/services/buyers.service';
import { Buyer } from 'src/app/models/buyer.model';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})

export class PosComponent implements OnInit {
  constructor(private buyersService: BuyersService) { }

  buyers: Buyer[] = [];

  city!: string;
  address!: string;
  today = new Date();

  productsInBasket: [] = [];

  ngOnInit(): void {
    this.getAllBuyers();
  }

  getAllBuyers(){
    this.buyersService.getAllBuyers().subscribe((data: any) => {
      this.buyers = data;
      console.log(this.buyers);
    })
  }

  selectedBuyer(buyer: Buyer){
    this.city = buyer.city;
    this.address = buyer.adress;
  }
}
