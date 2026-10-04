import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailabilityRoutingModule } from './availability-routing.module';
import { AvailabilityListComponent } from './availability-list/availability-list.component';
import { AvailabilityComponent } from './availability.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AvailabilityListComponent,
  
  ],
  imports: [
    FormsModule,
    NgbPaginationModule,
    CommonModule,
    ReactiveFormsModule,
    AvailabilityRoutingModule
  ]
})
export class AvailabilityModule { }
