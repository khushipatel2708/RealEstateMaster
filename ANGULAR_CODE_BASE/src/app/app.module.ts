import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

import { NgbCarouselModule, NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReUsableModule } from './common/re-usable.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CommonService } from './common/services/common.service';
import { UserService } from './common/services/user.service';
import { PropertyModule } from './features/property/property.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbCarouselModule,
    ReUsableModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    ToastrModule.forRoot(), 
    HttpClientModule,
    // AdministrationModule
  ],
  exports: [
    FormsModule
  ],
  providers: [CommonService, UserService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
