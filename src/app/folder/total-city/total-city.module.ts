import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TotalCityPageRoutingModule } from './total-city-routing.module';

import { TotalCityPage } from './total-city.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TotalCityPageRoutingModule
  ],
  declarations: [TotalCityPage]
})
export class TotalCityPageModule {}
