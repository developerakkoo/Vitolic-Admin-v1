import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-boy',
  templateUrl: './add-boy.page.html',
  styleUrls: ['./add-boy.page.scss'],
})
export class AddBoyPage implements OnInit {

  registerForm: FormGroup;
  registerBoySub: Subscription;
  constructor(private fb: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private http: HttpClient,
    private router: Router,
    private auth: AngularFireAuth,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.min(10)]],
      boyPincode: ['', [Validators.required, Validators.min(6)]],
      boyLandmark: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  async presentAlert(msg, header, sub) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Registering...',
    });
    await loading.present();
  }


  onSubmit() {
    this.presentLoading();

    let body = {
      fullName: this.registerForm.value.fullName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      contactNumber: this.registerForm.value.contactNumber,
      boyPincode: this.registerForm.value.boyPincode,
      boyLandmark: this.registerForm.value.boyLandmark
    }
    this.registerBoySub = this.http.post(environment.Url + `/boy/register/`, body)
      .subscribe(async (boy) => {
        console.log(boy);
        this.loadingController.dismiss()
        this.router.navigate(['folder', 'deliver-boy'])
      }, async (error) => {
        console.log(error);
        this.loadingController.dismiss()

      }, () => {
        this.registerBoySub.unsubscribe();
        this.loadingController.dismiss()

      })

  }


}
