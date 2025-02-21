import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../user';
import { CommonService } from 'app/common/services/common.service';

@Component({
  selector: 'app-users-model',
  templateUrl: './users-model.component.html',
  styleUrls: ['./users-model.component.scss']
})
export class UsersModelComponent implements OnInit {
  @Input() userId: any;
  @Output() onUser_Emit: EventEmitter<boolean> = new EventEmitter();
  submitted = false;
  roleList: any[] = [];

  showPassword = false;

  form: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private spinner: NgxSpinnerService, 
  ) {

  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      role:  ["", Validators.compose([Validators.required])],
      fname:  ["", Validators.compose([Validators.required])],
      lname:  ["", Validators.compose([Validators.required])],
      userName:  ["", Validators.compose([Validators.required])],
      email: ["", [Validators.required, Validators.email]],
      phoneNo: ["", Validators.required],
      password:  ["", Validators.compose([Validators.required])],
      status:  [null, Validators.compose([Validators.required])],
    });
    if(this.userId){
      this.getUserById();
    }
    this.getRoleList()
  }

  getUserById(): void {
    this.commonService.getUserById(this.userId).subscribe((user: User) => {
      if (user) {
        this.form.patchValue({
        role: user.role,
        fname: user.fname,
        lname: user.lname,
        userName: user.userName,
        email: user.email,
        phoneNo: user.phoneNo,
        password: user.password,
        status: user.status
        });
      }
    });
  }

  
  getRoleList() {
    this.spinner.show();
    this.commonService.getRoleDDlList().subscribe(
      (result) => {
        this.spinner.hide();
        this.roleList = result;
      },
      (error) => {
        this.spinner.hide();
        this.roleList = [];
        alert("Fail to get role list");
      }
    );
  }

    onClick_TogglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  get f() {
    return this.form.controls;
  }

  onSubmit_Form() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formData = {
          id:this.userId || null,
          role:this.form.get("role").value,
          fname:this.form.get("fname").value,
          lname:this.form.get("lname").value,
          userName:this.form.get("userName").value,
          email:this.form.get("email").value,
          phoneNo:this.form.get("phoneNo").value,
          password:this.form.get("password").value,
          status:this.form.get("status").value,
        };

    if (this.userId!="") {
      // Update user
      this.commonService.addEditUser(formData).subscribe((result) => {
        this.onUser_Emit.emit(true);
        this.activeModal.close();
      });
    } else {
      // Create new user
      this.commonService.addEditUser(formData).subscribe((result) => {
        this.onUser_Emit.emit(true);
        this.activeModal.close();
      });
    }
  }

}