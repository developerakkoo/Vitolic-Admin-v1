import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddCityPageRoutingModule } from './add-city-routing.module';

import { AddCityPage } from './add-city.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddCityPageRoutingModule
  ],
  declarations: [AddCityPage]
})
export class AddCityPageModule {}
