import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private http: HttpClient) { }

  addSubscription(){

  }

  editSubscription(){

  }
  deleteSubscription(id, cartId, userId){
    let body = {
      userId: userId,
      terminate: true
    }
    return this.http.put(environment.Url +'/subscription/terminate/'+id + "/" + cartId, body);
  }

  getSubscriptionById(id){
    return this.http.get(environment.Url +'/subscription/'+ id);
  }

  getAllSubscription(){
    return this.http.get(environment.Url +'/subscription');
  }
}
