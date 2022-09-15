import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get(environment.Url +'/user');
  }
  addUsers(){

  }

  deleteUsers(id){
    return this.http.delete(environment.Url +'/user/'+id);
  }

  getUsersById(id){
    return this.http.get(environment.Url +'/user/'+ id);
  }


}
