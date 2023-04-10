import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from './order-service.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  orders:any[] =[];




  getOrderSubs: Subscription;
  getOrderPauseSubs: Subscription;
  getOrderTermSubs: Subscription;
  segmentValue:string;
  orderFilter: any= {orderId: ''};
  isPaused;
  isTerminated;
  constructor(private carts: OrderServiceService,
     private loadingController: LoadingController, 
     private router: Router) { }

  ngOnInit() {

    this.getAllCart();
  }

  onOpenOrderEdit(id){
    this.router.navigate(['folder', 'order', 'order-details', id])
  }

  onDeleteOrder(id){
    console.log(id);
    //Terminate the Subscription

    // /subscription/terminate/subId/cartId PUT
    
  }

  async  getAllCart(){
    let loading = await this.loadingController.create({
      message:"Loading products...",
      spinner:"lines"
    })

    await loading.present();
  
    this.getOrderSubs = this.carts.getAllOrders()
    .subscribe(async(carts:any) =>{
      console.log(carts);
      this.orders = carts['cart'];
      await loading.dismiss();
    }, async (error)=>{
      console.log(error);
      
    })
    await loading.dismiss();
    }
  

    getOrderPaused(){
      this.getOrderPauseSubs = this.carts.getOrderPaused().subscribe(async(paused) =>{
        console.log("paused order");
        this.orders = paused['cart'];
      },async(err) =>{
        console.log(err);
        
      }, () =>{
        this.getOrderPauseSubs.unsubscribe();
      })
    }


    getOrderTerminated(){
      this.getOrderTermSubs = this.carts.getOrderTerminated().subscribe(async(paused) =>{
        console.log("term order");
        this.orders = paused['cart'];
        console.log(paused);
        
      },async(err) =>{
        console.log(err);
        
      }, () =>{
        this.getOrderPauseSubs.unsubscribe();
      })
    }
    segmentChanged(ev){
      console.log(ev);
      let value = ev.detail.value;
      if(value == 'paused'){
        this.getOrderPaused();
        return;
      }

      if(value == 'terminated'){
        this.getOrderTerminated();
        return;
      }

      if(value == 'all'){
        this.getAllCart();
        return;
      }

    }
    openOrderDetailPage(cart){
      // console.log(cart);
      this.router.navigate(['folder', 'order', 'edit-order', cart._id]);
      
    }
    

}
