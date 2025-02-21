// menu1.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menu1Component } from './component/menu1/menu1.component';
// import { Menu1ModalComponent } from './component/menu1-modal/menu1-modal.component'; // Import the component
import { Menu1RoutingModule } from './menu1-routing.module';
import { Menu1ModalComponent } from './component/menu1/menu1-modal/menu1-modal.component';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReUsableModule } from 'app/common/re-usable.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Menu1Component,
    Menu1ModalComponent // Declare the component here
  ],
  imports: [
    CommonModule,
    Menu1RoutingModule,
    FormsModule,
    NgbModule,
    ReUsableModule,
    ReactiveFormsModule,
    NgbTooltipModule
  ]
})
export class Menu1Module { }
