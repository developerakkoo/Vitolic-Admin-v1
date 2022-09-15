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

  getAllCarts(){
    return this.http.get(environment.Url +'/cart');
  }
}
