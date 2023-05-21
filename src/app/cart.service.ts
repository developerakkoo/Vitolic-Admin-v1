import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: string;
  discountedPrice: number;
  imageUrl: string;
  stock: number;
  inStock: boolean;
  category: string;
  units: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  data: Product[] = [

  ];

  cart = [];
  cartItemCount = new BehaviorSubject(0);
  constructor(
              private http: HttpClient) { 
  }

   getUserCart(userId){
    return this.http.get(environment.Url + '/cart/user/'+ userId);
  }


   getAllCarts(){
    return this.http.get(environment.Url + '/cart/featured')
  }

  getSingleCart(id){
    return this.http.get(environment.Url + '/cart/'+ id);

  }
  // async getProducts(){
  //   (await this.product.getAllProducts()).subscribe((products) =>{
  //     console.log(products);
  //     this.data = products['products'];
      
  //   })

  // }


  getCart(){
    return this.cart;
  }

  getCartItemCount(){
    return this.cartItemCount;
  }


  addProduct(product, count) {
    console.log(product);
    
    let added = false;
    for (let p of this.cart) {
      if (p._id === product._id) {
        p.amount += count;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = count;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + count);
  }
 
  decreaseProduct(product, value) {
    for (let [index, p] of this.cart.entries()) {
      if (p._id === product._id) {
        p.amount -= value;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - value);
  }

  // decreaseProduct(product) {
  //   for (let [index, p] of this.cart.entries()) {
  //     if (p._id === product._id) {
  //       p.amount -= 1;
  //       if (p.amount == 0) {
  //         this.cart.splice(index, 1);
  //       }
  //     }
  //   }
  //   this.cartItemCount.next(this.cartItemCount.value - 1);
  // }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p._id === product._id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }


  clearCart() {
    this.cartItemCount.next(0);
    this.cart = [];
  }


}