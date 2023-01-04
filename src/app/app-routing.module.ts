import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
 

  {
    path: 'edit-deliver-boy',
    loadChildren: () => import('./folder/deliver-boy/edit-deliver-boy/edit-deliver-boy.module').then( m => m.EditDeliverBoyPageModule)
  },
  {
    path: 'refund',
    loadChildren: () => import('./refund/refund.module').then( m => m.RefundPageModule)
  },
 
 
  {
    path: 'refund',
    loadChildren: () => import('./refund/refund.module').then( m => m.RefundPageModule)
  },
 
  {
    path: 'collection',
    loadChildren: () => import('./collection/collection.module').then( m => m.CollectionPageModule)
  },
  {
    path: 'pyament',
    loadChildren: () => import('./pyament/pyament.module').then( m => m.PyamentPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },  {
    path: 'add-boy',
    loadChildren: () => import('./deliver-boy/add-boy/add-boy.module').then( m => m.AddBoyPageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
