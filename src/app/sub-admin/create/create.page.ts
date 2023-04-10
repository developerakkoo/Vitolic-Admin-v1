import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  from: FormGroup;
  constructor(private fb: FormBuilder,
              private loadingController: LoadingController,
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
  onSubmit(){
    console.log(this.from.value);
    
  }

}
