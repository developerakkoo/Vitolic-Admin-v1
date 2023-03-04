import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendNotifyPage } from './send-notify.page';

const routes: Routes = [
  {
    path: '',
    component: SendNotifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendNotifyPageRoutingModule {}
