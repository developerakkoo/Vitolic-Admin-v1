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
  constructor(private carts: OrderServiceService,
     private loadingController: LoadingController,
     private router: Router) { }

  ngOnInit() {

    this.getAllCart();
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
  
    openOrderDetailPage(cart){
      // console.log(cart);
      this.router.navigate(['folder', 'order', 'edit-order', cart._id]);
      
    }
    

}
