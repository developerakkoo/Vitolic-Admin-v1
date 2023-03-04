import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-send-notify',
  templateUrl: './send-notify.page.html',
  styleUrls: ['./send-notify.page.scss'],
})
export class SendNotifyPage implements OnInit {

  @Input() token: string;
  notifyForm: FormGroup;

  constructor(private fb: FormBuilder,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private http: HttpClient) {
    this.notifyForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required]

    })
  }

  ngOnInit() {
    console.log(this.token);

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Sending to user',
      duration: 2000,
    });
    await loading.present();
  }

  onSubmit() {
    let obj = {
      registrationToken: this.token,
      message:{
        notification: {
          title: this.notifyForm.value.title,
          body: this.notifyForm.value.message
        }
      }
    }
    console.log(obj);
    this.presentLoading();
    this.http.post(environment.Url +'/firebase/notification', obj)
    .subscribe((data) =>{
      console.log(data);
      this.loadingController.dismiss();
      
    }, (error) =>{
      console.log(error);
      this.loadingController.dismiss();
      
    })

  }
}
