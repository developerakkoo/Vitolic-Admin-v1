import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppupdatePageRoutingModule } from './appupdate-routing.module';

import { AppupdatePage } from './appupdate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AppupdatePageRoutingModule
  ],
  declarations: [AppupdatePage]
})
export class AppupdatePageModule {}
