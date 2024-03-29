import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderDetailsPipe } from './order-details.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterPipeModule,
    OrderPageRoutingModule
  ],
  declarations: [OrderPage, OrderDetailsPipe]
})
export class OrderPageModule {}
