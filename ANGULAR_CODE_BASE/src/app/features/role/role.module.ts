// role.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule } from './role-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleComponent } from './components/role/role.component';
import { NgbModalModule, NgbModule, NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReUsableModule } from 'app/common/re-usable.module';
import { RoleModalComponent } from './components/role/role-modal/role-modal.component';

@NgModule({
  declarations: [RoleComponent, RoleModalComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    NgbModule,
    ReUsableModule,
    ReactiveFormsModule,
    // NgbTooltipModule
  ]
})
export class RoleModule { }