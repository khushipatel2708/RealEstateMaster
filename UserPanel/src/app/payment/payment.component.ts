import { Component } from '@angular/core';
import { FormGroup ,FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/services/common.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  paymentForm: FormGroup;
id:any;
propertyTitle:any;
  constructor(private commonService: CommonService,private formBuilder:FormBuilder,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.paymentForm=this.formBuilder.group({
      firstname:[],
      email:[],
      phone:[],
      amount:[],
      productinfo:[],
    });
   this.id = this.route.snapshot.paramMap.get('id');
   this.route.queryParams.subscribe(params => {
    this.propertyTitle = params['title']; // Query parameter
  });
  }

  payWithPayU() {
    console.log(this.paymentForm.get('amount').value,"amount");

    const paymentData = {
      key: '1YRwjC',
      txnid: 'Txn' + Math.floor(Math.random() * 1000000),
      amount: parseFloat(this.paymentForm.get('amount').value).toFixed(2), // Fix amount format
      productinfo: this.propertyTitle,
      firstname: this.paymentForm.get('firstname').value,
      email: this.paymentForm.get('email').value,
      phone: this.paymentForm.get('phone').value,
      surl: 'https://8a43-116-72-153-32.ngrok-free.app/api/payment/success',
      furl: 'https://8a43-116-72-153-32.ngrok-free.app/api/payment/success',
      udf1: '',
      udf2: '',
      udf3: '',
      udf4: '',
      udf5: '',
      udf6: 'ExtraData6',
      udf7: 'ExtraData7',
      udf8: 'ExtraData8',
      udf9: 'ExtraData9',
      udf10: 'ExtraData10'  
    };
    
console.log(paymentData,"paymentData");
    this.commonService.generateHash(paymentData)
      .subscribe((response: any) => {
        const payuForm = {
          key: paymentData.key,
          txnid: paymentData.txnid,
          amount: paymentData.amount,
          productinfo: paymentData.productinfo,
          firstname: paymentData.firstname,
          email: paymentData.email,
          phone: paymentData.phone,
          surl: paymentData.surl,
          furl: paymentData.furl,
          hash: response.hash,
          service_provider: 'payu_paisa',
          udf1: paymentData.udf1,
          udf2: paymentData.udf2,
          udf3: paymentData.udf3,
          udf4: paymentData.udf4,
          udf5: paymentData.udf5,
          udf6: paymentData.udf6,
          udf7: paymentData.udf7,
          udf8: paymentData.udf8,
          udf9: paymentData.udf9,
          udf10: paymentData.udf10,
        };

        this.submitPayUForm(payuForm);
      }, error => {
        console.error('Error generating hash:', error);
      });
  }

  submitPayUForm(payuForm: any) {
    if (!payuForm || typeof payuForm !== 'object') {
      console.error('Invalid PayU form data');
      return;
    }

    this.commonService.initiatePayment(payuForm).subscribe((response: any) => {
      this.createAndSubmitForm(response.paymentUrl, response.postData);
    }, error => {
      console.error('Error initiating payment:', error);
    });
  }

  createAndSubmitForm(actionUrl: string, formFields: any) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = actionUrl;

    Object.keys(formFields).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = formFields[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }
}
