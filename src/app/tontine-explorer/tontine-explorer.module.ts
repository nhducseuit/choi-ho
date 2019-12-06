import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TontineExplorerRoutingModule } from './tontine-explorer-routing.module';
import { TontineComponent } from './tontine.component';
import { MatIconModule, MatProgressBarModule, MatExpansionModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TontineComponent],
  imports: [
    CommonModule,
    TontineExplorerRoutingModule,
    SharedModule,
    MatIconModule,
    MatProgressBarModule,
    MatExpansionModule
  ]
})
export class TontineExplorerModule { }
