import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyRoutingModule } from './property-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReUsableModule } from './../../common/re-usable.module';

import { PropertyViewComponent } from './property-view/property-view.component';
import { PropertyNewComponent } from './property-new/property-new.component';
import { FindPropertyComponent } from './find-property/find-property.component';
import { PropertyListingComponent } from './property-listing/property-listing.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { PropertyMainComponent } from './property-main/property-main.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    PropertyNewComponent, 
    FindPropertyComponent, 
    PropertyListingComponent, 
    EditPropertyComponent,
    PropertyMainComponent,
    PropertyViewComponent,
    PropertyListComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ReUsableModule,
    CommonModule,
    PropertyRoutingModule,
    NgbModule,
    NgbModalModule,
    NgxSpinnerModule,
            ToastrModule.forRoot({
              timeOut: 3000,
              positionClass: 'toast-top-right',
              preventDuplicates: true
            })
  ]
})
export class PropertyModule { }
