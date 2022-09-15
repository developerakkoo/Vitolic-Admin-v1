import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EdicityPageRoutingModule } from './edicity-routing.module';

import { EdicityPage } from './edicity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EdicityPageRoutingModule
  ],
  declarations: [EdicityPage]
})
export class EdicityPageModule {}
