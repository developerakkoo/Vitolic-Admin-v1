import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

 

  constructor(private http: HttpClient) { }

  // addProduct(){

  // }

  editProduct(){

  }

  // deleteProduct(){

  // }

  getOrderPaused(){
    return this.http.get(environment.Url +`/cart/paused`);
  }

  getOrderTerminated(){
    return this.http.get(environment.Url +`/cart/terminated`);
  }
  getOrderById(id){
    return this.http.get(environment.Url +"/cart/"+id);
  }

  getAllOrders(){
    return this.http.get(environment.Url +'/cart');
  }
}
