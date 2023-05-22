import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersPage } from './users.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  },
  {
    path: 'edit-users/:id',
    loadChildren: () => import('./edit-users/edit-users.module').then( m => m.EditUsersPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'list-products/:userId',
    loadChildren: () => import('./list-products/list-products.module').then( m => m.ListProductsPageModule)
  },
  {
    path: 'subscription-detail/:userId/:productId',
    loadChildren: () => import('./subscription-detail/subscription-detail.module').then( m => m.SubscriptionDetailPageModule)
  },
  {
    path: 'custom/:productId/:amount/:address/:userId',
    loadChildren: () => import('./custom/custom.module').then( m => m.CustomPageModule)
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
