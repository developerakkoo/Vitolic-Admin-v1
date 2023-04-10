import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);

const routes: Routes = [
  {
    path: '',
    component: FolderPage,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }

  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }

    
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'deliver-boy',
    loadChildren: () => import('./deliver-boy/deliver-boy.module').then( m => m.DeliverBoyPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'coupon',
    loadChildren: () => import('./coupon/coupon.module').then( m => m.CouponPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'banner',
    loadChildren: () => import('./banner/banner.module').then( m => m.BannerPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'subscription',
    loadChildren: () => import('./subscription/subscription.module').then( m => m.SubscriptionPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'total-city',
    loadChildren: () => import('./total-city/total-city.module').then( m => m.TotalCityPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'appupdate',
    loadChildren: () => import('./appupdate/appupdate.module').then( m => m.AppupdatePageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./policy/policy.module').then( m => m.PolicyPageModule)
  },
  {
    path: 'issues',
    loadChildren: () => import('./issues/issues.module').then( m => m.IssuesPageModule)
  },  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.module').then( m => m.AnalyticsPageModule)
  },
  {
    path: 'summary',
    loadChildren: () => import('./summary/summary.module').then( m => m.SummaryPageModule)
  },


  // {
  //   path: 'refund',
  //   loadChildren:()
  // },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
