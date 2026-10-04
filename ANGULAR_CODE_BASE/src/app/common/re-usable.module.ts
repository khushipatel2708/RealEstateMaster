import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { HttpClientXsrfModule, HttpClientModule } from "@angular/common/http";

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginService } from './services/login.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RegistrationValidators } from './validators/registration.validators';
import { PropertylistComponent } from './components/propertylist/propertylist.component';
import { SmallComponentsComponent } from './components/small-components/small-components.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { DashboardComponent } from './components/dashboard-main/dashboard.component';
import { InputFormatDirective } from './directives/input-format.directive';
import {  NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotificationComponent } from 'app/notification/notification.component';
import { AvailabilityComponent } from '../features/availability/availability.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgbModalModule,
    ReactiveFormsModule
    // HttpClientXsrfModule.withOptions({
    //   cookieName: 'csrftoken',
    //   headerName: 'X-CSRFToken',
    // })
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    NotificationComponent,
    FooterComponent,
    PropertylistComponent,
    AvailabilityComponent,
    SmallComponentsComponent,
    NotFoundComponent,
    LoginModalComponent,
    InputFormatDirective,
    ForgotPasswordComponent,
    AvailabilityComponent,
  ],
  exports: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    PropertylistComponent,
    SmallComponentsComponent,
    NotFoundComponent,
    InputFormatDirective
  ],
  providers: [
    LoginService,
    RegistrationValidators,
    AuthGuardService
  ]
})
export class ReUsableModule { }
