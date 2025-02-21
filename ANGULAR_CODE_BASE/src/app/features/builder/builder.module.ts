import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuilderModalComponent } from './builder-modal/builder-modal.component';
import { BuilderRoutingModule } from './builder-routing.module';
import { BuilderComponent } from './builder.component';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReUsableModule } from 'app/common/re-usable.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BuilderComponent,
    BuilderModalComponent // Declare the component here
  ],
  imports: [
    CommonModule,
    BuilderRoutingModule,
    FormsModule,
    NgbModule,
    ReUsableModule,
    ReactiveFormsModule,
    NgbTooltipModule
  ]

})
export class BuilderModule { }
