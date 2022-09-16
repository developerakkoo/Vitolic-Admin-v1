import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionPage } from './subscription.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionPage
  },
  {
    path: 'edit-subscription/:id',
    loadChildren: () => import('./edit-subscription/edit-subscription.module').then( m => m.EditSubscriptionPageModule)
  },
  {
    path: 'add-subscription',
    loadChildren: () => import('./add-subscription/add-subscription.module').then( m => m.AddSubscriptionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionPageRoutingModule {}
