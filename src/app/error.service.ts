import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor( private toastController: ToastController ) { }

  async presentError(msg: string, duration) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration
    });
    toast.present();
  }
}
