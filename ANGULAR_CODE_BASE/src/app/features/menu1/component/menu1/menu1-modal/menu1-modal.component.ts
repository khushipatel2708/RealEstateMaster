import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'app/common/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu1-modal',
  templateUrl: './menu1-modal.component.html',
  styleUrls: ['./menu1-modal.component.scss']
})
export class Menu1ModalComponent implements OnInit {
  @Input() id: number;
  // @Output() onMenu_Emit = new EventEmitter<any>();
  @Output() menuSaved = new EventEmitter<void>();

  form: FormGroup;
  submitted = false;

  constructor(
    private commonService: CommonService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    console.log('menuId:', this.id);
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      path: ['', Validators.required],
      icon: ['']
    });

    if (this.id && this.id > 0) {
      this.getMenuById();
    }
  }

  get f() {
    return this.form.controls;
  }


  getMenuById() {
    console.log('Calling getMenuByMenuId service with menuId:', this.id);
    this.spinner.show('model')
    this.commonService.getMenuById(this.id).subscribe(
      (result) => {
        this.spinner.hide('model')
        console.log('Service response:', result);
        if (result) {
          this.form.patchValue({
            name: result.name,
            title: result.title,
            path: result.path,
            icon: result.icon,
          });
        }
      },
      (error) => {
        this.spinner.hide('model')
        console.error('Service error:', error);
      }
    );
  }

  // onSubmit_Menu() {
  //   this.submitted = true;
  //   if (this.form.invalid) {
  //     return;
  //   }

  //   this.spinner.show();
  //   const formData = {
  //     id: this.id || 0,
  //     name: this.form.get('name').value,
  //     title: this.form.get('title').value,
  //     path: this.form.get('path').value,
  //     icon: this.form.get('icon').value
  //   };
  //   console.log("formData", formData)
  //   if (this.id > 0) {
  //     // Update menu
  //     this.commonService.addEditMenu(formData).subscribe(result => {
  //       if (result) {
  //         alert('Updated successfully');
  //         this.resetForm();
  //         this.menuSaved.emit();
  //         this.activeModal.close();
  //       }
  //     });
  //   } else {
  //     // Add new menu
  //     this.commonService.addEditMenu(formData).subscribe(result => {
  //       if (result) {
  //         alert('Inserted successfully');
  //         this.resetForm();
  //         this.menuSaved.emit();
  //         this.activeModal.close();
  //         console.log("res", result)
  //       }
  //     });
  //   }
  // }

  onSubmit_Menu() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  
    this.spinner.show('model'); // Show spinner when submitting
  
    const formData = {
      id: this.id || 0,
      name: this.form.get('name').value,
      title: this.form.get('title').value,
      path: this.form.get('path').value,
      icon: this.form.get('icon').value
    };
  
    if (this.id > 0) {
      // Update menu
      this.commonService.addEditMenu(formData).subscribe(
        (result) => {
          if (result) {
            this.toastr.success('Menu updated successfully', 'Success');
            this.resetForm();
            this.menuSaved.emit();
            this.activeModal.close();
          }
          this.spinner.hide('model'); // Hide spinner after API call
        },
        (error) => {
          console.error('Update Error:', error);
          this.toastr.error('Failed to update menu', 'Error');
          this.spinner.hide('model'); // Hide spinner if error occurs
        }
      );
    } else {
      // Add new menu
      this.commonService.addEditMenu(formData).subscribe(
        (result) => {
          if (result) {
            this.toastr.success('Menu added successfully', 'Success');
            this.resetForm();
            this.menuSaved.emit();
            this.activeModal.close();
            console.log("res", result);
          }
          this.spinner.hide('model'); // Hide spinner after API call
        },
        (error) => {
          console.error('Insert Error:', error);
          this.toastr.error('Failed to add menu', 'Error');
          this.spinner.hide('model'); // Hide spinner if error occurs
        }
      );
    }
  }
  

  resetForm() {
    this.submitted = false;
    this.form.reset();
  }
}

