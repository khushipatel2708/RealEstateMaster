import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { environment } from '../../environments/environment';
import { RegistrationValidators } from '../validators/registration.validators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
registrationForm:FormGroup;
  registrationSubmitted:boolean=false;
  stateId:any;
  passwordMismatch:any;
  constructor(
    private commonService: CommonService,
    private registrationValidators: RegistrationValidators,
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }
 
  get lf() {
    return this.registrationForm.controls;
  }

  
  mainErrorMessage = {
    type: '',
    message: ''
  }

  stateList;
  cityList = [];

  ngOnInit() {
    this.registrationForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required], this.registrationValidators.checkEmailAvailability.bind(this.registrationValidators)),
      phoneNo: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      cPassword: new FormControl('', [Validators.required]),
      stateId: new FormControl('',Validators.required),
      cityId: new FormControl('',Validators.required),
      pincode: new FormControl('', [Validators.required]),
    }
    );
    this.commonService.togglePageLoaderFn(false);
    this.commonService.getStatelist()
      .subscribe(response => {
        if (response.length > 0) {
          this.stateList = response;
          }
      });
  }

  getCityList(stateId) {
    this.cityList = [];

    if (stateId != 0) {
      this.commonService.getCitylistByState(stateId)
        .subscribe(response => {
         if (response.length > 0) {
            this.cityList = response;
          }
        });
    }
    else {
      this.cityList = [];
    }
  }
  onChangeState(event: any) {
    const stateId = event.target.value; 
    // const stateId=this.registrationForm.get('stateId').value;
    console.log(stateId, "Selected State ID");
  
    if (stateId) {
      console.log(stateId);
      this.getCityList(Number(stateId)); 
    } else {
      this.cityList = []; 
    }
  }
  
  registration(data) {
  console.log("tesrt");
    // this.router.navigate(['/'],{
    //   queryParams: { action: 'signUpsuccess' }
    // });
    this.registrationSubmitted=true;
    if(this.registrationForm.invalid){
      this.toastr.warning('Enter Valid Data');
      return;
    }
    this.spinner.show();
    const formData = { ...data.value,id:0, phoneNo: String(data.value.phoneNo),cityId:Number(data.value.cityId),stateId:Number(data.value.stateId),pincode:Number(data.value.pincode),role:'user'};

    this.http.post(environment.BASE_URL + '/auth/user/register', formData)
      .subscribe(response => {
        this.spinner.hide();
        console.log('--- reg form -- ', response);
        if (response && response['message']) {
          this.toastr.success('Registration successful!');
          this.router.navigate(['/login'], {
            queryParams: { action: 'signUpsuccess' }
          });
        }
      },
        (error: Response) => {
          this.spinner.hide();
          this.mainErrorMessage.type = 'danger';

          if (error.status === 400) {
            this.spinner.hide();
            this.mainErrorMessage.message = 'Your request is invalid';
            this.toastr.error('Your request is invalid. Please check your details.');
          }
          else if (error.status) {
            this.spinner.hide();
            this.mainErrorMessage.message = 'Something went wrong';
            this.toastr.error('Something went wrong. Please try again later.');
          }
        });
  }

  onChangePassword($event){
    if(this.registrationForm.get("password")?.value != this.registrationForm.get("cPassword")?.value){
      this.toastr.warning('Passwords do not match.');
      this.passwordMismatch=true;
      }else{
      this.passwordMismatch=false;
    }
  }

}
