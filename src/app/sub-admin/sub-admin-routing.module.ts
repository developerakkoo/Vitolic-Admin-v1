import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubAdminPage } from './sub-admin.page';

const routes: Routes = [
  {
    path: '',
    component: SubAdminPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubAdminPageRoutingModule {}
