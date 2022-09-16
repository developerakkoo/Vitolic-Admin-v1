import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdicityPage } from './edicity.page';

const routes: Routes = [
  {
    path: '',
    component: EdicityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdicityPageRoutingModule {}
