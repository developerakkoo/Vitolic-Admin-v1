import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BannerService } from './banner.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})
export class BannerPage implements OnInit {
  Banner:any[] =[];
  getBannerSub: Subscription;
  constructor(private banner:BannerService,private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.getAllBanner()
    
  }
  // openEditPage(product){
  //   console.log(product._id);
  //   this.router.navigate(['product','edit-product', product._id]);
    
  // }

  IonViewDidLeave(){
    this.getBannerSub.unsubscribe();
  }

  async getAllBanner(){
    let loading = await this.loadingController.create({
      message:"Loading Banner...",
      spinner:"lines"
    })
  
  
  
  
  
    await loading.present();
    this.getBannerSub = this.banner.getAllBanner()
    .subscribe(async(banner:any) =>{
      console.log(banner);
      this.Banner = banner['banner'];
      await loading.dismiss();
    }, async (error)=>{
      console.log(error + 'Not Fond');
      await loading.dismiss();
    })
  }



  deleteBannerClick(id){
    this.banner. deleteBanner(id)
    .subscribe(async (banner) =>{
      console.log(banner);
      this. getAllBanner();
    }, async (error) =>{
      console.log(error);
      
    })
  }

  openAddProductPage(){
    this.router.navigate(['folder','banner','add-banner']);

  }

}
