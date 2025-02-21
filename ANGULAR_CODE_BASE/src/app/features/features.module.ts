import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditProfileComponent } from './users/components/profile/edit-profile/edit-profile.component';
import { DashboardHomeComponent } from './users/components/dashboard/dashboard-home/dashboard-home.component';
import { ReUsableModule } from '../common/re-usable.module';
import { RegistrationComponent } from './users/registration/registration.component';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PropertyModule } from './property/property.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
// import { RoleModule } from './role/role.module';

import { PermissionComponent } from './permission/permission.component';
import { UserComponent } from './users/components/user/user.component';
import { FeaturesRoutingModule } from './users/features-routing.module';
import { UsersModelComponent } from './users/components/user/users-model/users-model.component';
import { BuilderComponent } from './builder/builder.component';
import { BuilderModalComponent } from './builder/builder-modal/builder-modal.component';
import { BuilderModule } from './builder/builder.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReUsableModule,
    FeaturesRoutingModule,
    PropertyModule,
    NgSelectModule,
    NgbModule,
    BuilderModule
  ],
  declarations: [
    RegistrationComponent,
    EditProfileComponent, 
    DashboardHomeComponent,
    UserComponent,
    UsersModelComponent,
    UserComponent,
    UsersModelComponent,
 
  ],
  providers: [
  ]
})
export class FeaturesModule { }
