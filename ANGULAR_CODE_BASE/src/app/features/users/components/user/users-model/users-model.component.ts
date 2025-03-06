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
  @Input() id: any;
  @Output() onUser_Emit: EventEmitter<boolean> = new EventEmitter();
  submitted = false;
  roleList: any[] = [];
  previewUrl: string | ArrayBuffer | null = null;
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
      fname: ["", Validators.compose([Validators.required])],
      lname: ["", Validators.compose([Validators.required])],
      userName: ["", Validators.compose([Validators.required])],
      email: ["", [Validators.required, Validators.email]],
      phoneNo: ["", Validators.required],
      password: ["", Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
    });
    if (this.id && this.id > 0) {
      this.getUserById();
    }
    this.getRoleList()
  }

  getUserById(): void {
    console.log('Calling getMenuByMenuId service with menuId:', this.id);
    this.commonService.getUserById(this.id).subscribe(
      (result) => {
        console.log('Service response:', result);
        if (result) {
          this.form.patchValue({
            role:result.role,
            fname: result.fname,
            lname: result.lname,
            userName: result.userName,
            email: result.email,
            phoneNo: result.phoneNo,
            password: result.password,
            status: result.status,
            photoPath:result.photoPath
          });
          this.previewUrl = result.photoPath
        }
      },
      (error) => {
        console.error('Service error:', error);
      }
    );
  }
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];
  
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  getRoleList() {
    this.spinner.show();
    this.commonService.getRoleDDlList().subscribe(
      (result) => {
        this.spinner.hide();
        this.roleList = result.data;
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
    
    const formData = new FormData();
    formData.append('id', this.id ? String(this.id) : '0');
  formData.append('fname', this.form.get("fname")?.value);
  formData.append('lname', this.form.get("lname")?.value);
  formData.append('email', this.form.get("email")?.value);
  formData.append('phoneNo', this.form.get("phoneNo")?.value);
  formData.append('password', this.form.get("password")?.value);
  formData.append('status', this.form.get("status")?.value);
  formData.append('userName', this.form.get("userName")?.value);
  formData.append('role',this.form.get('role').value);
  if (this.selectedFile) {
    formData.append("photo", this.selectedFile, this.selectedFile.name);
  }

    console.log("data=", formData)
    // if (this.id) {
    if (this.id > 0) {
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