import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverBoyPageRoutingModule } from './deliver-boy-routing.module';

import { DeliverBoyPage } from './deliver-boy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverBoyPageRoutingModule
  ],
  declarations: [DeliverBoyPage]
})
export class DeliverBoyPageModule {}
