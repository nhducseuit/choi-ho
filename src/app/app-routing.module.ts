import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tontine'
  },
  {
    path: 'tontine',
    loadChildren: () => import('./tontine-explorer/tontine-explorer.module').then(m => m.TontineExplorerModule)
  },
  { path: 'myadminpage', loadChildren: () => import('./administrative/administrative.module').then(m => m.AdministrativeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
