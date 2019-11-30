import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TontineExplorerRoutingModule } from './tontine-explorer-routing.module';
import { TontineComponent } from './tontine/tontine.component';
import { MatIconModule, MatProgressBarModule } from '@angular/material';
import { InvestorComponent } from './investor/investor.component';

@NgModule({
  declarations: [TontineComponent, InvestorComponent],
  imports: [
    CommonModule,
    MatIconModule,
    TontineExplorerRoutingModule,
    MatProgressBarModule
  ]
})
export class TontineExplorerModule { }
