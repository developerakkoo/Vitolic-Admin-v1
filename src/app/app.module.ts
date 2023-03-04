import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule  } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgChartsModule } from 'ng2-charts';
const firebaseConfig = {
  apiKey: "AIzaSyBk8Wgebp4KGgyJe9FZOptQjzUePcZzgEA",
  authDomain: "vitolic-422e9.firebaseapp.com",
  projectId: "vitolic-422e9",
  storageBucket: "vitolic-422e9.appspot.com",
  messagingSenderId: "866982989809",
  appId: "1:866982989809:web:8886cb39fb027b62e6be50",
  measurementId: "G-ZL9PK00SVB"
};
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    NgChartsModule,
    BrowserAnimationsModule,
     HttpClientModule,AngularFireModule.initializeApp(firebaseConfig),
     AngularFireAuthModule, AngularFireDatabaseModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
