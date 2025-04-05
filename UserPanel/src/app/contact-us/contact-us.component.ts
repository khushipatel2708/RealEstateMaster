import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit{
  submittedForm:boolean=false;
  form:FormGroup;
  constructor(public formBuilder:FormBuilder,public userService:UserService,private toastr: ToastrService,private spinner: NgxSpinnerService){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      subject:[null,Validators.required],
      message:[null],
    });
  }
  get f(){
    return this.form.controls;
  }
  onSubmit(){
    this.submittedForm=true;
    if(this.form.invalid){
      this.toastr.warning("please enter all required fields.");
      return;
    }
this.spinner.show();

    const formData={
      name:this.form.get("name").value,
      email:this.form.get("email").value,
      subject:this.form.get("subject").value,
      message:this.form.get("message").value
    }
    this.spinner.show();
    this.userService.contactUs(formData).subscribe(
      (result) =>{
        this.spinner.hide();
        this.toastr.success('Your request has been successfully sent.');
        // alert("your request has been successfully sent.");
      },
      (error)=>{
        this.spinner.hide();
        this.toastr.error('Your request failed to send. Please try again later.')
        // alert("your request failed to sent.");
      }
    )
  }

}
