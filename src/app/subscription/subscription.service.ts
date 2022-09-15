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
  deleteSubscription(id){
    return this.http.delete(environment.Url +'/subscription/'+id);
  }

  getSubscriptionById(id){
    return this.http.get(environment.Url +'/subscription/'+ id);
  }

  getAllSubscription(){
    return this.http.get(environment.Url +'/subscription');
  }
}
