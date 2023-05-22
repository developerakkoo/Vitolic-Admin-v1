import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { HandlerService } from 'src/app/handler.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  from: FormGroup;

  postSubAdminSub!: Subscription;

  constructor(private fb: FormBuilder,
              private loadingController: LoadingController,
              private http: HttpClient,
              private handler: HandlerService,
              private alertController: AlertController) {
    this.from = this.fb.group({
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required]],
      city: [, [Validators.required]],

      isProductAdd:[false,],
      isProductEdit:[false, ],
      isProductDelete: [false,],

      isOrderAdd:[false,],
      isOrderEdit:[false,],
      isOrderDelete: [false, ],

      isUserAdd:[false,],
      isUserEdit:[false, ],
      isUserDelete: [false, ],

      isBoyAdd:[false, ],
      isBoyEdit:[false, ],
      isBoyDelete: [false, ],

      isPromoAdd:[false,],
      isPromoEdit:[false, ],
      isPromoDelete: [false, ],

      isBannerAdd:[false,],
      isBannerEdit:[false, [],],
      isBannerDelete: [false, [],],

      isSubscriptionAdd:[false,],
      isSubscriptionEdit:[false, []],
      isSubscriptionDelete: [false, []],

      isCityAdd:[false, ],
      isCityEdit:[false,],
      isCityDelete: [false, ],

    })
   }

  ngOnInit() {
  }

  IonViewDidLeave(){
    this.postSubAdminSub.unsubscribe();
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Registering please wait...',
    });
    await loading.present();
  }

  async presentAlert(header: string, msg: string) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }
 async onSubmit(){
  this.presentLoading();
    console.log(this.from.value);
    this.postSubAdminSub = this.http.post(environment.Url +'/subadminsignup', this.from.value)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.loadingController.dismiss();
        this.handler.presentToast("Sub Admin created successfully!", 2000, 'top');
        
      },
      error:(error) =>{
        console.log(error);
        this.loadingController.dismiss();
        this.handler.presentToast("Something Went Wrong!", 2000, 'top');
        
      }
    })
    
  }

}
