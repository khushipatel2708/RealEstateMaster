import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { CommonService } from 'app/services/common.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit{
  id:any;
  propertyId: string = '';
  propertyTitle:any;
  constructor(private authService:AuthService,public commonService:CommonService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.propertyTitle = params['title']; // Query parameter
    });
  }
  // payWithPayU() {
  //   const paymentData = {
  //     key:'1YRwjC',
  //     txnid: 'Txn' + Math.floor(Math.random() * 1000000), 
  //     amount: 500.00, 
  //     productinfo: 'Real Estate Payment',
  //     firstname: 'John Doe',
  //     email: 'john@example.com',
  //     phone: '9999999999',
  //     surl: 'https://ad2f-116-72-55-79.ngrok-free.app/success', 
  //     furl: 'https://ad2f-116-72-55-79.ngrok-free.app/failure',
  //     udf1: 'ExtraData1',
  //     udf2: 'ExtraData2',
  //     udf3: 'ExtraData3',
  //     udf4: 'ExtraData4',
  //     udf5: 'ExtraData5',
  //     udf6: 'ExtraData6',
  //     udf7: 'ExtraData7',
  //     udf8: 'ExtraData8',
  //     udf9: 'ExtraData9',
  //     udf10: 'ExtraData10'  
  //   };
  
  //   this.commonService.generateHash(paymentData)
  //     .subscribe((response: any) => {
  //       const payuForm = {
  //         key: paymentData.key,
  //         txnid: paymentData.txnid,
  //         amount: paymentData.amount,
  //         productinfo: paymentData.productinfo,
  //         firstname: paymentData.firstname,
  //         email: paymentData.email,
  //         phone: paymentData.phone,
  //         surl: paymentData.surl,
  //         furl: paymentData.furl,
  //         hash: response.hash, 
  //         service_provider: 'payu_paisa',
  //         udf1:paymentData.udf1,
  //         udf2:paymentData.udf2,
  //         udf3:paymentData.udf3,
  //         udf4:paymentData.udf4,
  //         udf5:paymentData.udf5,
  //         udf6:paymentData.udf6,
  //         udf7:paymentData.udf7,
  //         udf8:paymentData.udf8,
  //         udf9:paymentData.udf9,
  //         udf10:paymentData.udf10,
  //       };
  
  //       this.submitPayUForm(payuForm);
  //     }, error => {
  //       console.error('Error generating hash:', error);
  //     });
  // }
  
  // submitPayUForm(payuForm: any) {
  //   if (!payuForm || typeof payuForm !== 'object') {
  //     console.error('Invalid PayU form data');
  //     return;
  //   }
  
  //   this.commonService.initiatePayment(payuForm).subscribe((response: any) => {
  //     // if (response && response.paymentUrl) {
  //     //   window.location.href = response.paymentUrl; // Redirect user to PayU payment page
  //     // } else {
  //     //   console.error('Invalid response from backend:', response);
  //     // }
  //     this.createAndSubmitForm(response.paymentUrl,response.postData);
  //   }, error => {
  //     console.error('Error initiating payment:', error);
  //   });
  // }
  
  // createAndSubmitForm(actionUrl: string, formFields: any) {
  //   console.log(formFields,"formFields");
  //   const form = document.createElement('form');
  //   form.method = 'POST';
  //   form.action = actionUrl;

  //   Object.keys(formFields).forEach(key => {
  //     const input = document.createElement('input');
  //     input.type = 'hidden';
  //     input.name = key;
  //     input.value = formFields[key];
  //     form.appendChild(input);
  //   });

  //   document.body.appendChild(form);
  //   form.submit();
  // }
}


