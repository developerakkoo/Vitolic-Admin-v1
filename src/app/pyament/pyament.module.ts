import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PyamentPageRoutingModule } from './pyament-routing.module';

import { PyamentPage } from './pyament.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PyamentPageRoutingModule
  ],
  declarations: [PyamentPage]
})
export class PyamentPageModule {}
