import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment1',
  templateUrl: './payment1.component.html',
  styleUrls: ['./payment1.component.scss']
})
export class Payment1Component implements OnInit{
  submittiedForm:boolean=false;
  paymentForm:FormGroup;
  paymentDetails:any;
  currentUserEmail:any;
  constructor(private commonService:CommonService,public route:ActivatedRoute,private formBuilder:FormBuilder,private toastr:ToastrService){}

  ngOnInit() { 
    this.paymentForm=this.formBuilder.group({
  firstname:[''],
  planname:[''],
  amount:[0],
  email:[''],
  mobile:['',Validators.compose([Validators.required,Validators.maxLength(10),Validators.minLength(10)])]
    });
    this.route.queryParams.subscribe(params => {
      this.paymentDetails = {
        first_name: params['title'] || '',
        plan_name: params['propertyName'] || '',
        amount: params['amount'] || '',
        email: '',
        mobile: ''
      };
    });
    this.commonService.getCurrentUserDetails().subscribe(
      (user) => {                       
        this.currentUserEmail = user.email; 
        console.log(this.currentUserEmail,"currentUser");
      });
  }
get f(){
  return this.paymentForm.controls;
}
  buyProduct() {
    this.submittiedForm=true;
    if(this.paymentForm.invalid){
      this.toastr.warning("Enter all required fields.");
      return;
    }
    const amount = Number(this.route.snapshot.queryParamMap.get('amount'));
    const firstName = this.route.snapshot.queryParamMap.get('title').trim();
    const planName = decodeURIComponent(this.route.snapshot.queryParamMap.get('propertyName') || '').trim();
    const currentUserEmail=this.currentUserEmail;
    this.commonService.payUBuy(amount,firstName,planName,currentUserEmail)
      .subscribe(arg => {
        console.log(arg,"arg");
        const product = arg.info;
       
        const paymentDetails = {
          payu_url: product.payu_url,
          first_name: firstName, 
          email: product.email,
          mobile: product.mobile, 
          callback_url: product.call_back_url, 
          payu_cancel_url: product.payu_cancel_url, 
          payu_fail_url: product.payu_fail_url, 
          payu_merchant_key: product.payu_merchant_key, 
          payu_sha_token: product.payu_sha_token, 
          txnid: product.txnId, 
          plan_name: planName, 
          amount: amount, 
          udf1: firstName, 
          service_provider: product.service_provide || ''
      };
      console.log(paymentDetails,"");
      let paymentString = `
          <html>
            <body>
              <form action="${paymentDetails.payu_url}" method="post" id="payu_form">
                <input type="hidden" name="firstname" value="${paymentDetails.first_name}"/>
                <input type="hidden" name="email" value="${paymentDetails.email}"/>
                <input type="hidden" name="phone" value="${paymentDetails.mobile}"/>
                <input type="hidden" name="surl" value="${paymentDetails.callback_url}"/>
                <input type="hidden" name="curl" value="${paymentDetails.payu_cancel_url}"/>
                <input type="hidden" name="furl" value="${paymentDetails.payu_fail_url}"/>
                <input type="hidden" name="key" value="${paymentDetails.payu_merchant_key}"/>
                <input type="hidden" name="hash" value="${paymentDetails.payu_sha_token}"/>
                <input type="hidden" name="txnid" value="${paymentDetails.txnid}"/>
                <input type="hidden" name="productinfo" value="${paymentDetails.plan_name}"/>
                <input type="hidden" name="amount" value="${paymentDetails.amount}"/>
                 <input type="hidden" name="udf1" value="${paymentDetails.udf1}"/> 
                <input type="hidden" name="service_provider" value="${paymentDetails.service_provider}"/>
                <button type="submit" value="submit" #submitBtn></button>
              </form>
              <script type="text/javascript">document.getElementById("payu_form").submit();</script>
            </body>
          </html>`;
      
      const winUrl = URL.createObjectURL(
          new Blob([paymentString], { type: "text/html" })
      );
      
      window.location.href = winUrl;

      });
    

  

  }

  
    
}
