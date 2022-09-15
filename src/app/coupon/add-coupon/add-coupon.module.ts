import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCouponPageRoutingModule } from './add-coupon-routing.module';

import { AddCouponPage } from './add-coupon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddCouponPageRoutingModule
  ],
  declarations: [AddCouponPage]
})
export class AddCouponPageModule {}
