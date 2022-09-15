import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(){

  }

  editProduct(){

  }

  deleteProduct(id){
    return this.http.delete(environment.Url +'/product/'+id);
  }

  getProductById(id){
    return this.http.get(environment.Url +'/products/'+ id);
  }

  getAllProducts(){
    return this.http.get(environment.Url +'/products');
  }
}


