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
  roleId: number;
  @Input() id: number;
  @Output() onRole_Emit: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.compose([Validators.required])],
    });
  
    if (this.id) { 
      this.roleId = this.id; 
      this.getRoleById();
    } else {
      this.roleId = null; 
    }
  }
  
  get f() {
    return this.form.controls;
  }
  getRoleById(): void {
    this.commonService.getRoleById(this.id).subscribe((role: Role) => {
      if (role) {
        this.form.patchValue({
          name: role.name
        });
      }
    });
  }
  

onSubmit_Form() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const roleData = {
      id:this.roleId,
      name:this.form.get("name").value,
    };

    if (this.roleId) {
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