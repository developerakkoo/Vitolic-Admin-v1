import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionService } from './subscription.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  subscription: any[] = [];

  getSubscript: Subscription;
  getSubByTypeeSub: Subscription;

  constructor(private Subs: SubscriptionService, 
    private http: HttpClient,
    private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.getAllSubscripsti();
  }

  openEditPage(subscript) {
    console.log(subscript._id);
    this.router.navigate(['folder', 'subscription', 'edit-subscription', subscript._id]);

  }

  IonViewDidLeave() {
    this.getSubscript.unsubscribe();
  }




  async getAllSubscripsti() {

    let loading = await this.loadingController.create({
      message: "Loading Subscripstion...",
      spinner: "lines"
    })

    await loading.present();

    this.getSubscript = this.Subs.getAllSubscription()

      .subscribe(async (subscript: any) => {
        console.log(subscript);
        this.subscription = subscript;
        await loading.dismiss();
      }, async (error) => {
        console.log(error);
        await loading.dismiss();
      }, () => {
        this.getSubscript.unsubscribe();
      })
  }

  deletesubscriptClick(id) {
    this.Subs.deleteSubscription(id)
      .subscribe(async (subscription) => {
        console.log(subscription);
        this.getAllSubscripsti();

      }, async (error) => {
        console.log(error);

      })
  }

  getSubByType(type){
    this.getSubByTypeeSub = this.http.get(environment.Url + `/subscription/type/${type}`)
    .subscribe(async (sub) =>{
      console.log(sub);
      // this.subscription = sub;
    }, async (err) =>{
      console.log(err);
      
    }, () =>{
      this.getSubByTypeeSub.unsubscribe();
    })
  }

  segmentChanged(ev){
    console.log(ev.detail.value);
    this.getSubByType(ev.detail.value);
    
  }
}
