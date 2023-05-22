import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HandlerService } from '../handler.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.page.html',
  styleUrls: ['./sub-admin.page.scss'],
})
export class SubAdminPage implements OnInit {

  getSubAdminSub!: Subscription;
  deleteSubAdminSub!: Subscription;

  admin:any[] =[];
  
  constructor(private router: Router,
    private loadingController: LoadingController,
              private handler: HandlerService,
              private alertController: AlertController,
              private http: HttpClient) { }

  ngOnInit() {
    this.getAllSubAdmin();
  }

  async deleteAdminAlertConfirm(id:any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteAdmin(id);
          }
        }
      ]
    });
  
    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();
  }
  addSubAdmin(){
    this.router.navigate(['sub-admin', 'create']);
  }

  async getAllSubAdmin(){
    this.presentLoading();
    this.http.get(environment.Url +'/subadmin')
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.admin = value['subAdmin'];
        this.loadingController.dismiss();
      },
      error: (error) =>{
        console.log(error);
        this.loadingController.dismiss();
        this.handler.presentToast("Something went wrong!", 2000, 'top');        
      }
    })
  }

  deleteAdmin(id:any){
    this.presentLoading();
    this.deleteSubAdminSub = this.http.delete(environment.Url + '/subadmin/'+ id)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.handler.presentToast("Sub Admin Deleted Successfully!", 2000, 'top');
        this.loadingController.dismiss();
        
      },
      error:(error) =>{
        console.log(error);
        this.loadingController.dismiss();
        this.handler.presentToast("Something went wrong!", 2000, 'top');

        
      }
    })
  }
}
