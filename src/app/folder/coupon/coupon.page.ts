import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.page.html',
  styleUrls: ['./coupon.page.scss'],
})
export class CouponPage implements OnInit {

  coupons:any[] = [];

  getCouponSub: Subscription;
  getUsersSub: Subscription;
  deletePromosub: Subscription;

  constructor(private router: Router,
              private http: HttpClient,
              private loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getCoupons();
  }

  ionViewDidLeave(){
    this.getCouponSub.unsubscribe();
  }
  openAddCouponPage(){
    this.router.navigate(['folder','coupon', 'add-coupon']);
  }

  delete(id){
    this.deletePromosub = this.http.delete(environment.Url +'/promo/'+ id)
              .subscribe(async (p) =>{
                this.getCoupons();
              },async(error) =>{
                console.log(error);
                
              })
  }

 
 async getCoupons(){
  let loading = await this.loadingController.create({
    message: "Getting coupons..",
    duration: 9000
  })

  await loading.present();
    this.getCouponSub = this.http.get(environment.Url +'/coupon')
    .subscribe(async (p) =>{
      console.log(p);
      this.coupons = p['promo']
  await loading.dismiss();

      
    }, async (error) =>{
      console.log(error);
  await loading.dismiss();

      
    })
  }

}
