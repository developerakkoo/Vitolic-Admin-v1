import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PyamentPage } from './pyament.page';

const routes: Routes = [
  {
    path: '',
    component: PyamentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PyamentPageRoutingModule {}
