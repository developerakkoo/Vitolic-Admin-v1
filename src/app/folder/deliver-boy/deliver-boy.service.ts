import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliverBoyService {

  constructor(private http: HttpClient) { }




  getAllDeliver(){
    return this.http.get(environment.Url +'/boy');
  }



  getBoyById(id){
    return this.http.get(environment.Url +'/boy/'+ id);
  }
  addDeliver(){

  }

  editDeliver(){

  }

  deleteDeliver(id){
   
      return this.http.delete(environment.Url +'/boy/'+id);
    }
  }

