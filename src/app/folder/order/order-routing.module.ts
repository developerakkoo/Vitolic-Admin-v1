import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderPage } from './order.page';

const routes: Routes = [
  {
    path: '',
    component: OrderPage
  },
  {
    path: 'edit-order/:id',
    loadChildren: () => import('./edit-order/edit-order.module').then( m => m.EditOrderPageModule)
  },
  {
    path: 'order-details/:id',
    loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPageRoutingModule {}
