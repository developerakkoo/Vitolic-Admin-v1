import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBoyPageRoutingModule } from './add-boy-routing.module';

import { AddBoyPage } from './add-boy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddBoyPageRoutingModule
  ],
  declarations: [AddBoyPage]
})
export class AddBoyPageModule {}
