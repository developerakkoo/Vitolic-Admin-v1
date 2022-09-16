import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BannerPage } from './banner.page';

const routes: Routes = [
  {
    path: '',
    component: BannerPage
  },
  {
    path: 'add-banner',
    loadChildren: () => import('./add-banner/add-banner.module').then( m => m.AddBannerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannerPageRoutingModule {}
