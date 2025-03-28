import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.scss']
})
export class PaymentsuccessComponent {
  transactionNumber: string = '';
  amount: string = '';
  paymentMethod: string = '';
  propertyId:number;
  firstName:string='';
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.transactionNumber = this.route.snapshot.queryParamMap.get('txnId') || 'N/A';
    this.amount = this.route.snapshot.queryParamMap.get('amount') || '0.00';
    this.paymentMethod = this.route.snapshot.queryParamMap.get('method') || 'Unknown';
    this.propertyId=Number(this.route.snapshot.queryParamMap.get('propertyId'));
    this.firstName=this.route.snapshot.queryParamMap.get('title') || 'Unknown';
  }

}
