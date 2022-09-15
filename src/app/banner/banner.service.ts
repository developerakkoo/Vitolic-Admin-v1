import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }


  getAllBanner(){
    return this.http.get(environment.Url +'/banner');
  }
  addBanner(){

  }

 
  deleteBanner(id){
    return this.http.delete(environment.Url +'/banner/'+id);
  }

  geteBannerById(id){
    return this.http.get(environment.Url +'/banner/'+ id);
  }




}
