import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit{
  form:FormGroup;
  constructor(public formBuilder:FormBuilder,public userService:UserService){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:[null,Validators.required],
      email:[null,Validators.required],
      subject:[null,Validators.required],
      message:[null],
    });
  }
  
  onSubmit(){
    const formData={
      name:this.form.get("name").value,
      email:this.form.get("email").value,
      subject:this.form.get("subject").value,
      message:this.form.get("message").value
    }
    this.userService.contactUs(formData).subscribe(
      (result) =>{
        alert("your request has been successfully sent.");
      },
      (error)=>{
        alert("your request failed to sent.");
      }
    )
  }

}
