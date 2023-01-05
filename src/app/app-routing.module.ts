import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['folder', 'product']);
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',


  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [AngularFireAuthGuard],

    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
 

  {
    path: 'edit-deliver-boy',
    loadChildren: () => import('./folder/deliver-boy/edit-deliver-boy/edit-deliver-boy.module').then( m => m.EditDeliverBoyPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }

  },
  {
    path: 'refund',
    loadChildren: () => import('./refund/refund.module').then( m => m.RefundPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }

  },
 
 
  {
    path: 'refund',
    loadChildren: () => import('./refund/refund.module').then( m => m.RefundPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }

  },
 
  {
    path: 'collection',
    loadChildren: () => import('./collection/collection.module').then( m => m.CollectionPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }

  },
  {
    path: 'pyament',
    loadChildren: () => import('./pyament/pyament.module').then( m => m.PyamentPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }

  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }

  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }

  },
  {
    path: 'add-boy',
    loadChildren: () => import('./deliver-boy/add-boy/add-boy.module').then( m => m.AddBoyPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }

  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule),
    canActivate: [AngularFireAuthGuard],

    data: { authGuardPipe: redirectLoggedInToItems },
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
