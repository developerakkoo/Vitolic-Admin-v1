import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TotalCityPage } from './total-city.page';

const routes: Routes = [
  {
    path: '',
    component: TotalCityPage
  },
  {
    path: 'edicity/:id',
    loadChildren: () => import('./edicity/edicity.module').then( m => m.EdicityPageModule)
  },
  {
    path: 'add-city',
    loadChildren: () => import('./add-city/add-city.module').then( m => m.AddCityPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TotalCityPageRoutingModule {}
