import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditSubscriptionPageRoutingModule } from './edit-subscription-routing.module';

import { EditSubscriptionPage } from './edit-subscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditSubscriptionPageRoutingModule
  ],
  declarations: [EditSubscriptionPage]
})
export class EditSubscriptionPageModule {}
