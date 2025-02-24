import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'app/common/services/common.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  form:FormGroup;
  formSubmitted:boolean=false;
  passwordMismatch:any;
  constructor( private formBuilder:FormBuilder,private service:CommonService,private router:Router){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      emailPhone:[null,Validators.required],
      password:[null,Validators.required],
      cPassword:[null,Validators.required],
    })
  }
  get lf() {
    return this.form.controls;
  }
  onSubmit(){
    this.formSubmitted=true;
    if(this.form.invalid){
      return;
    }
    const formData={
      email:this.form.get("emailPhone").value,
      password:this.form.get("cPassword").value
    }
    this.service.forgotPassword(formData).subscribe(
      (result)=>{
        console.log("password is sucessfully updated.");
        this.router.navigate(['/login']);
      },(error)=>{
        console.log(error);
      }
    )
  }
  onChangePassword($event){
    if(this.form.get("password").value != this.form.get("cPassword").value){
      this.passwordMismatch=true;
      }else{
      this.passwordMismatch=false;
    }
  }
 
}
