import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  products:any[] =   [];

  getProductSub: Subscription;

  constructor(private productS: ProductService,
                private router: Router,
                private loadingController: LoadingController) { }

  ngOnInit() {
    this.getAllProducts();
  }
  openEditPage(product){
    console.log(product._id);
    this.router.navigate(['folder','product','edit-product', product._id]);
    
  }
  openAddProductPage(){
    this.router.navigate(['folder','product','add-product']);

  }

  ionViewDidEnter(){
    this.getAllProducts();
  }

  IonViewDidLeave(){
    this.getProductSub.unsubscribe();
  }
 async getAllProducts(){
  let loading = await this.loadingController.create({
    message:"Loading products...",
    spinner:"lines"
  })





  await loading.present();

  this.getProductSub = this.productS.getAllProducts()
  .subscribe(async(products:any) =>{
    console.log(products);
    this.products = products['products'];
    await loading.dismiss();
  }, async (error)=>{
    console.log(error);
    await loading.dismiss();
    
  })
  }

  deleteProductClick(id){
    this.productS.deleteProduct(id)
    .subscribe(async (product) =>{
      console.log(product);
      this.getAllProducts(); 
    }, async (error) =>{
      console.log(error);
      
    })
  }

  

}
