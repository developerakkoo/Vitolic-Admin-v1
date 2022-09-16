import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AddSubscriptionPageRoutingModule } from './add-subscription-routing.module';

import { AddSubscriptionPage } from './add-subscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddSubscriptionPageRoutingModule
  ],
  declarations: [AddSubscriptionPage]
})
export class AddSubscriptionPageModule {}
