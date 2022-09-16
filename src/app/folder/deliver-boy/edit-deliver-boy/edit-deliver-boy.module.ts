import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditDeliverBoyPageRoutingModule } from './edit-deliver-boy-routing.module';

import { EditDeliverBoyPage } from './edit-deliver-boy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditDeliverBoyPageRoutingModule
  ],
  declarations: [EditDeliverBoyPage]
})
export class EditDeliverBoyPageModule {}
