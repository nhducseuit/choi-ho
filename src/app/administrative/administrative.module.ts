import {
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatSliderModule,
  MatNativeDateModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativeRoutingModule } from './administrative-routing.module';
import { AdministrativeComponent } from './administrative.component';
import { AddInvestorComponent } from './add-investor/add-investor.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdministrativeComponent, AddInvestorComponent],
  imports: [
    CommonModule,
    AdministrativeRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class AdministrativeModule { }
