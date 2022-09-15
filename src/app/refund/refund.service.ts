import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RefundService {

  constructor(private http: HttpClient) { }



  
  addRefund(){

  }

  editRefund(){

  }
  deleteSubscription(id){
    return this.http.delete(environment.Url +'/refunds/'+id);
  }

  deleteRefund(id){
    return this.http.delete(environment.Url +'/refund/'+id);
  }

  getAllRefund(){
    return this.http.get(environment.Url +'/refunds');
  }
}
