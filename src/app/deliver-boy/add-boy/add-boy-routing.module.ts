import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBoyPage } from './add-boy.page';

const routes: Routes = [
  {
    path: '',
    component: AddBoyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBoyPageRoutingModule {}
