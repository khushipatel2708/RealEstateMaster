import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReUsableModule } from '../common/re-usable.module';
import { PropertyModule } from './property/property.module';
import { DashboardHomeComponent } from './users/components/dashboard/dashboard-home/dashboard-home.component';
import { EditProfileComponent } from './users/components/profile/edit-profile/edit-profile.component';
import { RegistrationComponent } from './users/registration/registration.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { BuilderModule } from './builder/builder.module';
import { UserComponent } from './users/components/user/user.component';
import { UsersModelComponent } from './users/components/user/users-model/users-model.component';
import { FeaturesRoutingModule } from './users/features-routing.module';
import { AvailabilityModule } from './availability/availability.module';

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
    BuilderModule,
    AvailabilityModule,
    NgxSpinnerModule, 
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
