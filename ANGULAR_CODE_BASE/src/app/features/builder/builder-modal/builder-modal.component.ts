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
  previewUrl: string | ArrayBuffer | null = null;
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
      password: ["", [
        Validators.required, 
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]],
      pincode: ['',Validators.required],
      location:['',Validators.required],
      phoneNo: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
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
          photoPath:builder.photoPath
        });
        this.previewUrl = builder.photoPath
      }
    });
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
  
    const formData = new FormData();
    formData.append('id', this.id ? String(this.id) : '0');
  formData.append('fname', this.form.get("fname")?.value);
  formData.append('lname', this.form.get("lname")?.value);
  formData.append('email', this.form.get("email")?.value);
  formData.append('phoneNo', this.form.get("phoneNo")?.value);
  formData.append('password', this.form.get("password")?.value);
  formData.append('location', this.form.get("location")?.value);
  formData.append('pincode', this.form.get("pincode")?.value);

  if (this.selectedFile) {
    formData.append("photo", this.selectedFile, this.selectedFile.name);
  }

    if (this.id) {
      // Update builder
      this.commonService.addEditBuilder(formData).subscribe(
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
      this.commonService.addEditBuilder(formData).subscribe(
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