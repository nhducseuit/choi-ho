import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TontineComponent } from './tontine.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'explore'
  },
  {
    path: 'explore',
    component: TontineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TontineExplorerRoutingModule { }
