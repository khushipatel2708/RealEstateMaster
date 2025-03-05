import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'app/common/services/common.service';
import { Role } from 'app/features/role/model/role';
// import { Role } from 'app/administration/models/user';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  @Input() id: number;
  @Output() onRole_Emit: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    console.log('id:', this.id);
    this.form = this.formBuilder.group({
      name: ["", Validators.compose([Validators.required])],
    });
    if (this.id) { 
      this.id = this.id; 
      this.getRoleById();
    } else {
      this.id = null; 
    }
  }
  
  get f() {
    return this.form.controls;
  }
  // getRoleById(): void {
  //   this.commonService.getRoleById(this.id).subscribe((role: Role) => {
  //     if (role) {
  //       this.form.patchValue({
  //         name: role.name
  //       });
  //     }
  //   });
  // }
  getRoleById() {
    console.log('Calling getMenuByMenuId service with menuId:', this.id);
    this.commonService.getRoleById(this.id).subscribe(
      (result) => {
        console.log('Service response:', result);
        if (result) {
          this.form.patchValue({
           name: result.name
          });
        }
      },
      (error) => {
        console.error('Service error:', error);
      }
    );
  }
  

onSubmit_Form() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const roleData = {
      id:this.id || 0,
      name:this.form.get("name").value,
    };

    if (this.id) {
      // Update role
      this.commonService.addEditRole(roleData).subscribe((result) => {
        this.onRole_Emit.emit(true);
        this.activeModal.close();
      });
    } else {
      // Create new role
      this.commonService.addEditRole(roleData).subscribe((result) => {
        this.onRole_Emit.emit(true);
        this.activeModal.close();
      });
    }
  }  
}