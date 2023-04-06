import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  orderId;

  cart;
  user;
  product;

  getOrdersSub: Subscription;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              ) { 
                this.orderId = this.route.snapshot.paramMap.get('id');
                console.log(`OrderID is:- ${this.orderId} `);
                
              }

  ngOnInit() {
  }

  ionViewDidEnter()
  {
    this.getOrderDetails();
  }

  getOrderDetails(){
    this.getOrdersSub = 
    this.http.get(environment.Url +'/cart/'+ this.orderId)
    .subscribe((cart) =>{
      console.log(cart);
      this.cart = cart?.['cart'];
      this.user = cart?.['cart']?.['userId'];
      this.product = cart?.['cart']?.['products'];
    }, (error) =>{
      console.log(error);
      
    })
  }

}
