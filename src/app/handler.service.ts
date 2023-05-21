import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  constructor(private loadingController: LoadingController,
              private toastController: ToastController,
              private alertController: AlertController) { }
  



              async presentToast(msg: string, duration: number, pos:any) {
                const toast = await this.toastController.create({
                  message: msg,
                  duration: duration,
                  position: pos
                });
                toast.present();
              }

              async presentLoading(msg:string,) {
                const loading = await this.loadingController.create({
                  message: msg,
                });
                await loading.present();
              }



              async dismissLoading(){
              this.loadingController.dismiss();
              
              }

              async presentAlert(header:string, msg: string) {
                const alert = await this.alertController.create({
                  header: header,
                  // subHeader: 'Subtitle',
                  message: msg,
                  buttons: ['OK']
                });
              
                await alert.present();
              }
}
