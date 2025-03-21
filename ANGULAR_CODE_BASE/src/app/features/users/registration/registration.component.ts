import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../../../common/services/common.service';
import { RegistrationValidators } from '../../../common/validators/registration.validators';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm:FormGroup;
  registrationSubmitted:boolean=false;
  stateId:any;
  passwordMismatch:any;
  constructor(
    private commonService: CommonService,
    private registrationValidators: RegistrationValidators,
    private http: HttpClient,
    private router: Router,
    private toast:ToastrService
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
      phoneNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      password: new FormControl('', [
        Validators.required, 
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8}$')
      ]
),
      cPassword: new FormControl('', [Validators.required]),
      state: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      pincode: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
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
  
    // this.router.navigate(['/'],{
    //   queryParams: { action: 'signUpsuccess' }
    // });
    this.registrationSubmitted=true;
    if(this.registrationForm.invalid){
      return;
    }
    console.log(data.value);
    const formData = { ...data.value,id:0, phoneNo: String(data.value.phoneNo) };

    this.http.post(environment.BASE_URL + '/auth/user/register', formData)
      .subscribe(response => {
        console.log('--- reg form -- ', response);
        if (response && response['message']) {
          this.router.navigate(['/'], {
            queryParams: { action: 'signUpsuccess' }
          });
        }
        this.toast.success("Registre Data Successfully")
      },
        (error: Response) => {
          this.mainErrorMessage.type = 'danger';
          if (error.status === 400) {
            this.mainErrorMessage.message = 'Your request is invalid';
          }
          else if (error.status) {
            this.mainErrorMessage.message = 'Something went wrong';
          }
        });
  }

  onChangePassword($event){
    if(this.registrationForm.get("password").value != this.registrationForm.get("cPassword").value){
      this.passwordMismatch=true;
      }else{
      this.passwordMismatch=false;
    }
  }
 
}
