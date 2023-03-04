import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendNotifyPageRoutingModule } from './send-notify-routing.module';

import { SendNotifyPage } from './send-notify.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    SendNotifyPageRoutingModule
  ],
  declarations: [SendNotifyPage]
})
export class SendNotifyPageModule {}
