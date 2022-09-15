import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RefundService } from './refund.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-refund',
  templateUrl: './refund.page.html',
  styleUrls: ['./refund.page.scss'],
})
export class RefundPage implements OnInit {
  refund:any[] =[];
  getRefundSub: Subscription;
  constructor(private refunds: RefundService,private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.getAllRefunds();
  }


  IonViewDidLeave(){
    this.getRefundSub.unsubscribe();
  }


  async getAllRefunds(){


    let loading = await this.loadingController.create({
      message:"Loading products...",
      spinner:"lines"
    })
  
  
  
  
  
    await loading.present();
  
    this.getRefundSub = this.refunds.getAllRefund()
    .subscribe(async(refund:any) =>{
      console.log(refund);
      this.refund = refund['refund'];
      await loading.dismiss();
      
    }, async (error)=>{
      console.log(error);
      await loading.dismiss();
    })
  }
  deleteRefundClick(id){
    this.refunds.deleteRefund(id)
    .subscribe(async (refund) =>{
      console.log(refund);
      this.getAllRefunds();
      
    }, async (error) =>{
      console.log(error);
      
    })
  }


}
