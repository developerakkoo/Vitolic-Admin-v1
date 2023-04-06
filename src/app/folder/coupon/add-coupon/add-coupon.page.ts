import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.page.html',
  styleUrls: ['./add-coupon.page.scss'],
})
export class AddCouponPage implements OnInit {

  users:any[];
  offer;
  code;
  maxAmuont:number;
  userId:string;
  isUser: Boolean;
  createCouponSub: Subscription;
  getUsersSub: Subscription;

  constructor(private http: HttpClient,
              private router: Router,
              private loadingController: LoadingController,
              private toastController: ToastController) { }

  ngOnInit() {
    this.getUsers();
  }


  ionViewDidLeave(){
    this.createCouponSub.unsubscribe();
  }
  isUserEvent(ev){
    console.log(ev.detail.value);
    if(ev.detail.value == "yes"){
      this.isUser = true;
    }
    if(ev.detail.value == "no"){
      this.isUser = false;
    }
    
  }

  userSelectEvent(ev){
    console.log(ev.detail.value);
    this.userId = ev.detail.value;
    
  }
 
  getUsers(){
    this.getUsersSub = this.http.get(environment.Url +'/user/profiles').subscribe((users) =>{
      console.log(users);
      this.users = users['users'];
      
    }, (error) =>{
      console.log(error);
      
    })
  }
  async submitForm() {
    let loading = await this.loadingController.create({
      message: "Creating Coupon...",
      duration: 9000
    })

    await loading.present();
    let body = {
      offer: this.offer,
      promoCode: this.code,
      maxAmount: this.maxAmuont,
      userId: this.userId || "",
      isUser: this.isUser
    }

    console.log(body);

    this.createCouponSub = this.http.post(environment.Url + '/promo', body)
    .subscribe(async (c) =>{
      console.log(c);
      await loading.dismiss();
      this.router.navigate(['folder', 'coupon']);
    }, async (error) =>{
      await loading.dismiss();

    })
    
  }
}
