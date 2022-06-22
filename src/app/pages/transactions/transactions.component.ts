import { Component, OnInit } from '@angular/core';
import { BillsService } from 'src/app/services/bills.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  constructor(private billsService: BillsService) { }

  ngOnInit(): void {
    this.billsService.getAllBillBodies().subscribe(
      response => {
        console.log(response);
      }
    );
    
    this.billsService.getBillBodyByID(5).subscribe(
      response => {
        console.log(response);
      }
    );


  }
}
