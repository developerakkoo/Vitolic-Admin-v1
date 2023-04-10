import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  loginForm: FormGroup;

  constructor(private auth: AngularFireAuth,
              private loadingController: LoadingController,
              private appComponent: AppComponent,
              private alertController: AlertController,
              private router: Router,
              private fb: FormBuilder,
              private menuCtrl: MenuController,
              private toastController: ToastController)
               { 
                this.loginForm = this.fb.group({
                  email:['', [Validators.required]],
                  password:['', [Validators.required]]
                })

                this.menuCtrl.enable(false);
               }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'loggin in ...',
    });
    await loading.present();
  }

  onSubmit(){
    this.presentLoading();
    this.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then((auth) =>{
      console.log(auth);
      this.loadingController.dismiss();
      this.appComponent.isAuth = false;
      this.router.navigate(['folder', 'product']);
    }).catch((error) =>{
      console.log(error);
      this.loadingController.dismiss();

      
    })
  }
}
