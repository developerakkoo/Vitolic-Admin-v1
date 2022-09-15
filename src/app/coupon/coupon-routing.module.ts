import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponPage } from './coupon.page';

const routes: Routes = [
  {
    path: '',
    component: CouponPage
  },
  {
    path: 'add-coupon',
    loadChildren: () => import('./add-coupon/add-coupon.module').then( m => m.AddCouponPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponPageRoutingModule {}
