import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionService } from './subscription.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  subscript:any[] =[];

  getSubscript: Subscription;
  constructor(private Subs: SubscriptionService,private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.getAllSubscripsti();
  }

  openEditPage(subscript){
    console.log(subscript._id);
    this.router.navigate(['folder','subscription','edit-subscription', subscript._id]);
    
  }

  IonViewDidLeave(){
    this.getSubscript.unsubscribe();
  }




  async  getAllSubscripsti(){

      let loading = await this.loadingController.create({
        message:"Loading Subscripstion...",
        spinner:"lines"
      })
    
    
    
    
    
      await loading.present();





    this.getSubscript = this.Subs.getAllSubscription()

    .subscribe(async(subscript:any) =>{
      console.log(subscript);
      this.subscript = subscript['subscription'];
      await loading.dismiss();
    }, async (error)=>{
      console.log(error);
      await loading.dismiss();
    })
    }

    deletesubscriptClick(id){
      this.Subs.deleteSubscription(id)
      .subscribe(async (subscription) =>{
        console.log(subscription);
        this.getAllSubscripsti();
        
      }, async (error) =>{
        console.log(error);
        
      })
    }
}
