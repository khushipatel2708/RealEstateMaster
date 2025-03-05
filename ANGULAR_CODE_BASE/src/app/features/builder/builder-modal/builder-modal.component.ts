import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Builder } from '../builder';
import { CommonService } from 'app/common/services/common.service';
// import { Builder } from '../builder';

@Component({
  selector: 'app-builder-modal',
  templateUrl: './builder-modal.component.html',
  styleUrls: ['./builder-modal.component.scss']
})
export class BuilderModalComponent implements OnInit {
  @Input() id: number;
  @Output() onBuilder_Emit: EventEmitter<boolean> = new EventEmitter();

  showPassword = false;
  submitted = false;
  form: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,


  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fname: ['',Validators.required],
      lname: ['',Validators.required],
      email: ['',Validators.required],
      password: [null,Validators.required],
      pincode: ['',Validators.required],
      location:['',Validators.required],
      phoneNo:['',Validators.required]
    });
    if (this.id) {
      this.getBuilderById();
    }
  }

  getBuilderById(): void {
    this.commonService.getBuilderById(this.id).subscribe((builder: Builder) => {
      if (builder) {
        this.form.patchValue({
          fname: builder.fname,
          lname: builder.lname,
          email: builder.email,
          pincode: builder.pincode,
          location: builder.location,
          password: builder.password,
          phoneNo: builder.phoneNo,
        });
      }
    });
  }

  onClick_TogglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  get f() {
    return this.form.controls;
  }

  submit_form() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  
    const builderData = {
      id: this.id || 0,
      fname: this.form.get("fname").value,
      lname: this.form.get("lname").value,
      email: this.form.get("email").value,
      password: this.form.get("password").value,
      location: this.form.get("location").value,
      pincode: this.form.get("pincode").value,
      phoneNo: this.form.get("phoneNo").value,
    };
    if (this.id) {
      // Update builder
      this.commonService.addEditBuilder(builderData).subscribe(
        response => {
          console.log('Success Response:', response);
          this.spinner.hide();
          this.onBuilder_Emit.emit(true);
          this.activeModal.close();
        },
        error => {
          this.spinner.hide();
        }
      );
    } else {
      // Create new builder
      this.commonService.addEditBuilder(builderData).subscribe(
        response => {
          console.log('Success Response:', response);
          this.spinner.hide();
          this.onBuilder_Emit.emit(true);
          this.activeModal.close();
        },
        error => {
          this.spinner.hide();
        }
      );
    }
  }
}