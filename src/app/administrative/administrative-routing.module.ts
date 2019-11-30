import { AddInvestorComponent } from './add-investor/add-investor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrativeComponent } from './administrative.component';

const routes: Routes = [
  { path: '', component: AdministrativeComponent },
  { path: 'add-investor/:tontineId', component: AddInvestorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativeRoutingModule { }
