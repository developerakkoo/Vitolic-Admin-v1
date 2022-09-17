import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OrderServiceService } from '../order-service.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.page.html',
  styleUrls: ['./edit-order.page.scss'],
})
export class EditOrderPage implements OnInit {
  orderId;
  orders:any[] =[];
  getOrderSubs: Subscription;
  OrderEdit: FormGroup;
  constructor(private orderService: OrderServiceService,public formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute,private carts: OrderServiceService,
    private loadingController: LoadingController,
   
    ) {
      this.orderId = this.route.snapshot.paramMap.get("id");
      this.getOrderById(this.orderId);
         }


  getOrderById(orderId: any) {
    this.orderService.getOrderById(orderId).subscribe((order) =>{
      console.log(order);
      
    },(error) =>{
      console.log(error);
      
    })
  }

  ngOnInit() {
    this.OrderEdit = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      file:['',[Validators.required]],

    })


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
  
  

}
