import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }


    addCity(body){
      return this.http.post(environment.Url +'/pincode', body);

  }

  deleteCity(id){
    return this.http.delete(environment.Url +'/pincode/'+id);
  }

  getCityById(id){
    return this.http.get(environment.Url +'/pincode/'+ id);
  }

  getAllCity(){
    return this.http.get(environment.Url +'/pincode');
  }


}
