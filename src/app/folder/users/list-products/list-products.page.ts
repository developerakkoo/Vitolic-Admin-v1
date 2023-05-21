import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HandlerService } from 'src/app/handler.service';
import { ProductService } from '../../product/product.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
})
export class ListProductsPage implements OnInit {

  userId:any

  products:any[] =   [];

  getProductSub: Subscription;

  constructor(private productS: ProductService,
                private router: Router,
                private route: ActivatedRoute,
                private cartService: CartService,
                private handler: HandlerService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.getAllProducts();
  }

  async getAllProducts(){
    this.handler.presentLoading("loading products...")  
    this.getProductSub = this.productS.getAllProducts()
    .subscribe(async(products:any) =>{
      console.log(products);
      this.products = products['products'];
      await this.handler.dismissLoading();
    }, async (error)=>{
      console.log(error);
      await this.handler.dismissLoading();
      
    })
    }

    openAddSubscriptionPage(product:any){
      console.log(product._id);
      this.cartService.addProduct(product,1);
      this.router.navigate(['folder', 'users', 'subscription-detail',this.userId, product._id])
      
    }

}
