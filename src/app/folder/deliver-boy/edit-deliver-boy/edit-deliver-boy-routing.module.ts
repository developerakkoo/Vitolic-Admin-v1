import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDeliverBoyPage } from './edit-deliver-boy.page';

const routes: Routes = [
  {
    path: '',
    component: EditDeliverBoyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDeliverBoyPageRoutingModule {}
