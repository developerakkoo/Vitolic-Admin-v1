import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverBoyPage } from './deliver-boy.page';

const routes: Routes = [
  {
    path: '',
    component: DeliverBoyPage
  },
  {
    path: 'edit-deliver-boy/:id',
    loadChildren: () => import('./edit-deliver-boy/edit-deliver-boy.module').then( m => m.EditDeliverBoyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverBoyPageRoutingModule {}
