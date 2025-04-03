import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { CommonService } from './services/common.service';
import { UserService } from './services/user.service';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginService } from './services/login.service';
import { RegistrationValidators } from './validators/registration.validators';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { PropertyComponent } from './property/property.component';
import { ServiceComponent } from './service/service.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AgentComponent } from './agent/agent.component';
import { PaymentComponent } from './payment/payment.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { Payment1Component } from './payment1/payment1.component';
import { PaymentsuccessComponent } from './paymentsuccess/paymentsuccess.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PrintDocumentComponent } from './print-document/print-document.component';
@NgModule({
  
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    PropertyComponent,
    ServiceComponent,
    ContactUsComponent,
    AgentComponent,
    PaymentComponent,
    PropertyDetailComponent,
    ProfileComponent,
    Payment1Component,
    PaymentsuccessComponent,
    PrintDocumentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbCarouselModule,
    FormsModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(), 
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    // AdministrationModule
  ],
  exports: [
    FormsModule
  ],
  providers: [CommonService,UserService,LoginService,Title,RegistrationValidators],
  bootstrap: [AppComponent]
})
export class AppModule { }
